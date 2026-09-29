---
name: Vite and Replit-generated files
description: Internal Replit file updates can trigger unwanted Vite page reloads.
---

Keep Replit-generated workflow logs, environment cache files, agent notes, and test output outside Vite's watched paths. A full development-page reload discards an admin session held only in browser memory.

**Why:** When a storage request failed, the workflow wrote a log entry. Vite treated that internal file update as an app change and reloaded the page, making a successful admin sign-in appear to fail immediately. Updating agent notes also triggered a full page reload.

**How to apply:** Preserve the watcher exclusions when changing development-server configuration. If sign-in succeeds but the page returns to its login state, distinguish an actual authentication rejection from a full-page reload triggered by generated files.