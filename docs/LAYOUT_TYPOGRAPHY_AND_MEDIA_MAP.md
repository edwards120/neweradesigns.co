# New Era Designs — Layout, Typography, Media, and Page-System Map

> Current execution order: typography → image placement → projects and campaign content → magazines/editorial pages → interaction and animation → Pegasus refinement.

This document exists so Christopher, GitHub Copilot, ChatGPT, Gemini, DeepSeek, or another contributor can identify the correct file before changing the website. The immediate goal is consistency and clarity—not adding more effects.

---

# 1. Current priority order

## Stage 1 — Typography and global visual rules

### Problem

The website uses several strong typefaces, but their roles, sizes, spacing, and behavior are defined separately inside individual sections. Pages can therefore feel related in color while still speaking with different typographic voices.

### Required work

- Confirm that Milo, Funk Machine, Mathew Rohas, and Edwardian load reliably.
- Define one role for each typeface.
- Establish reusable desktop and mobile scales for display headings, page headings, section headings, body text, captions, labels, and buttons.
- Make script typography intentionally larger when used as emphasis.
- Check line height, tracking, wrapping, and contrast on every primary page.
- Make header and navigation typography part of the same system.
- Confirm that page titles, headings, body copy, links, and alt text support SEO and human comprehension.

### Definition of done

A visitor can move between Home, Services, Cases, Info, Contact, Podcast, campaigns, and magazine/editorial pages without the typography feeling like a different website each time.

---

## Stage 2 — Responsive image placement

### Problem

Several custom sections can accept Shopify images, but image controls are inconsistent or the relevant sections are disabled. This makes it feel as though images cannot be placed even when the underlying code supports them.

### Required work

- Inventory every image picker and hardcoded image URL.
- Standardize image ratios and focal-position controls.
- Confirm Shopify CDN image objects are used instead of brittle external URLs.
- Add useful alt text.
- Test wide, landscape, square, and portrait assets on desktop and mobile.
- Prevent forced crops from hiding the most important part of a project image.
- Keep decorative imagery separate from project evidence.

### Definition of done

Every intended project, campaign, and editorial image can be selected in Shopify, fitted deliberately, and displayed responsively without editing code for each new upload.

---

## Stage 3 — Projects and campaign content

### Problem

The Selected Work system exists and already contains project-image settings, but the homepage section is disabled. Project and campaign material therefore cannot establish authority on the current homepage.

### Required work

- Re-enable and test Selected Work only after the typography and image rules are stable.
- Replace placeholder or speculative records with approved projects.
- Clearly label completed, concept, campaign, proposal, and speculative work.
- Give each item a title, context, description, image, alt text, link, and honest status.
- Connect each project to a case page or appropriate campaign page.

### Definition of done

The homepage and Cases area show credible proof of thinking, execution, and project status—not only decorative layouts.

---

## Stage 4 — Magazine and editorial pages

### Problem

Editorial and magazine content can easily become a separate visual identity if it introduces unrelated fonts, grids, and button systems.

### Required work

- Reuse the approved global type and spacing system.
- Define article, issue, cover, caption, pull-quote, metadata, and archive patterns.
- Ensure magazine pages remain readable on phones.
- Add unique titles, descriptions, headings, internal links, and social-preview images.
- Clarify whether each page is a publication, archive, podcast companion, campaign journal, or experimental editorial feature.

### Definition of done

Magazine/editorial pages feel like a deeper New Era Designs layer rather than another unrelated website.

---

## Stage 5 — Interaction and animation

### Problem

The homepage currently contains multiple motion systems before the static hierarchy is fully resolved. Motion can amplify confusion when type, page order, imagery, and navigation are still changing.

### Required work

- Keep hover and touch feedback for links and expertise items.
- Replace hover-only behavior with pointer, keyboard, and touch-safe states.
- Respect `prefers-reduced-motion`.
- Remove motion that competes with reading or produces constant background processing.
- Add animation only after the static page is understandable.
- Test narrow mobile screens and the Shopify Theme Editor.

### Definition of done

Motion explains, rewards, or guides. Removing it would not make the website unusable or hide important content.

---

## Final stage — Pegasus refinement

Pegasus remains after the core pages, source copy, typography, images, campaigns, magazines, and animation system are stable. Its approved answer library should be updated from the final website rather than becoming the source of truth before the site itself is complete.

