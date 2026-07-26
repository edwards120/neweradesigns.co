---
applyTo: "assets/**/*.css"
---

# CSS instructions

- Read `docs/CODE_COMMENT_STANDARD.md` before substantial custom styling work.
- For a substantial custom stylesheet or component group, add a short header describing `PURPOSE`, `USED BY`, and `EDIT SAFELY`.
- Comment major component boundaries, non-obvious responsive behavior, accessibility requirements, animation-performance choices, stacking contexts, and styles coupled to Liquid classes or data attributes.
- Explain the functional reason behind unusual widths, spacing, overflow, positioning, or motion choices.
- Do not narrate ordinary CSS properties line by line.
- Reuse existing custom properties and component patterns before introducing new tokens.
- Prefer mobile-first rules and test narrow screens before adding desktop complexity.
- Preserve visible keyboard focus and `prefers-reduced-motion` behavior.
- Animate opacity and transform where practical; avoid layout-heavy animation unless the effect clearly requires it.
- Keep page-specific styles isolated and clearly named so one page does not silently affect another.
- Update or remove comments when the corresponding behavior changes.
