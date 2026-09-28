import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApiHandler } from './api.mjs';
import { createContactStore } from './contact-store.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const distDirectory = path.join(root, 'dist');
const production = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 5000);
const handleApi = createApiHandler({ store: createContactStore() });

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

async function serveBuiltSite(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, 'http://local').pathname);
  } catch {
    res.writeHead(400).end();
    return;
  }
  const requestedFile = path.resolve(distDirectory, `.${pathname}`);
  if (requestedFile !== distDirectory && !requestedFile.startsWith(`${distDirectory}${path.sep}`)) {
    res.writeHead(403).end();
    return;
  }

  let file = requestedFile;
  const info = await stat(file).catch(() => null);
  if (!info?.isFile()) {
    if (path.extname(pathname) || (pathname !== '/' && !req.headers.accept?.includes('text/html'))) {
      res.writeHead(404).end();
      return;
    }
    file = path.join(distDirectory, 'index.html');
  }

  const extension = path.extname(file);
  res.writeHead(200, {
    'Content-Type': mimeTypes[extension] ?? 'application/octet-stream',
    'Cache-Control': extension === '.html' ? 'no-cache' : 'public, max-age=3600',
    'X-Content-Type-Options': 'nosniff',
  });
  if (req.method === 'HEAD') {
    res.end();
  } else {
    createReadStream(file).on('error', () => res.destroy()).pipe(res);
  }
}

let vite;
const server = http.createServer(async (req, res) => {
  try {
    if (await handleApi(req, res)) return;
    if (new URL(req.url ?? '/', 'http://local').pathname === '/favicon.ico') {
      res.writeHead(307, { Location: '/favicon.svg', 'Cache-Control': 'public, max-age=86400' }).end();
      return;
    }
    if (vite) {
      vite.middlewares(req, res);
    } else {
      await serveBuiltSite(req, res);
    }
  } catch (error) {
    console.error('Server error:', error);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  }
});

if (!production) {
  const { createServer } = await import('vite');
  vite = await createServer({
    root,
    configFile: path.join(root, 'vite.config.ts'),
    server: { middlewareMode: true, hmr: { server }, allowedHosts: true },
    appType: 'spa',
  });
}

server.listen(port, '0.0.0.0', () => {
  console.log(`Portfolio server listening on port ${port} (${production ? 'production' : 'development'})`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});