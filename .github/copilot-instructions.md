# GitHub Copilot Instructions — Main Branch Guardrail

This branch is the stable release branch. Do not begin website development from `main`.

Before making any code changes:

1. Confirm the current branch with `git branch --show-current`.
2. Switch to `development`.
3. Read the full working instructions on `development`:
   - `.github/copilot-instructions.md`
   - `AGENTS.md`
   - `docs/AI_WORKFLOW_AND_BUILD_SEQUENCE.md`
   - `docs/CODE_COMMENT_STANDARD.md`
   - `docs/WEBSITE_EDIT_BACKLOG.md`
4. Create a `feature/...` branch from `development` for the actual task.

Do not edit Shopify theme code directly on `main`. Do not publish a Shopify theme, force-push, rewrite history, delete branches, or expose credentials.

The `development` branch is connected to an unpublished Shopify preview theme. Changes reaching `development` may update that preview, but they must never be treated as customer-facing until deliberately reviewed and published.
