# New Era Designs — Website Edit Backlog

> Every edit needs a problem, a reason, and a definition of done.

---

## Priority system

| Priority | Meaning |
|---|---|
| **P0 — Foundation** | Required before the redesign can safely replace the live theme |
| **P1 — Authority** | Makes the studio clearer, more credible, and easier to hire |
| **P2 — Experience** | Deepens the brand world after the foundation works |
| **P3 — Experiment** | Valuable research, but not allowed to delay launch |

---

# P0 — Foundation

## 1. Establish the Shopify-to-GitHub workflow

**Problem**  
It is easy to confuse a GitHub branch, local preview, Shopify theme-editor version, unpublished theme, and the published storefront.

**Why this edit matters**  
Without a defined connection, a safe-looking code change can accidentally overwrite the wrong theme—or never reach Shopify at all.

**Work**

- [ ] Confirm whether `development` is connected to a Shopify theme
- [ ] Confirm whether `main` is connected to a Shopify theme
- [ ] Label connected Shopify themes clearly
- [ ] Keep development connected only to an unpublished or preview theme
- [ ] Record the theme names and branch connections in repository documentation
- [ ] Test two-way sync with one harmless text change

**Done when**  
Anyone can identify which branch controls which Shopify theme without guessing.

---

## 2. Protect the current live baseline

**Problem**  
The live theme is the only fully proven customer-facing version, while the recovered development version contains unfinished systems.

**Why this edit matters**  
A clean redesign is only safe when the stable theme can be restored.

**Work**

- [ ] Keep the untouched live Shopify ZIP offline
- [ ] Keep a clearly named duplicate inside Shopify
- [ ] Do not connect the published theme to an experimental branch
- [ ] Record the current published theme name and date
- [ ] Verify the client-password exposure has been removed from active code

**Done when**  
The live site can be restored without relying on memory or one computer.

---

## 3. Build a clear homepage message

**Problem**  
The studio covers multiple disciplines, so visitors may admire the design without understanding what can be hired.

**Why this edit matters**  
The homepage must convert visual attention into comprehension.

**Work**

- [ ] Write one primary value proposition
- [ ] Name the core discipline cluster: brand, wayfinding, environmental, spatial
- [ ] Add one direct project-start action
- [ ] Add one lower-pressure Selected Work action
- [ ] Keep the first screen readable without waiting for animation
- [ ] Ensure the mobile hero is intentionally composed

**Done when**  
A new visitor can explain what New Era Designs does after ten seconds.

---

## 4. Complete navigation and footer

**Problem**  
An expressive site loses credibility when people cannot orient themselves or find the next page.

**Why this edit matters**  
Navigation is the website’s wayfinding system. It should demonstrate the same clarity the studio sells.

**Work**

- [ ] Limit primary navigation to essential destinations
- [ ] Show the current page state
- [ ] Add visible keyboard focus
- [ ] Test mobile menu opening, closing, and focus behavior
- [ ] Add contact information and core links to the footer
- [ ] Remove dead, duplicate, or legacy commerce links

**Done when**  
Visitors can reach Home, Work, Services, Info, Podcast, and Contact without confusion.

---

## 5. Make the Contact page functional and specific

**Problem**  
“Contact me” does not tell a potential client what information to provide or what kinds of projects are appropriate.

**Why this edit matters**  
A good intake experience reduces vague inquiries and makes the studio feel prepared.

**Work**

- [ ] State the project types currently accepted
- [ ] Ask for company, project type, location, timing, and approximate scope
- [ ] Explain what happens after submission
- [ ] Add a direct email fallback
- [ ] Confirm validation and success states
- [ ] Test spam protection without creating an inaccessible form

**Done when**  
A serious prospect knows what to send and receives clear confirmation.

---

## 6. Complete mobile behavior

**Problem**  
Desktop-first compositions, oversized type, kinetic labels, and decorative motion can overlap or become unreadable on smaller screens.

**Why this edit matters**  
Mobile is not a reduced desktop screenshot. It is a separate composition and likely the first experience many people will have.

**Work**

- [ ] Test every primary page at 390px and 360px
- [ ] Remove horizontal overflow
- [ ] Recompose—not merely shrink—hero typography
- [ ] Simplify decorative elements that compete with content
- [ ] Preserve tap-target size and visible focus
- [ ] Confirm forms and media remain usable

**Done when**  
No major page feels like the desktop layout was forced into a phone.

---

## 7. Pass the technical foundation check

**Problem**  
Broken asset references, empty sections, invalid JSON, console errors, and global overrides can make the theme unpredictable.

**Why this edit matters**  
The codebase must become understandable enough to maintain without another emergency rebuild.

**Work**

