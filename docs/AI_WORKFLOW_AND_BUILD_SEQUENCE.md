# New Era Designs — AI Workflow and Website Build Sequence

This is the shared execution plan for Christopher, GitHub Copilot, ChatGPT, Gemini, DeepSeek, and any future assistant working on the website.

The goal is not to have four AIs independently redesign the same page. Each tool should have a clear job, use the same repository rules, and hand work to the next stage without creating duplicate systems.

---

## The central decision

### Design the AI assistant early. Build it after the core content is stable.

The assistant needs to understand:

- Who New Era Designs is
- What services are actually offered
- Which projects are public
- What Christopher wants potential clients, employers, and collaborators to know
- What questions should be answered directly
- What questions require a human response
- What information is private or uncertain

Building the chatbot before the website has clear services, cases, contact language, and voice would produce an attractive interface with an unreliable brain.

The correct sequence is:

```text
assistant purpose and boundaries
        ↓
site architecture and human-written source content
        ↓
layout and page system
        ↓
core pages and case studies
        ↓
assistant knowledge base
        ↓
assistant interface and integration
        ↓
polish, testing, SEO, and release
```

---

# Recommended 12-step build order

## 1. Protect the development environment

**Problem being solved:** Experimental work can now synchronize to the connected Shopify preview theme.

**Work:**

- Confirm the connected Shopify theme is unpublished.
- Keep `main` stable.
- Start each substantial task from `development` on a `feature/...` branch.
- Run the repository validator before merging.
- Never place credentials or private client content in the theme.

**Command check:**

```bash
git status
git branch --show-current
git pull origin development
node scripts/validate-theme.mjs
```

**Definition of done:** The branch is correct, the working tree is understood, and validation passes before design work begins.

---

## 2. Define the AI assistant before coding it

**Problem being solved:** A chatbot without a defined job becomes a generic novelty, gives uncertain answers, or speaks for Christopher incorrectly.

**Decide:**

- Name and visual identity
- Intended visitors
- The five to ten questions it should answer best
- Topics it must decline or redirect
- Whether it is a site guide, studio representative, inquiry assistant, or all three
- Where its answers come from
- How a visitor reaches Christopher
- Whether conversations are stored
- What analytics or consent are required

**Recommended first purpose:**

> Help visitors understand New Era Designs, navigate relevant work and services, and prepare a better project inquiry without pretending to replace Christopher.

**Do not code yet:** Create the assistant brief and answer library first.

**Definition of done:** A one-page assistant brief and an approved list of safe answers exist.

---

## 3. Audit the existing page structure

**Problem being solved:** Previous development mixed finished features, unfinished experiments, duplicate sections, and unclear file relationships.

**Work:**

- Identify every public page and template.
- Map each template to its sections, snippets, CSS, and JavaScript.
- Label each page: keep, revise, rebuild, archive, or remove later.
- Identify unfinished placeholders without deleting them yet.
- Record broken links and missing assets.

**Repository tools:**

```bash
node scripts/validate-theme.mjs
rg '"type":' templates sections
rg "render|section" layout sections snippets templates
rg "asset_url" layout sections snippets templates
```

**Definition of done:** Every major page has an owner, purpose, and known file map.

---

## 4. Establish the global visual system

**Problem being solved:** Pages can look individually interesting but still feel like different websites.

**Build before page decoration:**

- Typography scale
- Content widths
- Spacing rhythm
- Color roles
- Borders, dividers, and surfaces
- Buttons and links
- Image behavior
- Focus states
- Motion principles
- Mobile rules

**Brand direction:**

- Sharp but imperfect
- Luxurious without being cold
- Historical and modern
- Masculine and feminine
- Serious but strange enough to feel alive
- Editorial, intentional, accessible, and fabrication-aware

**Definition of done:** A small set of reusable styles can build multiple pages without copying entire stylesheets.

---

## 5. Write the human source copy

**Problem being solved:** Beautiful layouts cannot clarify vague services, generic claims, or AI-sounding language.

**Draft in Christopher’s natural voice first:**

- One-sentence studio definition
- Homepage introduction
- Service descriptions
- About statement
- Contact invitation
- Case-study summaries
- Honest descriptions of project status
- Podcast description
- Assistant answer library

**Human-touch editing test:**

- Does this sound like Christopher would actually say it?
- Is there one specific observation instead of three vague adjectives?
- Does the copy explain what changed, why it mattered, or how the work was made?
- Is the language confident without pretending every project was a global campaign?
- Could a visitor understand the service without design jargon?

**Definition of done:** Core copy is approved as plain text before being fitted into layouts.

---

## 6. Build the minimum complete site layout

