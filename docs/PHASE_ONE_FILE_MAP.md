FILE: layout/theme.liquid
TYPE: Layout
ACTIVE OR INACTIVE: Active
REFERENCED BY: Shopify storefront runtime
REFERENCES: sections/header-group, sections/footer-group, section 'aether-guided-assistant', assets/base.css, assets/global.js, assets/new-era-halftone.css
PAGES AFFECTED: All non-password pages
EDITOR SETTINGS: Global theme settings from config/settings_schema.json
RESPONSIVE RESPONSIBILITY: Global viewport/meta, global button baseline, page shell
ANIMATION RESPONSIBILITY: Global reveal script include and editorial motion include
MEDIA RESPONSIBILITY: Global CSS/JS and font preloads
PLANNED ACTION:
- patch

FILE: layout/password.liquid
TYPE: Layout
ACTIVE OR INACTIVE: Active
REFERENCED BY: templates/password.json and password storefront state
REFERENCES: sections/main-password-header, sections/main-password-footer, assets/section-password.css, assets/password-modal.js
PAGES AFFECTED: Password layout pages
EDITOR SETTINGS: Password-specific section settings + global settings
RESPONSIVE RESPONSIBILITY: Password layout shell
ANIMATION RESPONSIBILITY: Minimal modal behavior
MEDIA RESPONSIBILITY: Password page logo/social assets
PLANNED ACTION:
- preserve

FILE: config/settings_schema.json
TYPE: Config schema
ACTIVE OR INACTIVE: Active
REFERENCED BY: Shopify Theme Editor
REFERENCES: Global design tokens (colors, typography, layout, animation toggles)
PAGES AFFECTED: All pages
EDITOR SETTINGS: Defines available global settings
RESPONSIVE RESPONSIBILITY: Page width/spacing settings
ANIMATION RESPONSIBILITY: Global reveal/hover animation options
MEDIA RESPONSIBILITY: Logo/favicon and media styling controls
PLANNED ACTION:
- extend

FILE: sections/header-group.json
TYPE: Section group JSON
ACTIVE OR INACTIVE: Active
REFERENCED BY: layout/theme.liquid
REFERENCES: sections/new-era-editorial-header, sections/header, sections/announcement-bar, multiple _blocks sections
PAGES AFFECTED: All pages
EDITOR SETTINGS: Header navigation and branding controls
RESPONSIVE RESPONSIBILITY: Mobile/desktop header behavior is delegated to included sections
ANIMATION RESPONSIBILITY: Header motion/hover behavior via section settings
MEDIA RESPONSIBILITY: Header logos and social links
PLANNED ACTION:
- patch

FILE: sections/footer-group.json
TYPE: Section group JSON
ACTIVE OR INACTIVE: Active
REFERENCED BY: layout/theme.liquid
REFERENCES: sections/footer, multiple _blocks sections
PAGES AFFECTED: All pages
EDITOR SETTINGS: Footer content and color scheme settings
RESPONSIVE RESPONSIBILITY: Footer spacing and block grid behavior
ANIMATION RESPONSIBILITY: Optional reveal behavior inherited from global settings
MEDIA RESPONSIBILITY: Footer image/social blocks
PLANNED ACTION:
- patch

FILE: sections/new-era-editorial-header.liquid
TYPE: Section (custom)
ACTIVE OR INACTIVE: Active
REFERENCED BY: sections/header-group.json
REFERENCES: Header navigation routes (/pages/info, /pages/marketing-materials, /pages/contact, etc.)
PAGES AFFECTED: All pages
EDITOR SETTINGS: Primary branded header controls
RESPONSIVE RESPONSIBILITY: Custom mobile + desktop header behavior
ANIMATION RESPONSIBILITY: Hover/motion micro-interactions
MEDIA RESPONSIBILITY: Desktop/mobile logo assets
PLANNED ACTION:
- patch

