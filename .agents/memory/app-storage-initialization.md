---
name: App Storage initialization
description: Default-bucket resolution can fail during SDK client construction before a request is handled.
---

Create Replit App Storage clients when a storage operation begins, and surface initialization failure as a visible storage error. Never treat a missing default bucket as an empty inbox or silently save messages elsewhere.

**Why:** The SDK starts resolving the default bucket as soon as a client is constructed. Without an assigned bucket, eager construction during server startup can leave a rejected initialization promise unhandled.

**How to apply:** When refactoring server setup or adding storage-dependent features, keep client creation inside an awaited operation and verify the no-bucket path fails explicitly without crashing the web server. After assigning a default bucket in the editor, check a fresh read-only operation before assuming a server restart is required.