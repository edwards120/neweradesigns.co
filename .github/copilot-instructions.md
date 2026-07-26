# GitHub Copilot Instructions — New Era Designs Shopify Theme

- Treat `development` as the working baseline and `main` as the stable release branch.
- Create a `feature/...` branch for each page, feature, experiment, or repair.
- Never publish a Shopify theme, force-push, rewrite history, delete branches, or remove working files without explicit approval.
- The `development` branch is connected to an unpublished Shopify theme. Changes merged or pushed to `development` can update that Shopify preview.
- Work on one feature at a time and inspect only the relevant template, section, snippet, asset, and configuration files.
- Preserve Shopify Theme Editor compatibility. Prefer editable section settings over hardcoded content.
- Keep Liquid/HTML structure, CSS styling, and JavaScript behavior separated.
- Do not place entire pages inside `layout/theme.liquid`.
- Do not rename Shopify files until every reference has been identified and updated.
- Do not modify `config/settings_data.json` unless the task specifically requires it.
- Reuse existing components and naming patterns before creating duplicates.
- Run `node scripts/validate-theme.mjs` after meaningful changes.
- Check desktop, mobile, keyboard navigation, visible focus, reduced motion, image alternative text, and Theme Editor behavior.
- Never commit passwords, API keys, access tokens, environment files, or private client information.
- Never use browser-side JavaScript passwords as security.
- Keep motion purposeful and lightweight. Avoid animation that obscures content, blocks interaction, or harms mobile performance.
- Follow the brand direction: sharp but imperfect, luxurious without being cold, historical and modern, masculine and feminine, serious but strange enough to feel alive.
- Keep commit messages short and specific.
- Report incomplete work, warnings, and uncertainty honestly.

## Code comments and reasoning

- Read `docs/CODE_COMMENT_STANDARD.md` before creating or substantially changing custom Liquid, CSS, or JavaScript.
- Add comments when they preserve non-obvious intent, dependencies, Shopify behavior, accessibility requirements, performance decisions, safety rules, or removal conditions.
- For substantial custom files, use a concise `PURPOSE`, `USED BY`, and `EDIT SAFELY` header in the comment syntax appropriate to that language.
- Explain why a design or technical decision exists; do not narrate obvious syntax line by line.
- Keep comments current when behavior changes. Remove comments that no longer describe the code.
- Do not add sensitive information, client details, credentials, or passwords to comments.
- Preserve Shopify-generated comments in JSON templates.
- Use specific `TODO(NED)` notes with a replacement plan and removal condition instead of vague `fix later` comments.
- At completion, summarize the problem solved, files changed, reasoning, dependencies, validation, and remaining visual review.
