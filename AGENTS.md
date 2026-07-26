# Shared AI Working Rules

This file is the common source of truth for GitHub Copilot, ChatGPT, Gemini, DeepSeek, and any other assistant used on the New Era Designs Shopify theme.

## Repository purpose

This repository contains the working Shopify theme for New Era Designs. The website is a portfolio, service platform, case-study archive, podcast home, and client-facing brand experience.

## Branch and release safety

- `main` is the stable release branch.
- `development` is the combined testing branch and is connected to an unpublished Shopify preview theme.
- Use one `feature/...` branch per page, feature, experiment, or repair.
- Do not publish Shopify themes.
- Do not force-push, rewrite Git history, delete branches, or remove working files without explicit approval.
- A change reaching `development` may appear in the connected Shopify preview theme.

## Working method

1. Read the relevant files and documentation before editing.
2. Define the problem being solved and the expected result.
3. Work on one feature at a time.
4. Keep Liquid/HTML, CSS, and JavaScript responsibilities separate.
5. Preserve Shopify Theme Editor controls wherever practical.
6. Reuse existing sections, snippets, styles, and scripts before adding duplicates.
7. Test after meaningful batches rather than after every tiny edit.
8. Explain incomplete work, warnings, and assumptions honestly.

## Required validation

Run:

```bash
node scripts/validate-theme.mjs
```

Also review:

- Desktop and mobile layouts
- Shopify Theme Editor behavior
- Keyboard navigation and focus states
- Reduced-motion behavior
- Image alternative text
- Missing assets and broken links
- Performance impact of animation and media

## Shopify architecture

- `layout/` contains the site shell.
- `templates/` defines page composition.
- `sections/` contains editable page modules.
- `snippets/` contains reusable Liquid fragments.
- `blocks/` contains reusable theme blocks.
- `assets/` contains CSS, JavaScript, images, and fonts.
- `config/` contains theme settings.

Do not build entire pages inside `layout/theme.liquid`. Do not rename files until all references are known.

## Security

Never commit:

- Passwords
- API keys or access tokens
- `.env` files
- Private client files
- Confidential project data
- Browser-side password gates presented as real security

## Brand direction

The experience should feel:

- Sharp but imperfect
- Luxurious without being cold
- Historical and modern
- Masculine and feminine
- Serious but strange enough to feel alive
- Intentional, editorial, fabrication-aware, and accessible

Motion should support hierarchy, storytelling, or navigation. Decorative effects should not make the site slower, harder to edit, or harder to use.

## Documentation

Before major work, review:

- `docs/WHY_THE_WEBSITE_EXISTS.md`
- `docs/WEBSITE_EDIT_BACKLOG.md`
- `docs/DEVELOPMENT_PLAYBOOK.md`
- `docs/SEO_FOUNDATION.md`
- `RECOVERY.md`
