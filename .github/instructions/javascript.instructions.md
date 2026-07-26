---
applyTo: "assets/**/*.js,scripts/**/*.mjs"
---

# JavaScript instructions

- Read `docs/CODE_COMMENT_STANDARD.md` before substantial custom JavaScript work.
- For an important custom script or system, add a short header describing `PURPOSE`, `USED BY`, and `EDIT SAFELY`.
- Use comments to explain DOM assumptions, Shopify Theme Editor events, reduced-motion handling, cleanup, fallbacks, browser APIs, performance-sensitive observers, and security boundaries.
- Prefer progressive enhancement: core content and navigation must remain usable when JavaScript fails or is disabled.
- Guard every optional selector or browser API before using it.
- Avoid global variables and repeated event listeners.
- Remove observers and listeners when sections unload in the Shopify Theme Editor.
- Respect `prefers-reduced-motion` and avoid animation loops that continue when content is offscreen.
- Never describe cookies, local storage, obfuscation, or front-end comparisons as secure authentication.
- Do not narrate obvious syntax line by line.
- Use specific `TODO(NED)` notes with a replacement plan and removal condition.
- Update or remove comments when behavior changes.
