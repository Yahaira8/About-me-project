import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

function apiPlugin(): Plugin {
  return {
    name: 'api-contact-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0];

        // Ensure data directory exists
        const dataDir = path.resolve(process.cwd(), 'data');
        const dataFile = path.resolve(dataDir, 'contactReceived.json');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }
        if (!fs.existsSync(dataFile)) {
          fs.writeFileSync(dataFile, JSON.stringify([], null, 2));
        }

        if (url === '/api/contact' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const newMsg = JSON.parse(body);
              const existing = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
              existing.unshift(newMsg);
              fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: existing.length }));
            } catch (err) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to save contact message' }));
            }
          });
          return;
        }

        if (url === '/api/contact' && req.method === 'GET') {
          try {
            const data = fs.readFileSync(dataFile, 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify([]));
          }
          return;
        }

        if (url === '/api/admin/verify' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { password } = JSON.parse(body);
              const adminPass = process.env.ADMIN_PASSWORD || 'yahaira2026';
              if (password === adminPass) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ authenticated: true }));
              } else {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ authenticated: false, error: 'Incorrect administrator password' }));
              }
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid request' }));
            }
          });
          return;
        }

        if (url === '/api/contact/reply' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { id } = JSON.parse(body);
              const existing = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
              const item = existing.find((m: { id: string }) => m.id === id);
              if (item) {
                item.replied = true;
                item.repliedAt = new Date().toISOString();
                item.status = 'replied';
                fs.writeFileSync(dataFile, JSON.stringify(existing, null, 2));
              }
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, item }));
            } catch {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to update reply status' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    allowedHosts: true,
  },
});