---

# 2. Global layout shell

## `layout/theme.liquid`

### Purpose

This is the site shell. It loads global styles, Shopify content, header/footer section groups, the current Pegasus section, and several global scripts.

### Important current behavior

The body inherits Shopify theme fonts through:

```liquid
font-family: var(--font-body-family);
```

The file also contains a global button override that forces a separate Helvetica/Arial family:

```css
.button,
a[class*="-button-"],
button[class*="-button-"] {
  font-family: "Helvetica Neue", "Arial Narrow", Arial, sans-serif !important;
}
```

### Why this matters

Even when page sections use Milo, Funk Machine, or Edwardian, global buttons can look unrelated because they are forced into another type system. The selector also affects any custom class containing `-button-`, making this override broader than it first appears.

### Repair stage

Stage 1 — Typography. Decide whether buttons use Milo or another approved utility font, then narrow or replace this global override.

### Edit safely

Do not place individual page layouts here. Keep this file as the shared site shell.

---

# 3. Header and navigation

## Active configuration: `sections/header-group.json`

The active header is:

```text
new_era_editorial_header
```

The standard Dawn `header` and an older AI-generated header block are disabled.

The active header is configured as an overlay with a dark-blue background, white text, pink hover color, Milo navigation, and separate desktop/mobile logos.

## Active implementation: `sections/new-era-editorial-header.liquid`

### Purpose

Provides desktop navigation, compact-logo behavior, mobile drawer navigation, social links, and sticky/overlay modes.

### Current blur/opacity problem

The exact rule causing the hazy overlay is:

```css
.ned-editorial-header--overlay .ned-editorial-header__frame {
  background: color-mix(in srgb, var(--ned-header-bg) 18%, transparent);
  backdrop-filter: blur(2px);
}
```

### Why it was originally added

The transparent background was intended to let the hero remain visible behind the navigation while keeping the menu readable.

### Why it currently feels wrong

At only 18% background strength, the header can look washed out rather than intentional. The blur also softens the strongest part of the first screen and can create an inexpensive glass effect that conflicts with the sharp editorial direction.

### Recommended repair direction

During Stage 1:

- Remove or reduce `backdrop-filter`.
- Use either a clean transparent overlay with deliberate text treatment or a substantially more opaque solid band.
- Keep desktop and mobile header behavior visually related.
- Add a current-page state.
- Confirm contrast against every page background.

### Do not do

Do not edit `sections/header.liquid` expecting the visible desktop header to change; that standard header is currently disabled.

---

# 4. Homepage composition

## `templates/index.json`

### Purpose

Defines the order, settings, content, colors, image selections, and enabled/disabled state of homepage sections.

### Current homepage order

```text
hero                 → new-era-editorial-hero
positioning           → new-era-editorial-panel
capabilities          → new-era-capability-field
work                  → new-era-selected-work (currently disabled)
funk_machine          → new-era-featured-experience
process               → new-era-editorial-panel
podcast               → new-era-editorial-panel
```

### Why this file matters

A section can be perfectly coded but remain invisible because it is disabled here. Content values selected in Shopify can also live in this JSON file.

### Current image finding

The `work` section already contains three Shopify project images, alt text, aspect-ratio choices, focal positions, descriptions, and links, but the section has:

```json
"disabled": true
```

This is the first reason the configured project imagery is not appearing on the homepage.

### Edit safely

Do not manually restructure `settings_data.json`. Use the Theme Editor for merchant content and carefully review changes to `templates/index.json` when changing composition.

---

# 5. Hero typography, clickable shapes, social icons, and layout

## `sections/new-era-editorial-hero.liquid`

### Purpose

Builds the homepage opening screen: headline, script line, body copy, CTA, social icons, halftone background, bottom rail, clickable kinetic labels, icon links, and optional gravity behavior.

## Custom font loading

This section currently declares all four custom fonts locally:

```css
@font-face { font-family: 'NED Milo'; ... }
@font-face { font-family: 'NED Mathew Rohas'; ... }
@font-face { font-family: 'NED Edwardian'; ... }
@font-face { font-family: 'NED Funk Machine'; ... }
```

### Problem

A homepage section should not be the only place responsible for global brand-font registration. Other pages may request these font-family names without guaranteeing the files were loaded first.

### Repair direction

