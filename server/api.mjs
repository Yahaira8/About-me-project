import { createHash, createHmac, randomUUID, timingSafeEqual } from 'node:crypto';
import { StorageUnavailableError } from './contact-store.mjs';

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
const MAX_BODY_BYTES = 16 * 1024;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_LOGINS = 5;
const CONTACT_WINDOW_MS = 15 * 60 * 1000;
const MAX_CONTACT_SUBMISSIONS = 20;

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  res.end(JSON.stringify(data));
}

async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new ApiError(413, 'Request is too large.');
    chunks.push(chunk);
  }
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (value && typeof value === 'object' && !Array.isArray(value)) return value;
  } catch {
    // Handled below.
  }
  throw new ApiError(400, 'Invalid JSON request.');
}

function requiredText(value, label, maxLength) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > maxLength) {
    throw new ApiError(400, `${label} is required and must be at most ${maxLength} characters.`);
  }
  return value.trim();
}

function validateContact(input) {
  const firstName = requiredText(input.firstName, 'First name', 80);
  const lastName = requiredText(input.lastName, 'Last name', 80);
  const email = requiredText(input.email, 'Email', 254);
  const reason = requiredText(input.reason, 'Reason', 100);
  const message = requiredText(input.message, 'Message', 5000);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new ApiError(400, 'Enter a valid email address.');
  }
  return { firstName, lastName, email, reason, message };
}

function safeEqual(left, right) {
  const leftDigest = createHash('sha256').update(left).digest();
  const rightDigest = createHash('sha256').update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function makeToken(secret, now) {
  const payload = Buffer.from(
    JSON.stringify({ role: 'admin', expiresAt: now + SESSION_DURATION_MS, id: randomUUID() }),
  ).toString('base64url');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function validToken(header, secret, now) {
  if (!secret || typeof header !== 'string' || !header.startsWith('Bearer ')) return false;
  const token = header.slice(7);
  if (token.length > 2048 || !/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)) return false;

  const [payload, signature] = token.split('.');
  const expected = createHmac('sha256', secret).update(payload).digest();
  const received = Buffer.from(signature, 'base64url');
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return false;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return session.role === 'admin' && Number.isFinite(session.expiresAt) && session.expiresAt > now;
  } catch {
    return false;
  }
}

export function createApiHandler({
  store,
  adminPassword = process.env.ADMIN_PASSWORD,
  sessionSecret = process.env.SESSION_SECRET,
  now = () => Date.now(),
}) {
  const failedLogins = new Map();
  const contactSubmissions = new Map();

  function reserveContactSubmission(req) {
    // Do not trust client-supplied forwarding headers for this limit.
    const address = req.socket.remoteAddress ?? 'unknown';
    const recent = (contactSubmissions.get(address) ?? []).filter(
      (time) => now() - time < CONTACT_WINDOW_MS,
    );
    if (recent.length >= MAX_CONTACT_SUBMISSIONS) {
      throw new ApiError(429, 'Too many messages sent recently. Please try again later.');
    }
    const reservedAt = now();
    contactSubmissions.set(address, [...recent, reservedAt]);

    return () => {
      const attempts = contactSubmissions.get(address) ?? [];
      const reservation = attempts.indexOf(reservedAt);
      if (reservation !== -1) attempts.splice(reservation, 1);
      if (attempts.length === 0) contactSubmissions.delete(address);
    };
  }

  return async function handleApi(req, res) {
    const pathname = new URL(req.url ?? '/', 'http://local').pathname;
    if (!pathname.startsWith('/api/')) return false;

    try {
      if (pathname === '/api/contact' && req.method === 'POST') {
        const fields = validateContact(await readJson(req));
        const releaseReservation = reserveContactSubmission(req);
        const record = {
          id: randomUUID(),
          ...fields,
          timestamp: new Date(now()).toISOString(),
          status: 'new',
          replied: false,
          repliedAt: null,
        };
        try {
          await store.save(record);
        } catch (error) {
          releaseReservation();
          throw error;
        }
        sendJson(res, 201, { success: true, message: record });
        return true;
      }

      if (pathname === '/api/admin/verify' && req.method === 'POST') {
        if (!adminPassword || !sessionSecret) {
          throw new ApiError(503, 'Admin access has not been configured.');
        }

        const remoteAddress = req.socket.remoteAddress ?? 'unknown';
        const failed = failedLogins.get(remoteAddress) ?? [];
        const recent = failed.filter((time) => now() - time < LOGIN_WINDOW_MS);
        if (recent.length >= MAX_FAILED_LOGINS) {
          throw new ApiError(429, 'Too many attempts. Try again later.');
        }
        const { password } = await readJson(req);
        if (typeof password !== 'string' || !safeEqual(password, adminPassword)) {
          failedLogins.set(remoteAddress, [...recent, now()]);
          throw new ApiError(401, 'Incorrect administrator password.');
        }

        failedLogins.delete(remoteAddress);
        sendJson(res, 200, { authenticated: true, token: makeToken(sessionSecret, now()) });
        return true;
      }

      if (pathname === '/api/contact' && req.method === 'GET') {
        if (!validToken(req.headers.authorization, sessionSecret, now())) {
          throw new ApiError(401, 'Administrator sign-in required.');
        }
        sendJson(res, 200, await store.list());
        return true;
      }

      if (pathname === '/api/contact/reply' && req.method === 'POST') {
        if (!validToken(req.headers.authorization, sessionSecret, now())) {
          throw new ApiError(401, 'Administrator sign-in required.');
        }
        const { id } = await readJson(req);
        if (typeof id !== 'string' || !/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) {
          throw new ApiError(400, 'Invalid message ID.');
        }
        const item = await store.markReplied(id, new Date(now()).toISOString());
        if (!item) throw new ApiError(404, 'Message not found.');
        sendJson(res, 200, { success: true, item });
        return true;
      }

      throw new ApiError(404, 'API route not found.');
    } catch (error) {
      if (error instanceof ApiError) {
        sendJson(res, error.status, { error: error.message });
      } else if (error instanceof StorageUnavailableError) {
        console.error('App Storage request failed:', error.cause?.message ?? error.message);
        sendJson(res, 503, { error: 'Message storage is temporarily unavailable. Please try again later.' });
      } else {
        console.error('Unexpected API error:', error);
        sendJson(res, 500, { error: 'An unexpected server error occurred.' });
      }
      return true;
    }
  };
}