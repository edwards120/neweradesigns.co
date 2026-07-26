# New Era Designs

This is the working home for the Shopify theme behind **New Era Designs**—my portfolio, podcast home, case-study archive, client experience, and honestly my digital design playground.

I’m a designer first, so I never wanted the site to feel like I picked a template, changed the colors, and called it branding. The goal is to create an actual world around the work: sharp but imperfect, luxurious without being cold, historical and modern, masculine and feminine, serious but still strange enough to feel alive.

I’m also learning more of the technical side while I build, so this repository shows both the finished experience and the process behind it. Some parts are polished, some are experiments, but the direction is intentional.

## Current status

The repository was reset to a clean foundation on July 25, 2026 after an incomplete theme upload placed Shopify assets in the wrong locations. The current live Shopify export is being treated as the stable baseline, while unfinished Codex concepts will be recovered one feature at a time instead of being dropped into the site all at once.

The complete Shopify baseline and current development work now live on `development`. Nothing in GitHub should be assumed to affect customers until the relevant branch is deliberately connected or pushed to a Shopify theme and that theme is intentionally published.

## Start here

- [`docs/WHY_THE_WEBSITE_EXISTS.md`](docs/WHY_THE_WEBSITE_EXISTS.md) — the strategic reason for the website and the business problems it must solve
- [`docs/WEBSITE_EDIT_BACKLOG.md`](docs/WEBSITE_EDIT_BACKLOG.md) — prioritized edits with the problem, reasoning, work, and definition of done
- [`docs/DEVELOPMENT_PLAYBOOK.md`](docs/DEVELOPMENT_PLAYBOOK.md) — GitHub/Shopify workflow, HTML, CSS, Liquid, animation, debugging, commits, and launch standards
- [`docs/SEO_FOUNDATION.md`](docs/SEO_FOUNDATION.md) — metadata, page positioning, internal links, image text, and search foundations
- [`RECOVERY.md`](RECOVERY.md) — recovery history and correct Shopify theme structure

## What belongs here

- Shopify theme code in the standard `assets`, `blocks`, `config`, `layout`, `locales`, `sections`, `snippets`, and `templates` folders
- Custom New Era Designs sections and page systems
- Portfolio, podcast, case-study, and service experiences
- Motion and interaction experiments that have been tested before reaching `main`
- Documentation that explains which files work together and why changes are being made

## Branch rules

- `main` — stable, complete, reviewed code; not automatically the published Shopify theme
- `development` — combined work being tested before release
- `feature/...` — one specific feature, page, or repair at a time

Theme ZIP files, Photoshop files, reference images, private client information, passwords, API keys, and unfinished recovery folders do not belong in the public working tree.

## Release principle

```text
feature branch
    ↓
development
    ↓
unpublished Shopify preview theme
    ↓
review, validation, mobile, accessibility
    ↓
main
    ↓
intentional Shopify publish
```

> Built to feel like a living creative world, not another Shopify template.