During Stage 1, move approved global font registration to one shared location. Keep section-specific font choices in the sections, but load each font once.

## Script emphasis in the body paragraph

The script phrase is the `<em>` inside the body copy. Its current rule is:

```css
.ned-editorial-hero__body em {
  font-family: var(--ned-highlight-b-font);
  font-size: 1.55em;
  line-height: .64;
  transform: translateY(.1em);
}
```

### User direction

Make the script emphasis larger and more expressive.

### Reasoning

Edwardian has a narrower visual body and finer details than Milo. At the same nominal size it can appear smaller and weaker. Increasing its relative size is appropriate, but the line height and vertical translation must be adjusted with it so the script does not collide with adjacent lines.

### Repair direction

Add an editable script-emphasis scale rather than hardcoding another number. Test desktop and mobile separately.

## Hero kinetic labels

The clickable shape labels are created by `kinetic_label` blocks. Their links currently lead to Services or Cases.

The code deliberately gives different shapes to specific child positions:

```css
.ned-editorial-hero__kinetic:nth-child(2) { ... polygon shape ... }
.ned-editorial-hero__kinetic:nth-child(3) { ... organic shape ... }
```

### Why they exist

They turn service categories into navigational objects and express the brand’s balance of strict systems and irregular forms.

### Current problem

The objects are competing with the primary message, and their appearance depends on block order because `nth-child()` assigns the shape. Reordering blocks can therefore silently change their visual identity.

### Repair direction

During Stage 1 and Stage 5:

- Decide whether they remain on the opening screen.
- Replace order-dependent shape styling with explicit shape settings or classes.
- Give each a clear focus/touch state.
- Keep the page link behavior.
- Reduce visual competition with the H1 and CTA.

## Hero gravity animation

An inline JavaScript simulation moves and collides all elements carrying `data-ned-gravity-object`.

### Why it exists

It was designed to make the navigation objects feel physical and playful.

### Why it belongs later

It continuously runs `requestAnimationFrame`, updates transforms, and recalculates section bounds. The final static positions, touch behavior, and hierarchy should be solved before tuning this system.

## LinkedIn icon

The hero renders:

```liquid
{{ 'icon-linkedin.svg' | inline_asset_content }}
```

The SVG path currently has no `fill` declaration:

```svg
<path d="..."/>
```

### Why it is black

Inline SVG paths default to black unless their fill is defined or inherited.

### Correct repair

Use:

```svg
<path fill="currentColor" d="..."/>
```

This lets the icon inherit the white `color` from the hero link and become pink/white with interaction states. Also apply the same inheritance rule to other social icons for consistency.

### Touch behavior

The current social control is 42 × 42 pixels and only has an explicit `:hover` visual state. During Stage 1/5, add `:focus-visible` and `:active` feedback and confirm the touch target meets the intended minimum size.

---

# 6. Expertise / capability shapes

## `sections/new-era-capability-field.liquid`

### Purpose

Creates the homepage expertise list as individually positioned, clickable organic shapes for Wayfinding, Brand Systems, Environmental, Signage, and Spatial 3D.

### Layout controller

Every block has separate desktop/mobile controls for:

- X and Y position
- Width
- Label size
- Font style
- Rotation
- Shape and text color
- Motion arc, height, speed, and phase

### Why the shapes exist

They convert a conventional services list into a visual field and reinforce the brand’s “systems plus irregular humanity” direction.

### Current problem

The organic shape is hardcoded for every capability:

```css
border-radius: 51% 49% 57% 43% / 46% 56% 44% 54%;
```

This makes five large objects feel visually repetitive even though their labels differ. Their links are also currently blank in the homepage template, which means the fallback sends visitors to the home route rather than a relevant service page.

### Responsive-touch requirement

The current interaction pauses animation and lifts/scales on `:hover` and `:focus-visible`. Touch users need a clear pressed state and reliable destination. During Stage 5:

- Add valid links to every expertise item.
- Add `:active` feedback.
- Confirm the objects do not overlap on 360px and 390px screens.
- Consider an intentional tap state rather than relying on hover.
- Retain keyboard focus treatment.

### Possible visual repair

Keep the clickable expertise concept but replace the repeated blobs with a more disciplined family: typographic plaques, technical tags, irregular framed cards, or a controlled mixture of two to three shape types.

---

# 7. Project images and Selected Work

## `sections/new-era-selected-work.liquid`

