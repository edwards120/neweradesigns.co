# New Era Designs — Code Comment Standard

This guide exists so Christopher and any AI assistant can understand **why custom code exists**, not merely what each line does.

The goal is not to comment everything. Too many obvious comments make code harder to read and easier to ignore. Comments should preserve decisions, dependencies, safety rules, and non-obvious behavior that could otherwise be accidentally removed later.

---

## The comment test

Add a comment when at least one of these is true:

- The code solves a specific business, design, accessibility, Shopify, or performance problem.
- The behavior is not obvious from the code alone.
- Another file, theme setting, template, section, or asset depends on it.
- A future editor might reasonably “simplify” it and break something.
- The code intentionally works around Shopify behavior or browser differences.
- A value or threshold was selected for a reason.
- The code affects security, privacy, publishing, client access, or the connected Shopify preview.
- The implementation is temporary, incomplete, or scheduled for replacement.

Do not add comments that only translate syntax into English.

Weak:

```js
// Add one to index
index += 1;
```

Useful:

```js
// Skip the second character because the current pair closes a block comment (`*/`).
index += 1;
```

---

## Preferred comment structure

For substantial custom sections, scripts, or systems, place a short header near the top:

```text
PURPOSE: What problem this file solves.
USED BY: Templates, sections, assets, or workflows that depend on it.
EDIT SAFELY: What must remain true when this code changes.
```

Example for a Shopify section:

```liquid
{% comment %}
  PURPOSE: Provides an editable editorial hero without hardcoding homepage content.
  USED BY: templates/index.json and assets/ned-editorial-home.css.
  EDIT SAFELY: Preserve the schema setting IDs because Shopify stores merchant values by ID.
{% endcomment %}
```

Example for JavaScript:

```js
/**
 * PURPOSE: Adds optional reveal motion only after the page remains usable without JavaScript.
 * USED BY: Elements carrying the `data-ned-reveal` attribute.
 * EDIT SAFELY: Keep the reduced-motion and Shopify Theme Editor checks intact.
 */
```

Example for CSS:

```css
/*
 * PURPOSE: Keeps case-study text readable while allowing full-width project imagery.
 * USED BY: sections/ned-case-study.liquid.
 * EDIT SAFELY: Preserve the mobile width limit and visible keyboard focus treatment.
 */
```

---

## Explain decisions, not taste alone

Comments should connect visual decisions to a functional reason.

Weak:

```css
/* Makes it look cooler */
```

Useful:

```css
/* The narrower measure separates long-form case reasoning from promotional page copy and improves reading rhythm on desktop. */
```

Weak:

```js
// Nice animation
```

Useful:

```js
// Animate only opacity and transform so the entrance does not trigger repeated layout recalculation while scrolling.
```

---

## Shopify Liquid comments

Use `{% comment %} ... {% endcomment %}` for developer notes that should not appear in the rendered HTML.

Comment these situations:

- Why a section setting exists
- Why a fallback is required
- Which template loads the section
- Why a Shopify object or filter is being used
- Why a block ID or schema setting ID must remain stable
- Why code behaves differently inside the Theme Editor
- Why content is escaped, sanitized, or intentionally rendered as rich text

Do not comment every Liquid assignment or condition. Do not place sensitive information inside comments because repository comments are still public code.

---

## CSS comments

Comment:

- Major component boundaries
- Non-obvious responsive behavior
- Accessibility requirements
- Stacking-context or overflow decisions
- Animation-performance decisions
- Shared custom properties with an important meaning
- Styles coupled to a specific Liquid class or data attribute

Do not comment every property. Prefer one useful comment above a related ruleset.

---

## JavaScript comments

Use JSDoc-style headers for exported or important functions when they clarify inputs, outputs, side effects, or safety requirements.

Comment:

- Shopify Theme Editor event handling
- DOM assumptions and required selectors
- Reduced-motion behavior
- Cleanup and event-listener removal
- Fallback behavior when an element or API is unavailable
- Why a browser API was selected
- State stored in cookies, local storage, or session storage
- Performance-sensitive observers, loops, or animation logic

Never describe browser-side storage or obfuscation as secure authentication.

---

## JSON and Shopify-generated files

Do not add casual comments to strict JSON files.

Shopify may place its own generated `/* ... */` header in JSON templates. Preserve that header. Do not assume all tools can parse those files with ordinary `JSON.parse()`; use the repository theme validator, which understands Shopify comment-prefixed JSON.

Avoid manually editing `config/settings_data.json` unless the task specifically requires it. Shopify may overwrite theme-managed JSON.

---

## Temporary and unfinished code

Temporary work must say:

- Why it is temporary
- What replaces it
- What would make removal safe

Use this format:

```text
TODO(NED): Replace this fallback after [specific dependency or feature] is complete.
Removal condition: [specific test or state that proves it is safe].
```

Do not leave vague comments such as `TODO: fix later`.

---

## Comments must stay truthful

When behavior changes, update or remove its comment in the same commit. An outdated explanation is more dangerous than no explanation.

During review, ask:

1. Does the comment still describe the actual behavior?
2. Does it explain a decision that the code cannot explain by itself?
3. Does it reveal sensitive information?
4. Could the name or structure be clearer instead of adding a comment?
5. Would Christopher understand what can safely be changed?
6. Would a new AI assistant understand the dependency and avoid undoing it?

---

## Required completion note for AI-created code

When an assistant finishes a meaningful code change, its final summary should state:

- **Problem solved**
- **Files changed**
- **Reasoning behind the implementation**
- **Important dependencies or assumptions**
- **Validation performed**
- **What remains unfinished or requires visual review**

Comments belong in code when the reasoning must travel with the implementation. Longer strategy belongs in `docs/` and should be linked from the relevant code comment when useful.
