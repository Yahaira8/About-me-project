---
name: Preview-origin asset checks
description: Interpreting third-party image failures across direct localhost and proxied Replit previews
---

Third-party media hosts can respond differently when a browser loads the app directly from localhost versus through the Replit development-domain preview. A failure in a direct-localhost capture alone does not establish that the preview users see is broken.

**Why:** During a read-only portfolio audit, direct-localhost screenshots showed failed external images while browser checks through the development preview domain loaded the same images. The differing request origin or referrer can affect third-party responses.

**How to apply:** When evaluating media availability, check image loading and network responses at the actual preview origin, and report any origin-specific discrepancy separately. Development-preview success still does not prove published-site behavior.