- [ ] Run the repository theme validator
- [ ] Run Shopify Theme Check locally
- [ ] Repair missing asset references
- [ ] Remove or archive confirmed empty placeholders
- [ ] Reduce unnecessary global `!important` rules
- [ ] Confirm every JSON template references existing sections
- [ ] Keep feature styles scoped

**Done when**  
Validation passes, the console is clean, and each major feature has an identifiable file map.

---

# P1 — Authority

## 8. Rebuild Selected Work as proof

**Problem**  
Visuals alone do not reveal the strategic and technical thinking behind signage, spatial, and brand work.

**Why this edit matters**  
Clients hire judgment—not only taste.

**Work**

- [ ] Choose three strongest projects first
- [ ] Give each project a clear problem statement
- [ ] Explain constraints and key decisions
- [ ] Show process or technical evidence where useful
- [ ] Describe the outcome honestly
- [ ] Label concept work, speculative work, and completed client work accurately

**Done when**  
Each case answers: what was wrong, what was decided, and why the work matters.

---

## 9. Clarify Services around client problems

**Problem**  
A deliverables list can sound interchangeable with any designer’s menu.

**Why this edit matters**  
Services become more valuable when visitors understand what business or spatial problem they resolve.

**Work**

- [ ] Group services into a small number of systems
- [ ] Explain the problem each system solves
- [ ] Show likely deliverables without promising every deliverable every time
- [ ] State who the service is for
- [ ] Connect services to relevant cases
- [ ] Add a clear inquiry action

**Suggested structure**

1. Brand and visual identity systems
2. Wayfinding and signage systems
3. Environmental and spatial graphics
4. Digital experiences and communication tools

**Done when**  
A visitor can identify the most relevant service without decoding industry language.

---

## 10. Build the Info / About page around perspective

**Problem**  
A résumé-style biography does not fully explain why Christopher’s combination of design, production, psychology, and storytelling matters.

**Why this edit matters**  
The About page should turn personality into professional context.

**Work**

- [ ] Explain the studio perspective in direct language
- [ ] Connect personal history to design practice without oversharing
- [ ] State the disciplines and environments Christopher understands
- [ ] Show process values and working style
- [ ] Include a concise biography for press or collaborators
- [ ] Add a direct next step

**Done when**  
The page feels human, distinct, and professionally useful—not like generic founder copy.

---

## 11. Establish a visible process

**Problem**  
Potential clients may assume creative work appears through inspiration rather than a controlled process.

**Why this edit matters**  
A visible process lowers perceived risk and proves the studio can move from conversation to delivery.

**Work**

- [ ] Define the process in three to five stages
- [ ] Explain client participation at each stage
- [ ] Show how research becomes decisions
- [ ] Include review and approval points
- [ ] Explain production or implementation awareness

**Done when**  
The process feels disciplined without pretending every project is identical.

---

## 12. Add foundational SEO and social metadata

**Problem**  
Search engines and shared links cannot understand the studio from visual design alone.

**Why this edit matters**  
Clear page titles, descriptions, headings, internal links, and image text help both humans and search systems interpret the site.

**Work**

- [ ] Write a unique title for every major page
- [ ] Write a useful description for every major page
- [ ] Use one clear H1 per page
- [ ] Add descriptive image alternative text
- [ ] Improve internal links between services and cases
- [ ] Confirm canonical URLs
- [ ] Add useful Open Graph images
- [ ] Review structured data only after page content is stable

**Done when**  
Search snippets accurately describe each page and shared links look intentional.

---

## 13. Improve accessibility

**Problem**  
Heavy motion, low contrast, custom controls, unusual typography, and nonstandard navigation can exclude visitors.

**Why this edit matters**  
Accessibility is both an ethical baseline and evidence of serious design practice.

**Work**

- [ ] Maintain logical heading order
- [ ] Meet reasonable contrast targets
- [ ] Add visible keyboard focus
- [ ] Respect `prefers-reduced-motion`
- [ ] Do not hide essential content behind hover
- [ ] Add labels and status messages to forms
- [ ] Confirm zoom and text resizing do not break layouts

**Done when**  
The core site can be understood and operated without a mouse or animation.

---

## 14. Improve performance

**Problem**  
Large images, duplicated scripts, custom fonts, GIFs, and continuous animations can make the site slow and unstable.

**Why this edit matters**  
Luxury pacing is intentional. Slow loading is not.

**Work**

- [ ] Convert and resize oversized imagery
- [ ] Remove duplicate or unused assets
- [ ] Limit custom font files and weights
- [ ] Defer noncritical scripts
- [ ] Stop offscreen animation work
- [ ] Avoid autoplay media that competes with page loading
- [ ] Test on a throttled mobile connection