**Problem being solved:** Motion and special effects can consume the project before the site becomes useful.

**Priority pages:**

1. Home
2. Selected Work / Cases
3. Services
4. Info / About
5. Contact

**Minimum launch standard:**

- Clear navigation
- One meaningful H1 per page
- Strong page opening
- Readable body text
- Real calls to action
- Responsive layout
- Shopify editor controls
- No broken links or missing imagery

**Definition of done:** A visitor can understand the studio, review work, identify services, and make contact without needing the chatbot.

---

## 7. Bring every secondary page into the same brand system

**Problem being solved:** Podcast, client access, marketing materials, retainers, and experimental pages can feel disconnected from the core website.

**Review each page for:**

- Shared header and footer behavior
- Typography and spacing
- Button language
- Color roles
- Image treatment
- Mobile behavior
- Page purpose
- Public versus private content
- Whether the page still needs to exist

**Rule:** Reuse the global system; do not create a new mini-brand for every page.

**Definition of done:** Secondary pages feel related without becoming identical.

---

## 8. Complete the case-study system

**Problem being solved:** Visitors need proof of thinking and production knowledge, not only attractive images.

**Every complete case should include:**

- Project and location when public
- Original problem
- Constraints
- Design response
- Technical or production decisions
- Outcome or honest project status
- Relevant services
- Next action

**Priority cases:**

- The Rice Box
- The Burger Joint
- Jimmy John’s
- Houstonian Hotel concept

**Definition of done:** At least three strong cases show different capabilities and contain enough substance to support search, outreach, and chatbot answers.

---

## 9. Build the assistant knowledge layer

**Problem being solved:** The assistant must answer from approved information rather than improvising the studio’s policies or experience.

**Create structured content for:**

- Studio overview
- Services
- Process
- Project types
- Case summaries
- Contact and inquiry guidance
- Geographic availability
- Common questions
- Topics requiring human review
- Privacy and limitation language

**Answer rules:**

- Cite or link the relevant site page when possible.
- Say when information is unknown.
- Never invent pricing, timelines, availability, credentials, client permission, or project outcomes.
- Never expose client files or private project information.
- Route qualified inquiries to the contact process.

**Definition of done:** Approved test questions produce consistent answers before the interface is styled.

---

## 10. Build the assistant interface in isolation

**Problem being solved:** Chatbot code can interfere with storefront performance, accessibility, editor behavior, and mobile navigation.

**Build one contained feature:**

- One launcher
- One dialog or panel
- Keyboard focus management
- Close and escape behavior
- Mobile-safe dimensions
- Reduced-motion support
- Loading, error, and unavailable states
- Human handoff
- No secret keys in browser code

**Architecture rule:**

```text
Liquid/HTML = accessible structure and editable labels
CSS = appearance and responsive states
JavaScript = interaction and progressive enhancement
Server/API = credentials, model calls, private logic, and rate limits
```

**Definition of done:** The assistant works as an optional enhancement and the website remains fully usable when it is unavailable.

---

## 11. Add purposeful motion and final visual polish

**Problem being solved:** Static pages may not fully express the brand, but uncontrolled animation can reduce clarity and performance.

**Add motion only where it supports:**

- Hierarchy
- Page transitions
- Revealing relationships
- Navigation feedback
- Story progression
- Brand atmosphere without blocking content

**Required behavior:**

- Respect `prefers-reduced-motion`
- Avoid endless background processing
- Prefer opacity and transform
- Test low-width mobile screens
- Do not hide important content until JavaScript runs

**Definition of done:** Motion makes the experience clearer or more memorable and can be removed without breaking the page.

---

## 12. Validate, humanize, and release deliberately

**Problem being solved:** A technically valid theme can still contain awkward copy, confusing hierarchy, inaccessible interaction, or unfinished pages.

**Run:**

```bash
node scripts/validate-theme.mjs
```

**Review manually:**

- Desktop
- Tablet
- Narrow mobile
- Shopify Theme Editor
- Keyboard only
- Reduced motion
- Link destinations
- Forms
- Image alternative text
- Social preview
- Page titles and descriptions
- Loading performance
- Copy read aloud

**Release path:**

```text
feature branch
      ↓
development
      ↓
connected unpublished Shopify preview
      ↓
human review
      ↓
main
      ↓
intentional Shopify publish
```

**Definition of done:** Core pages are complete and useful. Minor animation experiments do not delay launch.

---

# Which AI should do what?

These are workflow assignments, not claims that one model is always objectively better. Every assistant must work from the same files, and all code must be reviewed and validated.

## GitHub Copilot — repository execution

Best used for:

