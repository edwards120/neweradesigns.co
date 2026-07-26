---
applyTo: "layout/**/*.liquid,sections/**/*.liquid,snippets/**/*.liquid,blocks/**/*.liquid,templates/**/*.liquid"
---

# Shopify Liquid instructions

- Read `docs/CODE_COMMENT_STANDARD.md` before substantial custom Liquid work.
- Use `{% comment %} ... {% endcomment %}` for developer reasoning that should not render into page HTML.
- For substantial custom sections or snippets, add a concise header describing `PURPOSE`, `USED BY`, and `EDIT SAFELY`.
- Explain non-obvious Shopify object, filter, fallback, Theme Editor, schema-ID, accessibility, or dependency decisions.
- Preserve schema setting IDs unless a migration is intentionally planned; Shopify stores merchant values against those IDs.
- Prefer editable schema settings and blocks over hardcoded text, links, and media.
- Identify the template or section that loads a reusable snippet when the dependency is not obvious.
- Explain why rich text is rendered unescaped or why text is escaped when that choice affects safety or formatting.
- Do not narrate ordinary assignments, loops, or conditions.
- Never place passwords, tokens, client details, or private delivery URLs in comments.
- When behavior changes, update or remove the related comment in the same commit.
