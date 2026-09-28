import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

async function findOpenPort() {
  const server = net.createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  await new Promise((resolve) => server.close(resolve));
  return port;
}

test('production process serves built pages and protects API routes', async () => {
  const port = await findOpenPort();
  const processHandle = spawn(process.execPath, ['server/index.mjs'], {
    cwd: root,
    env: {
      ...process.env,
      PORT: String(port),
      NODE_ENV: 'production',
      ADMIN_PASSWORD: '',
      SESSION_SECRET: 'synthetic-test-session-secret',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  processHandle.stdout.on('data', (chunk) => { output += chunk; });
  processHandle.stderr.on('data', (chunk) => { output += chunk; });

  try {
    const base = `http://127.0.0.1:${port}`;
    let ready = false;
    for (let attempt = 0; attempt < 80; attempt += 1) {
      if (processHandle.exitCode !== null) throw new Error(`Server stopped: ${output}`);
      try {
        const response = await fetch(base);
        if (response.ok) {
          ready = true;
          break;
        }
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    assert.ok(ready, `Production server did not become ready: ${output}`);

    for (const route of ['/', '/admin', '/future', '/favicon.svg']) {
      const response = await fetch(`${base}${route}`, {
        headers: { Accept: 'text/html' },
      });
      assert.equal(response.status, 200, `${route} should be served`);
    }
    assert.equal((await fetch(`${base}/favicon.ico`, { redirect: 'manual' })).status, 307);
    assert.equal((await fetch(`${base}/api/contact`)).status, 401);
    const signIn = await fetch(`${base}/api/admin/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: 'synthetic-test-password' }),
    });
    assert.equal(signIn.status, 503);
  } finally {
    processHandle.kill('SIGTERM');
    await new Promise((resolve) => {
      if (processHandle.exitCode !== null) return resolve();
      processHandle.once('exit', resolve);
    });
  }
});