- Reading and editing files inside the repository
- Creating feature branches and commits
- Following `.github/copilot-instructions.md`
- Applying path-specific Liquid, CSS, and JavaScript rules
- Repetitive refactors
- Running local commands and tests
- Implementing a tightly scoped task after the design and acceptance criteria are clear

Do not give Copilot four unrelated page redesigns in one session. Give it one feature with a definition of done.

### Copilot task script

```text
Read .github/copilot-instructions.md, AGENTS.md, docs/CODE_COMMENT_STANDARD.md,
and the relevant strategy document before editing.

Task: [ONE PAGE OR FEATURE]
Problem to solve: [SPECIFIC PROBLEM]
Expected visitor result: [WHAT SHOULD BECOME CLEARER OR EASIER]
Files likely involved: [KNOWN FILES]
Must preserve: Shopify Theme Editor controls, mobile behavior, accessibility,
and the development preview connection.

Work on a feature/... branch. Keep Liquid structure, CSS, and JavaScript separate.
Add useful PURPOSE / USED BY / EDIT SAFELY comments where reasoning must remain with the code.
Run node scripts/validate-theme.mjs and report exactly what changed, why, and what still needs visual review.
```

---

## ChatGPT — strategy, architecture, repository review, and human language

Best used for:

- Deciding what the website or feature should accomplish
- Mapping Shopify files and dependencies
- Reviewing GitHub changes and recovering versions
- Writing or refining site copy in Christopher’s voice
- Turning raw ideas into structured briefs and acceptance criteria
- Security and workflow review
- Comparing versions and checking whether AI work actually solved the problem
- Coordinating the other tools so their work does not conflict

ChatGPT can read connected GitHub repositories and reason across code, README files, and documentation when access is connected. Use it before implementation for architecture and after implementation for review.

### ChatGPT task script

```text
Review the relevant repository files and strategy documents before proposing changes.
Help me define the visitor problem, information hierarchy, human copy, and acceptance criteria
for [PAGE OR FEATURE]. Do not begin with animation. Separate required content, Shopify structure,
CSS direction, JavaScript behavior, accessibility, and testing. Preserve my voice: direct,
design-literate, emotionally alive, specific, and not corporate filler.
```

---

## Gemini — visual analysis, multimodal comparison, and broad second opinion

Best used for:

- Reviewing screenshots, visual references, and page comparisons
- Identifying visual inconsistency across multiple screens
- Exploring layout alternatives
- Checking whether text and imagery communicate the same idea
- Producing a second implementation approach before code is committed
- Large-context visual or document review when many references need to be considered together

Gemini’s official tools support multimodal inputs and code execution, but its code execution environment runs Python; code generated in other languages still needs to be tested in the real repository.

### Gemini task script

```text
Use these screenshots and the supplied brand/document context to compare the current page against
the intended New Era Designs experience. Identify hierarchy, spacing, typography, contrast,
mobile, and visual-storytelling problems. Give three ranked changes. Do not write production code yet.
Explain what each change solves and what should remain consistent with the other pages.
```

---

## DeepSeek — isolated code alternatives and economical technical exploration

Best used for:

- Generating an alternate function or component approach
- Explaining unfamiliar code
- Exploring a narrow JavaScript, Liquid, or CSS problem
- Producing test cases or edge cases
- Reviewing algorithmic or technical logic separately from brand strategy
- Cost-conscious experimentation before handing the selected approach to the repository tool

DeepSeek should not be the only reviewer for security, publishing, client privacy, or Shopify architecture. Its output must be checked against the repository and actual Shopify behavior.

### DeepSeek task script

```text
Read the pasted AGENTS.md rules and analyze only this isolated code problem:
[PASTE PROBLEM AND RELEVANT FILE EXCERPT].
Give two implementations with tradeoffs, browser/Shopify risks, and test cases.
Do not invent missing repository context. Do not include credentials or deployment instructions.
```

---

# Recommended handoff pattern

Use the tools in this order for substantial work:

```text
1. ChatGPT — define problem, content, architecture, and acceptance criteria
2. Gemini — review visual direction or compare screenshots when useful
3. DeepSeek — explore a narrow alternate technical solution when useful
4. GitHub Copilot — implement the approved scoped task in the repository
5. GitHub Actions — validate automatically
6. ChatGPT + Christopher — review diff, preview, copy, and whether the problem was actually solved
```

Not every task needs all four tools. A simple text correction should not become a six-agent process.

---

# Human approval points

Christopher makes the final decision on:

- Brand voice
- Which work becomes public
- Claims about experience or project outcomes
- Services and pricing
- Visual taste
- Whether an experimental feature belongs on the site
- Publishing the Shopify theme

AI can draft, compare, implement, and test. It should not silently decide what New Era Designs is.
