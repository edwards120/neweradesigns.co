# New Era Designs — Development Playbook

> Build one clear, testable part at a time. Save the work. Understand what changed. Then move forward.

---

## How GitHub, Shopify, and the live website relate

The repository is the version-controlled source for the theme code. A GitHub commit does **not automatically change the live storefront** unless that branch has been connected to a Shopify theme or the code is pushed to Shopify through Shopify CLI.

Use this mental model:

| Place | Purpose | Visible to customers? |
|---|---|---|
| `feature/...` branch | One isolated experiment or feature | No |
| `development` branch | Combined work being tested | No, unless connected to a Shopify preview/unpublished theme |
| Shopify development theme | Temporary local/CLI preview | No |
| Shopify unpublished theme | Persistent preview in the theme library | No |
| `main` branch | Stable approved code | Not automatically |
| Published Shopify theme | The storefront customers see | **Yes** |

### Safe default workflow

```text
feature/page-or-component
        ↓
development
        ↓
Shopify unpublished preview theme
        ↓
review + mobile test + validation
        ↓
main
        ↓
publish intentionally in Shopify
```

Never assume a branch is harmless merely because it is named `development`. Check which Shopify theme, if any, is connected to it.

---

## The eight technical skills this project should teach

### 1. Read HTML and identify the page structure

Before changing styles, identify:

- The page wrapper
- Sections
- Headings
- Paragraphs
- Links and buttons
- Images and media
- Lists
- Forms
- Repeated components

Ask: **What is this element doing in the document before I decide how it should look?**

---

### 2. Change CSS intentionally rather than randomly

Before writing CSS, state the intended result:

> “The heading needs stronger hierarchy on desktop without becoming unreadable on mobile.”

Then change the smallest responsible rule. Avoid piling on `!important`, arbitrary transforms, and duplicate selectors until something visually moves.

A CSS change should have a reason tied to:

- Hierarchy
- Layout
- Readability
- Interaction
- Responsiveness
- Accessibility
- Brand expression

---

### 3. Understand why an animation works

For each animation, identify:

- What property changes
- What triggers it
- Its starting and ending state
- Its duration and easing
- Whether JavaScript is required
- Whether it respects reduced-motion preferences
- Whether it improves meaning or only creates noise

An animation is finished only when it has a purpose, a mobile behavior, and a reduced-motion fallback.

---

### 4. Use browser developer tools

Use the browser inspector to:

- Identify which element is actually being styled
- See which CSS rule wins
- Temporarily disable properties
- Check spacing and dimensions
- Test mobile widths
- Review console errors
- Inspect network requests and large assets
- Confirm keyboard focus states

Developer tools are not only for debugging. They are how you learn what the browser is actually doing instead of guessing.

---

### 5. Break something and methodically repair it

When something fails:

1. Describe the exact visible problem.
2. Reproduce it consistently.
3. Check the browser console.
4. Identify the last known working commit.
5. Isolate HTML/Liquid, CSS, and JavaScript.
6. Disable one suspected change at a time.
7. Repair the smallest cause.
8. Retest desktop, mobile, and the Shopify editor.
9. Commit the fix with a useful message.

Do not respond to one bug by rewriting the entire page unless the architecture itself is the problem.

---

### 6. Make and reverse Git commits

A commit should represent one understandable change.

Good commit messages:

```text
Add mobile layout for editorial hero
Fix missing focus state on contact button
Separate podcast styles from global theme CSS
Revert experimental homepage gravity motion
```

Weak commit messages:

```text
stuff
fix
new
FINAL final 2
```

Before a risky edit:

```bash
git status
git add .
git commit -m "Save working state before homepage motion experiment"
```

Learn the difference between:

- Reverting a commit
- Resetting a local branch
- Restoring one file
- Deleting uncommitted work
- Force-pushing rewritten history

Do not force-push or rewrite shared history casually.

---

### 7. Explain what Shopify Liquid is doing

Liquid connects theme code to Shopify data and theme-editor settings.

Be able to explain:

- `{{ ... }}` outputs a value
- `{% ... %}` performs logic or a theme action
- `{% render 'snippet-name' %}` uses a reusable snippet
- `{% section 'section-name' %}` or JSON templates connect sections to pages
- `section.settings...` reads editor-controlled settings
- `asset_url` creates a Shopify URL for a file in `assets/`
- Schema defines editable controls and presets
- JSON templates arrange sections and store their settings