FILE: sections/footer.liquid
TYPE: Section (core)
ACTIVE OR INACTIVE: Active
REFERENCED BY: sections/footer-group.json
REFERENCES: snippets/social-icons, newsletter form, policy links
PAGES AFFECTED: All pages
EDITOR SETTINGS: Footer blocks + spacing + color scheme
RESPONSIVE RESPONSIBILITY: Footer grid and mobile stacking
ANIMATION RESPONSIBILITY: Optional reveal-on-scroll classes
MEDIA RESPONSIBILITY: Footer brand image, social icons
PLANNED ACTION:
- preserve

FILE: templates/index.json
TYPE: Template JSON
ACTIVE OR INACTIVE: Active
REFERENCED BY: Home route
REFERENCES: sections/new-era-editorial-hero, new-era-editorial-panel, new-era-capability-field, new-era-featured-experience, new-era-selected-work
PAGES AFFECTED: Homepage
EDITOR SETTINGS: Extensive section + block settings
RESPONSIVE RESPONSIBILITY: Delegated to included sections
ANIMATION RESPONSIBILITY: Kinetic labels/icons and section motion settings
MEDIA RESPONSIBILITY: Home hero and case imagery
PLANNED ACTION:
- preserve

FILE: sections/new-era-homepage.liquid
TYPE: Section (custom legacy home system)
ACTIVE OR INACTIVE: Active (route-dependent)
REFERENCED BY: Templates/pages using section type new-era-homepage
REFERENCES: snippets/new-era-service-work, multiple /pages/* links
PAGES AFFECTED: Home/services/contact contexts when used
EDITOR SETTINGS: Home content, CTAs, media, typography, animated objects
RESPONSIVE RESPONSIBILITY: Extensive custom responsive CSS
ANIMATION RESPONSIBILITY: Orb/hero/button/motion effects
MEDIA RESPONSIBILITY: Hero imagery and masked media
PLANNED ACTION:
- patch

FILE: sections/new-era-page-system.liquid
TYPE: Section (custom)
ACTIVE OR INACTIVE: Active
REFERENCED BY: templates/page.json, templates/page.Cases.json, templates/page.marketing_materials.json
REFERENCES: Custom portfolio blocks and page modules
PAGES AFFECTED: Info, services, cases, related custom pages
EDITOR SETTINGS: Page-system controls and reusable blocks
RESPONSIVE RESPONSIBILITY: Page-system responsive layout logic
ANIMATION RESPONSIBILITY: Section-level interactions and optional motion
MEDIA RESPONSIBILITY: Project/media cards
PLANNED ACTION:
- patch

FILE: sections/_blocks.liquid
TYPE: Section (shared host)
ACTIVE OR INACTIVE: Active
REFERENCED BY: templates/collection.json, templates/page.Cases.json, templates/page.brand-architecture.json, templates/page.design-process.json, templates/page.identity-construction-p.json, templates/page.opinew_all_reviews.json, templates/page.password-protected-project.json, templates/page.signage-and-luxury.json
REFERENCES: /blocks/*.liquid via `content_for 'blocks'`
PAGES AFFECTED: Any template using section type `_blocks`
EDITOR SETTINGS: Supports theme/app blocks configured in template JSON
RESPONSIVE RESPONSIBILITY: Delegated to individual block implementations
ANIMATION RESPONSIBILITY: Delegated to individual block implementations
MEDIA RESPONSIBILITY: Delegated to individual block implementations
PLANNED ACTION:
- preserve

FILE: sections/aether-guided-assistant.liquid
TYPE: Section (custom assistant)
ACTIVE OR INACTIVE: Active
REFERENCED BY: layout/theme.liquid
REFERENCES: assets/aether-guided-assistant.css, assets/aether-guided-assistant.js, snippets/aether-knowledge-items, snippets/aether-mascot
PAGES AFFECTED: All pages where section is rendered globally
EDITOR SETTINGS: Assistant behavior, copy, colors, motion, prompts, links
RESPONSIVE RESPONSIBILITY: Floating assistant + panel layout behavior
ANIMATION RESPONSIBILITY: Nudge/bubble/flight/drag toggles and timing
MEDIA RESPONSIBILITY: Character image and fallback mascot assets
PLANNED ACTION:
- patch

FILE: snippets/aether-knowledge-items.liquid
TYPE: Snippet (data source)
ACTIVE OR INACTIVE: Active
REFERENCED BY: sections/aether-guided-assistant.liquid
REFERENCES: Internal /pages/* destinations in assistant answers
PAGES AFFECTED: Assistant panel links across site
EDITOR SETTINGS: Indirect (through assistant section rendering)
RESPONSIVE RESPONSIBILITY: None
ANIMATION RESPONSIBILITY: None
MEDIA RESPONSIBILITY: None
PLANNED ACTION:
- patch

FILE: snippets/aether-mascot.liquid
TYPE: Snippet
ACTIVE OR INACTIVE: Active
REFERENCED BY: sections/aether-guided-assistant.liquid
REFERENCES: assets/aether-assistant.png, assets/aether-assistant-animated.webp
PAGES AFFECTED: Assistant UI
EDITOR SETTINGS: Indirect via section image settings
RESPONSIVE RESPONSIBILITY: Image output only
ANIMATION RESPONSIBILITY: Reduced-motion image fallback path
MEDIA RESPONSIBILITY: Mascot media output
PLANNED ACTION:
- preserve

FILE: assets/aether-guided-assistant.js
TYPE: Asset JavaScript
ACTIVE OR INACTIVE: Active
REFERENCED BY: sections/aether-guided-assistant.liquid
REFERENCES: data-aether-* DOM contract + knowledge JSON payload
PAGES AFFECTED: Assistant behavior where rendered
EDITOR SETTINGS: Reads dynamic section settings via data attributes and JSON
RESPONSIVE RESPONSIBILITY: Open/close/focus behavior across breakpoints
ANIMATION RESPONSIBILITY: Nudge, bubble, flying-scroll, drag interactions
MEDIA RESPONSIBILITY: None directly
PLANNED ACTION:
- patch

FILE: assets/aether-guided-assistant.css
TYPE: Asset CSS
ACTIVE OR INACTIVE: Active
REFERENCED BY: sections/aether-guided-assistant.liquid
REFERENCES: .aether-assistant DOM classes
PAGES AFFECTED: Assistant UI everywhere rendered
EDITOR SETTINGS: Color/size variables injected from section settings
RESPONSIVE RESPONSIBILITY: Desktop/mobile panel and launcher rules
ANIMATION RESPONSIBILITY: Floating/pulse/message/bubble transitions
MEDIA RESPONSIBILITY: Visual treatment of mascot and panel
PLANNED ACTION:
- patch

FILE: templates/page.client-files.json
TYPE: Template JSON
ACTIVE OR INACTIVE: Active
REFERENCED BY: /pages/client-files handle
REFERENCES: sections/client-files-content
PAGES AFFECTED: Client files page
EDITOR SETTINGS: Client files section and project blocks
RESPONSIVE RESPONSIBILITY: Delegated to section
ANIMATION RESPONSIBILITY: Delegated to section
MEDIA RESPONSIBILITY: Project PDFs/videos/3D model URLs and posters
PLANNED ACTION:
- patch

FILE: sections/client-files-content.liquid
TYPE: Section (custom protected content presentation)
ACTIVE OR INACTIVE: Active
REFERENCED BY: templates/page.client-files.json
REFERENCES: Browser cookie guard logic + project media renderers
PAGES AFFECTED: Client files page
EDITOR SETTINGS: Archive copy, feature video, per-project media controls
RESPONSIVE RESPONSIBILITY: Media frame heights and mobile layout handling
ANIMATION RESPONSIBILITY: Minimal (UI state, no major physics)
MEDIA RESPONSIBILITY: PDF, video, and model rendering
PLANNED ACTION:
- patch

FILE: sections/section-password-gate.liquid
TYPE: Section (custom notice gate)
ACTIVE OR INACTIVE: Active
REFERENCED BY: templates/page.password-protected-page.json, templates/page.password-protected-project.json
REFERENCES: Editable message/CTA settings
PAGES AFFECTED: Protected-project notice pages
EDITOR SETTINGS: Gate message and button configuration
RESPONSIVE RESPONSIBILITY: Notice card breakpoints
ANIMATION RESPONSIBILITY: None
MEDIA RESPONSIBILITY: None
PLANNED ACTION:
- preserve

FILE: sections/section-protected-guard.liquid
TYPE: Section (custom guard script)
ACTIVE OR INACTIVE: Active (where included)
REFERENCED BY: Protected templates/sections that include this guard
REFERENCES: Browser cookie `ned_projects_access` and gate URL redirects
PAGES AFFECTED: Protected page flow
EDITOR SETTINGS: None
RESPONSIVE RESPONSIBILITY: None
ANIMATION RESPONSIBILITY: None
MEDIA RESPONSIBILITY: None
PLANNED ACTION:
- replace specific component

FILE: templates/page.password-protected-page.json
TYPE: Template JSON
ACTIVE OR INACTIVE: Active
REFERENCED BY: Protected page route
REFERENCES: sections/section-password-gate
PAGES AFFECTED: Access notice page
EDITOR SETTINGS: Gate section settings
RESPONSIVE RESPONSIBILITY: Delegated to section
ANIMATION RESPONSIBILITY: None
MEDIA RESPONSIBILITY: None
PLANNED ACTION:
- preserve

FILE: templates/page.password-protected-project.json
TYPE: Template JSON
ACTIVE OR INACTIVE: Active
REFERENCED BY: Protected project route
REFERENCES: sections/section-password-gate
PAGES AFFECTED: Access notice page
EDITOR SETTINGS: Gate section settings
RESPONSIVE RESPONSIBILITY: Delegated to section
ANIMATION RESPONSIBILITY: None
MEDIA RESPONSIBILITY: None
PLANNED ACTION:
- preserve

FILE: templates/page.podcast.json
TYPE: Template JSON
ACTIVE OR INACTIVE: Active
REFERENCED BY: /pages/podcast
REFERENCES: sections/podcast-studio
PAGES AFFECTED: Podcast page
EDITOR SETTINGS: Platform and episode blocks
RESPONSIVE RESPONSIBILITY: Delegated to section
ANIMATION RESPONSIBILITY: Marquee/spin controls in section settings
MEDIA RESPONSIBILITY: Podcast episode and visual metadata
PLANNED ACTION:
- preserve

FILE: sections/podcast-studio.liquid
TYPE: Section (custom)
ACTIVE OR INACTIVE: Active
REFERENCED BY: templates/page.podcast.json
REFERENCES: Episode/platform blocks and podcast theme styles
PAGES AFFECTED: Podcast page
EDITOR SETTINGS: Podcast copy/visual/motion settings
RESPONSIVE RESPONSIBILITY: Podcast layout across desktop/mobile
ANIMATION RESPONSIBILITY: Record spin and marquee timing
MEDIA RESPONSIBILITY: Podcast branding and episode cards
PLANNED ACTION:
- patch

FILE: assets/new-era-editorial-motion.js
TYPE: Asset JavaScript
ACTIVE OR INACTIVE: Active
REFERENCED BY: layout/theme.liquid
REFERENCES: Editorial section classes/data attributes
PAGES AFFECTED: Editorial/custom pages that include matching selectors
EDITOR SETTINGS: Indirect through section classes/settings
RESPONSIVE RESPONSIBILITY: Interaction lifecycle support
ANIMATION RESPONSIBILITY: Editorial motion system
MEDIA RESPONSIBILITY: None direct
PLANNED ACTION:
- patch

FILE: assets/new-era-halftone.css
TYPE: Asset CSS
ACTIVE OR INACTIVE: Active
REFERENCED BY: layout/theme.liquid
REFERENCES: Body utility classes and global halftone variables
PAGES AFFECTED: All pages when enabled by settings
EDITOR SETTINGS: Halftone settings in theme config
RESPONSIVE RESPONSIBILITY: Global halftone rendering behavior
ANIMATION RESPONSIBILITY: Optional halftone movement
MEDIA RESPONSIBILITY: Background treatment only
PLANNED ACTION:
- preserve

---

## Batch A Resolution Log (Directive Follow-up)

### `_blocks.liquid` decision and references

- `_blocks` is **intentionally required**, not a fake validator shim.
- Active template references to section type `_blocks` were confirmed in:
  - `templates/collection.json` (3 references)
  - `templates/page.Cases.json` (1 reference)
  - `templates/page.brand-architecture.json` (9 references)
  - `templates/page.design-process.json` (6 references)
  - `templates/page.identity-construction-p.json` (9 references)
  - `templates/page.opinew_all_reviews.json` (1 reference)
  - `templates/page.password-protected-project.json` (6 references)
  - `templates/page.signage-and-luxury.json` (10 references)
- Section-group references to `_blocks`:
  - `sections/header-group.json`: 2 `_blocks` sections, both `disabled: true`.
  - `sections/footer-group.json`: 3 `_blocks` sections; includes one enabled group with `ai_gen_block_e946ecc` block (block itself currently `disabled: true` in group data), plus additional empty host entries.
- Why it exists: JSON templates/section-groups are using theme blocks (`ai_gen_block_*`) and app blocks through a generic host; removing `_blocks` would break those section trees.
- Block compatibility checks:
  - All referenced `ai_gen_block_*` files exist (`blocks/*.liquid`), no missing block type files.
  - Added missing `block.shopify_attributes` in `blocks/ai_gen_block_0737cff.liquid` root wrapper.
  - `_blocks.liquid` keeps `content_for 'blocks'` with schema support for both `@theme` and `@app`.
  - This schema is correct for referenced usage because the JSON entries instantiate theme blocks (`ai_gen_block_*`) and optional app blocks inside host `_blocks` sections.
  - Theme Editor behavior alignment: `content_for 'blocks'` + `@theme/@app` schema + `block.shopify_attributes` in referenced block files is the required contract for selecting/reordering/duplicating blocks in the editor.

### Empty placeholder sections

- `sections/page-cases-concept.liquid`
  - Reference scan result: no active template/section-group/snippet references by section type or filename.
  - Action: deleted as inactive empty placeholder.
- `sections/section-projects-showcase.liquid`
  - Reference scan result: no active template/section-group/snippet references by section type or filename.
  - Action: deleted as inactive empty placeholder.

### Missing font dependency resolution

- Problem source: `sections/cases-page.liquid` referenced missing asset `edwardianscript.woff2`.
- Repository-wide checks found approved existing custom usage via Shopify Files:
  - `sections/new-era-editorial-hero.liquid`
  - `sections/new-era-homepage.liquid`
  - `sections/new-era-page-system.liquid`
  - all use `edwardianscriptitc.ttf` via `file_url`.
- Action in `sections/cases-page.liquid`:
  - Replaced broken `@font-face` source with `edwardianscriptitc.ttf | file_url`.
  - Added Theme Editor control `billboard_script_font_mode` to choose:
    - custom Edwardian file
    - heading font
    - body font
  - Applied through `--ned-script-font` to keep visual role without 404 asset dependency.

### Assistant route cleanup verification

- Legacy routes removed from assistant knowledge flow:
  - `/pages/services-page`
  - `/pages/design-process`
  - `/pages/retainer` (legacy handle form)
- No runtime route rewrite remains in `sections/aether-guided-assistant.liquid` (replace pipeline removed).
- No legacy route strings remain in assistant JS/Liquid route logic:
  - `sections/aether-guided-assistant.liquid`
  - `assets/aether-guided-assistant.js`
  - `snippets/aether-knowledge-items.liquid`
- Active destination route sources confirmed:
  - `/pages/marketing-materials` in active header nav + assistant knowledge items.
  - `/pages/info` in active header nav + assistant knowledge items.
  - `/pages/retainer-services` in active header nav + assistant knowledge items.
  - `/pages/protected-projects-1` in active header nav + assistant knowledge items + protected-guard.
- Additional non-assistant legacy link cleanup:
  - `sections/new-era-page-system.liquid` CTA previously using `/pages/design-process` now points to `/pages/info` to match current active route convention.

### Additional implementation continuation (B–E starter pass)

- Batch B (tokens/typography/spacing/preserved pink/responsive controls):
  - Added global Theme Editor control section in `config/settings_schema.json`:
    - accent/highlight colors
    - global section spacing (desktop/mobile)
    - global button radius/size/padding (desktop/mobile)
    - global motion preset/intensity/pointer strength/highlight duration
  - Wired settings in `layout/theme.liquid` root variables and global button system.
  - Preserved pink accent via configurable `ned_accent_pink`.
- Batch C (editor image connectivity):
  - `sections/cases-page.liquid` case block now supports `image_picker` (`id: image`) with safe fallback to existing `image_url` field (no data loss).
  - Model poster now uses editor image when present.
- Batch D (active header repair):
  - `sections/new-era-editorial-header.liquid` updated mobile drawer behavior:
    - keyboard focus trap
    - Escape close
    - focus return to trigger
    - body scroll lock while drawer is open
    - toggle focus-visible outline
- Batch E (shared kinetic/motion system):
  - `assets/new-era-editorial-motion.js` now honors global motion preset and pointer strength scaling (`data-ned-motion`, `--ned-pointer-strength`).
  - Motion-off mode now disables pointer/reveal motion fallthrough while preserving visibility.

### Files changed/deleted in this pass

- Changed:
  - `sections/cases-page.liquid`
  - `blocks/ai_gen_block_0737cff.liquid`
  - `sections/new-era-editorial-header.liquid`
  - `layout/theme.liquid`
  - `assets/new-era-editorial-motion.js`
  - `config/settings_schema.json`
  - `snippets/aether-knowledge-items.liquid` (route cleanup from earlier pass)
  - `sections/aether-guided-assistant.liquid` (runtime route rewrite removal from earlier pass)
  - `sections/_blocks.liquid` (added host section in earlier pass)
- Deleted:
  - `sections/page-cases-concept.liquid`
  - `sections/section-projects-showcase.liquid`

### Validation

- Command run: `node scripts/validate-theme.mjs`
- Result: **Theme structure validation passed.**
- Remaining warnings / manual checks:
  - Structure validator reports no warnings in current pass.
  - Shopify Theme Editor runtime confirmations (manual in Shopify admin still required): visual editability of all `_blocks` hosts in their assigned templates, plus live duplicate/reorder behavior.
  - Assistant runtime UX confirmations (manual browser pass still required): launcher/panel click flow, keyboard escape/open-close behavior, and link response flow on active pages.

## Batch E Expansion — Shared Natural Kinetic + Responsive Motion Architecture

- Shared runtime upgraded in `assets/new-era-editorial-motion.js`:
  - Added per-root controller registry keyed by motion roots and Shopify section boundaries.
  - Added lifecycle-safe init/destroy wiring for `shopify:section:load`, `shopify:section:unload`, and `shopify:section:reorder`.
  - Added centralized entrance observer for `[data-ned-reveal]` and `[data-ned-animate]` with threshold controls.
  - Added text token reveal for plain-text headings marked with `data-ned-text-reveal`.
  - Added pointer-field controller for `[data-ned-pointer-field]` using shared strength tokens.
  - Added kinetic-field controller for `[data-ned-kinetic-field]` and `[data-ned-gravity="true"]` with:
    - bounded motion
    - object-object collision toggle
    - obstacle collision toggle for `[data-ned-collision-obstacle]`
    - pause/resume based on viewport and document visibility
  - Added reduced-motion reinitialization and block-select pause behavior in Theme Editor.

- Shared motion styles added in `assets/new-era-editorial-motion.css`:
  - Introduced generic `data-ned-animate` and `is-ned-visible` transitions.
  - Added clip-up/fade directional presets and text token stagger support.
  - Added strict motion-off and reduced-motion fallbacks to preserve readability.

- Theme shell wiring updates in `layout/theme.liquid`:
  - Included `new-era-editorial-motion.css`.
  - Added global motion CSS variables:
    - `--ned-motion-duration`
    - `--ned-motion-distance`
    - `--ned-motion-scale-start`
    - `--ned-motion-blur-start`
    - `--ned-motion-stagger-step`
  - Added motion behavior datasets on `<body>`:
    - `data-ned-motion-threshold`
    - `data-ned-motion-kinetic-collision`
    - `data-ned-motion-obstacle-collision`
  - Highlight script no longer creates its own IntersectionObserver; highlight activation now routes through shared motion hooks by setting `data-ned-animate` attributes.

- Theme Editor controls expanded in `config/settings_schema.json`:
  - `ned_motion_duration`
  - `ned_motion_distance`
  - `ned_motion_scale_start`
  - `ned_motion_blur_start`
  - `ned_motion_stagger_step`
  - `ned_motion_viewport_threshold`
  - `ned_motion_kinetic_collision`
  - `ned_motion_obstacle_collision`

- Motion-root markup alignment:
  - `sections/_blocks.liquid` now declares `data-ned-motion-root="true"` on the host wrapper.
  - `sections/new-era-editorial-hero.liquid` now declares:
    - `data-ned-motion-root="true"`
    - conditional `data-ned-kinetic-field` (only when gravity is enabled)
    - obstacle markers on title/body/button via `data-ned-collision-obstacle`
  - `sections/new-era-editorial-panel.liquid`, `sections/new-era-selected-work.liquid`, `sections/new-era-capability-field.liquid`, and `sections/new-era-featured-experience.liquid` now declare `data-ned-motion-root="true"` for shared runtime registration.
  - Text reveal hook enabled on plain-text section headings in:
    - `sections/new-era-editorial-panel.liquid`
    - `sections/new-era-selected-work.liquid`
    - `sections/new-era-capability-field.liquid`

## Preview + GitHub integrity verification gate (current pass)

DEVELOPMENT PREVIEW:
- Blocked: Shopify CLI has no authenticated store session in this environment (`shopify store auth list` reports no authenticated stores).

UNPUBLISHED PREVIEW:
- Not created (blocked by store authentication).

THEME EDITOR:
- Not available in this environment due missing store authentication.

PAGES TESTED:
- Runtime page-by-page visual verification blocked (no preview URL available).

VIEWPORTS TESTED:
- Not executed in browser (preview unavailable).

IMAGE SETTINGS TESTED:
- Theme Editor image workflow not testable without authenticated preview.

TYPOGRAPHY SETTINGS TESTED:
- Theme Editor typography workflow not testable without authenticated preview.

LAYOUT SETTINGS TESTED:
- Theme Editor layout workflow not testable without authenticated preview.

HEADER TESTED:
- Static/runtime code verification complete; repeated interactive browser pass blocked by missing preview.

ASSISTANT TESTED:
- Route/static contract verified in code; live panel interaction blocked by missing preview.

PROTECTED PAGE TESTED:
- Static code path verified; live authorization flow not testable without preview.

MOTION TESTED:
- Structure + script parse + load-once checks completed.
- Live viewport/scroll/device behavior blocked by missing preview authentication.

CONSOLE ERRORS:
- Browser console inspection not available without preview session.

NETWORK ERRORS:
- Browser network inspection not available without preview session.

FIXES APPLIED:
- `blocks/ai_gen_block_65364b6.liquid`: added `width`/`height` on background image.
- `sections/section-password-gate.liquid`: shortened schema name to pass length rule.
- `sections/featured-product.liquid`: replaced missing translation-key header references with explicit text for icon-with-text header.
- `snippets/social-icons.liquid`: replaced missing LinkedIn translation lookup with explicit accessible label.
- `locales/en.default.json` and `locales/en.default.schema.json`: reverted temporary translation-key additions that caused cross-locale matching errors.

VALIDATION RESULTS:
- `git branch --show-current` → `development`
- `git branch -vv` → `development` tracks `origin/development`, currently behind by 4 commits.
- `git status --short` / `git diff --stat` / `git diff --check` completed; no conflict markers in changed files.
- `node scripts/validate-theme.mjs` → pass.
- `shopify theme check` → pass with warnings only (no errors), summary: 244 files, 21 warnings across 17 files.
- `npm run` / `npm test` / `npm run lint` / `npm run build` not runnable: repository has no `package.json`.
- `shopify version` available (4.5.2), but `shopify theme info/list --store neweradesigns.myshopify.com` fail due unauthenticated/connection state.

GITHUB STATUS:
- Branch: `development`
- Tracking: `origin/development`
- Ahead/behind: behind by 4
- Modified files: 23
- Added files: 4 (untracked)
- Deleted files: 2
- Untracked files: `NEW_ERA_PHASE_ONE_COPILOT_DIRECTIVE.md`, `docs/PHASE_ONE_FILE_MAP.md`, `assets/new-era-editorial-motion.css`, `sections/_blocks.liquid`

SAFE TO CONTINUE:
- **NO** for full runtime animation expansion until authenticated Shopify preview + Theme Editor verification is completed.

---

## STORE CORRECTION PASS (AUTHORITATIVE STORE: `twuh03-dk.myshopify.com`)

DATE CONTEXT:
- Follow-up verification run after store correction from `neweradesigns.myshopify.com` to `twuh03-dk.myshopify.com`.

COMMAND OUTCOME SUMMARY:
- `git branch --show-current` → `development`
- `git status --short` → repository remains intentionally dirty with Phase One edits in progress
- `node scripts/validate-theme.mjs` → pass
- `shopify theme check` → warnings only, no errors
- `shopify version` → `4.5.2`
- `shopify theme info --store twuh03-dk.myshopify.com` → success
- `shopify theme list --store twuh03-dk.myshopify.com` → success
- Safety guard confirmed: no `--publish`, no `--allow-live`.

PREVIEW START DETAILS:
- Direct `shopify theme dev --theme-editor-sync` failed in non-interactive CLI due JSON reconciliation prompt requirements.
- Safe resolution:
  - created/pushed unpublished theme: `NED Phase1 Dev Sync` (`188070265137`)
  - started dev preview against that unpublished theme using:
    - `shopify theme dev --store twuh03-dk.myshopify.com --theme 188070265137 --theme-editor-sync --nodelete --ignore "*.json"`

PREVIEW IDENTIFIERS:
- STORE: `twuh03-dk.myshopify.com`
- LOCAL PREVIEW URL: `http://127.0.0.1:9292`
- SHOPIFY PREVIEW URL: `https://twuh03-dk.myshopify.com/?preview_theme_id=188070265137`
- SHOPIFY THEME EDITOR URL: `https://twuh03-dk.myshopify.com/admin/themes/188070265137/editor?hr=9292`
- DEVELOPMENT THEME NAME: `NED Phase1 Dev Sync`
- DEVELOPMENT THEME ID: `188070265137`

RUNTIME CHECKS COMPLETED (SHOPIFY PREVIEW/LOCAL PROXY):
- Routes responded `200`: `/`, `/pages/cases`, `/pages/info`, `/pages/marketing-materials`, `/pages/retainer-services`, `/pages/protected-projects-1`, `/pages/contact`, `/search`, `/cart`
- Header/mobile drawer:
  - toggle present
  - `aria-expanded` open/close verified
  - Escape close verified
- Assistant:
  - launcher present
  - panel open/close verified
  - Escape close verified
- Cases page:
  - no broken image assets detected in runtime pass
  - script font active
  - no horizontal overflow
- Width checks performed: `1440`, `1024`, `768`, `430`, `390`, `375`, `320`
  - homepage and cases page remained free of horizontal overflow

KNOWN LIMITATIONS/CAVEATS:
- Localhost account routes (`/account`, `/account/login`, `/account/register`) return 404 in local proxy mode; hosted store path redirects through Shopify authentication flow.
- Browser automation hit Shopify admin login when opening Theme Editor URL, so section-reload interactions inside the editor were not fully exercised in this pass.
- Observed console/network noise was primarily Shopify dev tooling and CSP/telemetry behavior, not missing theme assets.
