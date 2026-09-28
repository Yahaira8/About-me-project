import assert from 'node:assert/strict';
import http from 'node:http';
import { after, test } from 'node:test';
import { createApiHandler } from '../server/api.mjs';
import { createContactStore, StorageUnavailableError } from '../server/contact-store.mjs';

const servers = [];
after(async () => {
  await Promise.all(servers.map((server) => new Promise((resolve) => server.close(resolve))));
});

function fakeClientFactory() {
  const objects = new Map();
  return {
    objects,
    create: () => ({
      async list({ prefix }) {
        return {
          ok: true,
          value: [...objects.keys()].filter((name) => name.startsWith(prefix)).map((name) => ({ name })),
        };
      },
      async downloadAsText(name) {
        return objects.has(name)
          ? { ok: true, value: objects.get(name) }
          : { ok: false, error: { statusCode: 404, message: 'Not found' } };
      },
      async uploadFromText(name, text) {
        objects.set(name, text);
        return { ok: true, value: null };
      },
    }),
  };
}

async function startApi(options) {
  const handleApi = createApiHandler(options);
  const server = http.createServer(async (req, res) => {
    if (!(await handleApi(req, res))) res.writeHead(404).end();
  });
  servers.push(server);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  return `http://127.0.0.1:${server.address().port}`;
}

async function request(base, route, { method = 'GET', body, token } = {}) {
  const response = await fetch(`${base}${route}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return { status: response.status, body: await response.json() };
}

test('separate App Storage objects append safely, survive a store instance change, and persist reply fields', async () => {
  const fake = fakeClientFactory();
  const store = createContactStore(fake.create);
  const newer = { id: 'newer', timestamp: '2026-09-28T00:00:00.000Z', replied: false, status: 'new', repliedAt: null };
  const older = { id: 'older', timestamp: '2026-09-27T00:00:00.000Z', replied: false, status: 'new', repliedAt: null };
  await Promise.all([store.save(older), store.save(newer)]);
  const reopened = createContactStore(fake.create);
  assert.deepEqual((await reopened.list()).map((item) => item.id), ['newer', 'older']);
  await reopened.markReplied('older', '2026-09-29T00:00:00.000Z');
  assert.deepEqual((await createContactStore(fake.create).list()).find((item) => item.id === 'older'), {
    ...older,
    status: 'replied',
    replied: true,
    repliedAt: '2026-09-29T00:00:00.000Z',
  });
});

test('contact writes validate input and admin reads/replies require a signed server token', async () => {
  const fake = fakeClientFactory();
  const base = await startApi({
    store: createContactStore(fake.create),
    adminPassword: 'synthetic-test-password',
    sessionSecret: 'synthetic-test-session-secret',
    now: () => Date.parse('2026-09-28T12:00:00.000Z'),
  });
  const validContact = {
    firstName: 'Test',
    lastName: 'Visitor',
    email: 'test@example.com',
    reason: 'Question',
    message: 'A browser test message.',
  };
  assert.equal((await request(base, '/api/contact', { method: 'POST', body: { ...validContact, email: 'bad' } })).status, 400);
  const saved = await request(base, '/api/contact', { method: 'POST', body: validContact });
  assert.equal(saved.status, 201);
  assert.deepEqual(saved.body.message, {
    id: saved.body.message.id,
    ...validContact,
    timestamp: '2026-09-28T12:00:00.000Z',
    status: 'new',
    replied: false,
    repliedAt: null,
  });
  assert.equal((await request(base, '/api/contact')).status, 401);
  assert.equal((await request(base, '/api/contact/reply', { method: 'POST', body: { id: saved.body.message.id } })).status, 401);
  assert.equal((await request(base, '/api/admin/verify', { method: 'POST', body: { password: 'wrong' } })).status, 401);
  const login = await request(base, '/api/admin/verify', {
    method: 'POST', body: { password: 'synthetic-test-password' },
  });
  assert.equal(login.status, 200);
  const token = login.body.token;
  assert.equal((await request(base, '/api/contact', { token: `${token}invalid` })).status, 401);
  const messages = await request(base, '/api/contact', { token });
  assert.equal(messages.status, 200);
  assert.equal(messages.body.length, 1);
  const reply = await request(base, '/api/contact/reply', {
    method: 'POST', body: { id: saved.body.message.id }, token,
  });
  assert.equal(reply.status, 200);
  assert.equal(reply.body.item.replied, true);
  assert.equal(reply.body.item.repliedAt, '2026-09-28T12:00:00.000Z');
  assert.equal((await request(base, '/api/contact', { token })).body[0].replied, true);
});

test('missing admin secret or App Storage fails closed instead of claiming success', async () => {
  const base = await startApi({
    store: { save: async () => { throw new StorageUnavailableError(new Error('No bucket')); } },
    adminPassword: '',
    sessionSecret: 'synthetic-test-session-secret',
  });
  const saved = await request(base, '/api/contact', {
    method: 'POST',
    body: { firstName: 'Test', lastName: 'Visitor', email: 'test@example.com', reason: 'Question', message: 'Hi' },
  });
  assert.equal(saved.status, 503);
  assert.match(saved.body.error, /storage.*unavailable/i);
  assert.equal((await request(base, '/api/admin/verify', { method: 'POST', body: { password: 'any' } })).status, 503);
});

test('public message submissions are limited per connection before using storage', async () => {
  const fake = fakeClientFactory();
  const base = await startApi({
    store: createContactStore(fake.create),
    adminPassword: 'synthetic-test-password',
    sessionSecret: 'synthetic-test-session-secret',
  });
  const body = {
    firstName: 'Test', lastName: 'Visitor', email: 'test@example.com',
    reason: 'Question', message: 'A test submission.',
  };
  for (let attempt = 0; attempt < 20; attempt += 1) {
    assert.equal((await request(base, '/api/contact', { method: 'POST', body })).status, 201);
  }
  assert.equal((await request(base, '/api/contact', { method: 'POST', body })).status, 429);
  assert.equal(fake.objects.size, 20);
});