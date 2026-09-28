# About Me website

## Run in Replit

The project is a React/Vite app served by a small Node API. Its Replit web workflow runs:

```bash
npm run dev
```

The development server binds to `0.0.0.0:5000`, which makes the site available in Replit Preview. The same Node server handles `/api` routes and serves the built site in production (`npm run build && npm run start`).

## Contact and admin setup

Create a default App Storage bucket from **All tools → App Storage → Create new bucket**. Contact messages are stored as separate JSON objects in that bucket, not in browser storage or the project's local files. If no bucket is assigned, sending a message returns an error instead of reporting a false success.

Set `ADMIN_PASSWORD` in Replit Secrets before using the admin dashboard. `SESSION_SECRET` signs short-lived admin tokens; it must also be configured. Without either secret, admin sign-in fails closed. The password is never bundled into the browser app. Admin tokens are kept only in browser memory, so refreshing the page requires signing in again.

## Other commands

```bash
npm run build
npm run lint
npm run test:api
npm run test:production
npm run test:smoke
```