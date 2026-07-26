# New Era Designs Theme Recovery

## Source of truth

The Shopify export from the currently live website is the stable recovery baseline. The separate Codex development export is a salvage source only and should not be uploaded over the live baseline as a complete theme.

## Why the repository was reset

The first recreation attempt uploaded the contents of Shopify's `assets` folder into the repository root. A later revert then removed those files completely while leaving Liquid files that still referenced them. That produced a theme with templates and sections but no functioning CSS, JavaScript, icons, or other required assets.

The upload also included a client-area password directly in public JavaScript. That password must be considered exposed and replaced anywhere it is still being used.

## Correct theme structure

The extracted live Shopify ZIP should place these folders directly at the repository root:

```text
assets/
blocks/
config/
layout/
locales/
sections/
snippets/
templates/
```

Do not upload the files from inside `assets/` directly to the repository root. The visible path must remain `assets/filename.css`, `assets/filename.js`, and so on.

## Safe import procedure

1. Extract the live-theme ZIP into a new local folder.
2. Confirm the eight Shopify folders above are visible at the top level.
3. Copy the repository's `README.md`, `.gitignore`, `.shopifyignore`, and this file into that folder.
4. Commit the complete live baseline to a `development` branch.
5. Preview the branch through a duplicate Shopify theme.
6. Merge into `main` only after CSS, JavaScript, navigation, theme editor controls, and all custom pages have been checked.

## Codex salvage rules

Recover unfinished Codex work one feature at a time:

- editorial homepage
- Aether/Pegasus assistant
- editorial motion and halftone system
- redesigned podcast experience
- redesigned case-study experience

Each recovered feature should receive its own `feature/...` branch. Empty placeholder sections and unconnected experiments should not be promoted into the stable theme.

## Security rule

Never store client passwords, API keys, access tokens, private client files, or `.env` contents in this repository. A front-end password comparison is not meaningful access control because visitors can read the website source.