### Purpose

Renders responsive project records with metadata, images, titles, descriptions, technical notes, links, and optional motion.

### Existing media support

It already supports:

```text
Natural
Wide 16:9
Landscape 4:3
Square
Portrait 4:5
```

It also supports focal positions:

```text
Center
Top
Bottom
Left
Right
```

The Liquid generates responsive Shopify image widths up to 2400px and uses `object-fit: cover` only when a forced ratio is selected.

### Why images may appear incorrectly after enabling

- The section is disabled in the homepage template.
- Forced aspect ratios use `object-fit: cover`, which can crop important content.
- Desktop records alternate between 82% and 67% width, producing a deliberately asymmetrical composition.
- Images are grayscale until the item is hovered.

### Repair direction

During Stage 2:

- Enable the section only in the unpublished preview.
- Test each project first with `natural` ratio.
- Choose a forced ratio only when the source composition supports it.
- Add more precise focal controls if the five existing positions are not enough.
- Decide whether the grayscale treatment supports or hides the work.
- Test images before adding reveal animation.

---

# 8. Files that control the current layout work

| Concern | Primary file | Secondary source |
|---|---|---|
| Page shell and global CSS loading | `layout/theme.liquid` | `assets/base.css` |
| Homepage section order and enabled state | `templates/index.json` | Shopify Theme Editor |
| Header structure and blur | `sections/new-era-editorial-header.liquid` | `sections/header-group.json` |
| Homepage hero typography | `sections/new-era-editorial-hero.liquid` | `templates/index.json` settings |
| Hero clickable shapes and icons | `sections/new-era-editorial-hero.liquid` | its inline gravity script |
| Hero LinkedIn/Instagram icons | `assets/icon-linkedin.svg`, `assets/icon-instagram.svg` | hero and header social CSS |
| Expertise list shapes | `sections/new-era-capability-field.liquid` | `templates/index.json` block settings |
| Project image placement | `sections/new-era-selected-work.liquid` | `templates/index.json` project blocks |
| General Dawn width and spacing rules | `assets/base.css` | theme settings in `layout/theme.liquid` |
| Section reveal/pointer motion | `assets/new-era-editorial-motion.js` | section data attributes |
| Global header/footer composition | `sections/header-group.json`, `sections/footer-group.json` | active section files |

---

# 9. First implementation task

Create a feature branch from `development`:

```text
feature/typography-layout-foundation
```

The task should not redesign every page at once. Its first deliverable is a visual-system audit and a small shared typography foundation.

## Required output

1. Inventory every custom font declaration and usage.
2. Confirm every font file actually loads.
3. Define font roles and scale tokens.
4. Remove the header haze without changing navigation structure.
5. Correct social SVG inheritance, beginning with LinkedIn.
6. Add visible hover, keyboard, and touch feedback to social controls.
7. Add an editable hero script-emphasis scale.
8. Do not enable project sections or alter animation yet.
9. Run `node scripts/validate-theme.mjs`.
10. Review the Shopify preview on desktop and mobile before merging.

---

# 10. Copilot implementation prompt

```text
Read .github/copilot-instructions.md, AGENTS.md,
docs/CODE_COMMENT_STANDARD.md, and
docs/LAYOUT_TYPOGRAPHY_AND_MEDIA_MAP.md before editing.

Work from development on feature/typography-layout-foundation.

Task: Build the first typography and layout-foundation pass only.

Problems to solve:
- Custom font roles and loading are fragmented across sections.
- The active editorial header has a weak translucent blur treatment.
- The LinkedIn SVG defaults to black instead of inheriting the intended icon color.
- Social controls need keyboard and touch feedback, not hover only.
- The Edwardian script emphasis in the homepage body needs an editable scale and responsive spacing.

Do not:
- Enable Selected Work yet.
- Redesign project, campaign, or magazine pages.
- Change Pegasus.
- Add new animation.
- Edit the disabled Dawn header expecting it to affect the visible header.

Preserve:
- Shopify Theme Editor controls.
- Existing page links.
- Mobile navigation behavior.
- Reduced-motion support.
- Current development-to-Shopify preview connection.

Add useful PURPOSE / USED BY / EDIT SAFELY comments where the reasoning must travel with the code.
Run node scripts/validate-theme.mjs.
Report files changed, reasoning, visual-review needs, and remaining warnings.
```