**Done when**  
The first meaningful content appears promptly and interactions remain smooth on ordinary hardware.

---

# P2 — Experience

## 15. Refine the editorial homepage system

**Problem**  
The recovered editorial homepage has strong ideas but too many systems were introduced at once.

**Why this edit matters**  
The new homepage should feel authored and alive without becoming a demonstration of every available effect.

**Work**

- [ ] Choose one dominant motion language
- [ ] Reduce competing kinetic labels and decorative icons
- [ ] Preserve clear reading order
- [ ] Connect each section to a real destination
- [ ] Keep Shopify settings manageable
- [ ] Add reduced-motion and mobile alternatives

**Done when**  
The page feels like one art-directed experience rather than several prototypes stacked together.

---

## 16. Develop the Podcast page as authority

**Problem**  
The podcast can become disconnected from the studio if it is treated only as an embedded audio player.

**Why this edit matters**  
The podcast demonstrates voice, analysis, cultural perspective, and long-form thinking.

**Work**

- [ ] Explain the show’s premise
- [ ] Give every episode a title, summary, and topic structure
- [ ] Provide platform links
- [ ] Add accessible transcripts or structured notes when possible
- [ ] Link relevant episodes to cases and essays
- [ ] Keep the player lightweight

**Done when**  
The podcast strengthens the studio’s authority instead of feeling like a separate hobby page.

---

## 17. Create a coherent motion system

**Problem**  
Individual animations can use different speeds, easings, directions, and interaction rules.

**Why this edit matters**  
Motion should behave like a design system, not a collection of unrelated effects.

**Work**

- [ ] Define motion durations
- [ ] Define easing curves
- [ ] Define entrance, hover, drag, and ambient behaviors
- [ ] Set limits for continuous movement
- [ ] Document reduced-motion behavior
- [ ] Create reusable motion utilities

**Done when**  
New motion can be added by choosing from a known vocabulary rather than inventing behavior each time.

---

## 18. Build a secure client experience

**Problem**  
The previous client-files page used a password visible in public JavaScript.

**Why this edit matters**  
Client files, feedback, and deliverables require real access control—not visual theater.

**Work**

- [ ] Choose authenticated Shopify customer access or a secure external portal
- [ ] Remove private project data from theme code
- [ ] Use expiring or controlled delivery links where appropriate
- [ ] Define file naming and version rules
- [ ] Add clear support and access-recovery language

**Done when**  
A visitor cannot obtain protected files by reading page source or changing a browser cookie.

---

# P3 — Experiment

## 19. Reintroduce Aether / Pegasus carefully

**Problem**  
The assistant is visually memorable, but the recovered implementation mixed mascot motion, chatbot UI, content routing, and unfinished integrations.

**Why this edit matters**  
Aether can become a signature guide through the studio if it genuinely helps visitors.

**Work**

- [ ] Define its one primary purpose
- [ ] Start with curated navigation and FAQs
- [ ] Make the assistant optional and dismissible
- [ ] Keep it from covering content
- [ ] Do not claim live AI capabilities that are not connected
- [ ] Test performance and mobile behavior

**Done when**  
Aether improves orientation or discovery instead of operating as a floating distraction.

---

## 20. Explore historical and cultural references

**Problem**  
Greek/classical imagery, African American history, Japanese fashion references, silk, swordsmen, and high-society codes can become shallow collage when they are not connected to the studio’s meaning.

**Why this edit matters**  
The website should use reference with intention, context, and specificity.

**Work**

- [ ] Identify the exact historical idea behind each reference
- [ ] Avoid using cultures as generic luxury texture
- [ ] Connect visual references to written reasoning
- [ ] Use original or properly licensed imagery
- [ ] Keep references subordinate to project comprehension

**Done when**  
The references feel authored, researched, and connected to the brand—not borrowed for atmosphere alone.

---

# Current recommended build order

```text
01  GitHub ↔ Shopify connection map
02  Protect live baseline
03  Homepage clarity
04  Navigation + footer
05  Selected Work
06  Services
07  Contact
08  Mobile pass
09  Accessibility + performance
10  SEO foundation
11  Info / About
12  Podcast
13  Motion system
14  Secure client experience
15  Aether and advanced experiments
```

---

## Definition of a finished task

A task is not finished because the desktop screenshot looks good.

It is finished when:

- [ ] The problem has been resolved
- [ ] The content is understandable
- [ ] Desktop and mobile work
- [ ] Keyboard and reduced-motion behavior work
- [ ] Shopify editor behavior works
- [ ] The browser console is clean
- [ ] The relevant files are documented
- [ ] The change is committed with a useful message
- [ ] The change can be reversed