Do not paste CSS or JavaScript into Liquid merely because it is possible. Put each concern where it can be maintained.

---

### 8. Continue after the first exciting visual moment

The dramatic hero is not the website.

After the first animation works, finish:

- Mobile layout
- Keyboard access
- Reduced-motion behavior
- Loading behavior
- Page hierarchy
- Selected Work
- Services
- Contact
- Footer and navigation
- Metadata
- Broken-link checks
- Performance
- Shopify editor controls

A feature is complete when it works as part of the system—not when it produces one good screenshot.

---

## Keep Liquid, CSS, and JavaScript separate

### Liquid / HTML owns

- Semantic structure
- Shopify data
- Theme settings
- Repeated content
- Conditions and loops
- Accessible labels and document order

### CSS owns

- Typography
- Layout
- Spacing
- Color
- Responsive behavior
- Visual states
- CSS-only transitions and motion

### JavaScript owns

- State that CSS cannot manage alone
- Event-driven interactions
- Complex animation orchestration
- Data fetching
- Progressive enhancement

### Recommended feature map

```text
FEATURE: Podcast Studio

Template:
templates/page.podcast.json

Section structure:
sections/podcast-studio.liquid

Reusable components:
snippets/podcast-episode-card.liquid

Styles:
assets/ned-podcast.css

Behavior:
assets/ned-podcast.js
```

Keep the relationship documented so nobody has to search the entire repository to understand one page.

---

## Token- and attention-conscious AI workflow

### One section at a time

Finish one feature completely before asking an AI system to begin another.

Correct order:

1. Define the purpose and content.
2. Build the pure Liquid/HTML structure.
3. Save and commit the skeleton.
4. Add CSS in the proper asset file.
5. Test desktop and mobile.
6. Add JavaScript only when necessary.
7. Test Shopify editor behavior.
8. Commit the finished feature.

### Prompt AI with scope boundaries

Example:

```text
Modify only sections/ned-home-hero.liquid and assets/ned-home-hero.css.
Do not edit templates, global theme styles, settings_data.json, or unrelated Dawn files.
Preserve existing schema IDs.
Return code edits only. --code-only no-explanations
```

This prevents broad rewrites, reduces token waste, and makes errors easier to reverse.

---

## Browser and Shopify testing checklist

For every meaningful change:

### Structure

- [ ] Headings follow a logical order
- [ ] Links and buttons use the correct element
- [ ] Images have useful alternative text
- [ ] Content remains understandable without animation

### Desktop

- [ ] 1440px wide
- [ ] 1024px wide
- [ ] Text does not become excessively long
- [ ] Interactive elements do not overlap

### Mobile

- [ ] 390px wide
- [ ] 360px wide
- [ ] No horizontal scrolling
- [ ] Tap targets remain usable
- [ ] Decorative elements do not cover content

### Interaction

- [ ] Keyboard navigation works
- [ ] Focus is visible
- [ ] Hover is not the only way to reveal information
- [ ] Reduced-motion mode remains usable
- [ ] Browser console has no new errors

### Shopify

- [ ] The section appears in the editor when intended
- [ ] Settings have understandable labels
- [ ] Defaults look acceptable
- [ ] Empty settings do not create broken UI
- [ ] Saving in the editor does not break the section

### Performance

- [ ] Images use reasonable formats and sizes
- [ ] Large scripts are deferred where possible
- [ ] No duplicate libraries are loaded
- [ ] Motion does not cause obvious stuttering

---

## Launch standard

Do not wait for every experimental feature.

Launch or publish the stable redesign when these are complete:

- [ ] Home clearly states what New Era Designs does
- [ ] Selected Work contains at least three complete projects
- [ ] Services explain problems and outcomes, not only deliverables
- [ ] Contact works and gives visitors a clear next step
- [ ] Navigation and footer are complete
- [ ] Mobile is intentionally designed
- [ ] Core accessibility checks pass
- [ ] Page titles and descriptions are written
- [ ] No exposed credentials or fake security gates remain
- [ ] Theme validation passes
- [ ] A duplicate or unpublished Shopify theme has been reviewed

Then improve the motion, podcast, assistant, client experience, and experimental pages through later releases.

---

## Working principle

> Build the skeleton. Style the system. Add motion with purpose. Test the boring parts. Save the work. Then earn the next experiment.
