# Adaptive briefing

Use when material design decisions remain open. Read what the user already supplied: subject, audience, page job, action, content, viewport/count, existing brand, media, selected components and explicit likes/dislikes.

## Compact intake

Ask no more than three short adaptive questions in one batch when practical. Reuse supplied answers; the checkpoint is coverage, not a repeated form:

- **Purpose and voice:** what should the visitor understand/do, and how should the brand speak if finished copy is absent? Offer understandable examples such as warm/conversational, restrained/expert or playful; accept the user's own description. If purpose is known, ask only voice.
- **Visual preferences:** offer a compact choice covering colors to use/avoid, straight versus rounded controls, and restrained versus patterned/illustrated graphics. For example: “Any colors to use or avoid? Straight or rounded buttons; quiet background or more pattern/illustration? I can propose these if you have no preference.” Record disliked icon/decorative treatments when supplied. No hex codes or exhaustive checklist required.
- **Exploration options:** offer Quick / Thorough and recommend visual-reference research with a concrete benefit. For example: “I recommend looking at different website compositions first, so we can choose a stronger focal point and reading flow. Include that research, or continue without it?” Keep the mode choice brief when it is also unresolved. Research is opt-in in either mode, not automatic or bundled into choosing Thorough. Do not guarantee a better design merely because a search was performed.

When missing assets are essential, address their source in the relevant question rather than adding a fourth round. If three questions cannot cover everything, prioritize decisions that change the result and state noncritical assumptions. Do not repeatedly reopen intake. Existing approved copy/brand decisions take priority.

Resolve the code target once using [implementation-targets.md](implementation-targets.md). If it is neither specified nor detectable in a supplied project, offer HTML/CSS/JavaScript, React, Next.js (React), or help choosing. Fold this into the initial batch when there is room; otherwise ask at the selected-direction checkpoint before coding. Do not skip the palette/control-shape question to make room, treat HTML and CSS as alternatives, or silently select Next.js for a user who requested React. Reuse known technical decisions instead of repeating the question.

Reuse any selected UI library, requested label-plus-icon treatment, rejected punctuation and desired content density in the brief. If “marks/logos on buttons” is ambiguous, clarify whether the user means action icons, brand marks or component styling; these are different requests. Resolve this within the existing preference question or a focused feedback clarification, not a new mandatory questionnaire. A rejected arrow is not a rejection of every meaningful icon.

Before generating a visual, record how colors, control shape and graphic richness were handled: supplied, answered, explicitly delegated/skipped, or offered but unanswered. If any is absent and no explicit skip applies, ask the one grouped preference question. “Start”, “be creative”, or delegation of a name/general concept is not a palette-and-controls answer. If a user explicitly says “no questions” or delegates those specific choices, proceed with a short proposed system. An unanswered optional question permits stated provisional choices, never invented consent. Research consent remains separate.

## Open choices and approval

State expressive as the default design ambition, not as an answer the user supplied. Explicit restrained styling or an existing brand overrides it. Graphic richness remains a separate preference: an expressive typographic composition can be image-free and quiet. Do not add another intake question solely to reconfirm this default.

“Choose for me” in response to the preference offer allows a proposed visual system and tone. A general “propose the design” request still receives the compact preference offer unless it explicitly skips questions or delegates colors/control shape. State proposed choices briefly, then show a sketch when direction approval is still needed. Do not demand an existing brand book. An unanswered research offer means no inspiration search. If mode remains open, state Quick as your assumption, not the user's choice.

If the user explicitly delegates approval or requests noninteractive final output, record `approval_status: delegated` and proceed with stated assumptions. Otherwise offer the visual composition choices defined in [visual-development.md](visual-development.md), then wait for the user's choice before detailing. A request for one final reference alone does not delegate composition selection. “Start working” on its own does not mean the unseen design is approved.

For research consent, read [visual-development.md](visual-development.md). Operational documentation or necessary factual verification is distinct from optional design-inspiration research; follow applicable tool rules and do not use that distinction to collect design references without consent.

## Internal brief

After composition selection, use one compact checkpoint to agree on proposed content, compare calmer/richer density, and show the connected-library button shortlist. These are visual decisions, not a restart of intake. Reuse explicit prior approvals; record the boundaries of delegation separately for each choice.

Keep this compact; open fields are allowed, invented facts are not:

```yaml
subject: ""
audience: ""
page_job: ""
primary_action: ""
action_map: "navigation and primary/secondary destinations | explicitly single-action"
supporting_information: "supplied facts that help a visitor choose | gaps to clarify"
content_approval: "proposed content/action map | approved with evidence | delegated"
must_show: []
must_not_invent: []
brand_status: "existing | proposed"
brand_voice: "supplied | proposed voice description | unresolved"
copy_status: "supplied | concept copy"
palette: "open | light | dark | mixed | specified"
color_preferences: []
color_avoid: []
geometry: "open | sharp | restrained | rounded | capsule"
graphic_richness: "open | restrained | patterned | illustrated | mixed"
design_ambition: "expressive by default | supplied override"
preference_checkpoint:
  colors: "supplied | answered | explicitly-delegated | offered-unanswered"
  control_shape: "supplied | answered | explicitly-delegated | offered-unanswered"
  graphic_richness: "supplied | answered | explicitly-delegated | offered-unanswered"
preference_evidence: "actual answer, explicit skip, or offered question; no fabricated response"
visual_likes: []
visual_avoid: []
copy_avoid: []
component_source: "none selected | existing project library | user-selected library"
button_treatment: "text-only | label-plus-icon | supplied component treatment | proposed"
component_shortlist: "no library selected | 2–3 inspected visual candidates and recommendation | unavailable"
component_choice: "pending | approved variant | delegated selection"
display_punctuation: "new proposal without ornamental final dots | supplied brand/copy | explicit preference"
media_strategy: "provided | generated-kit | image-free | mixed | open"
media_sources: []
research: "off | offered | opted-in"
mode: "quick | thorough | unresolved"
approval_status: "awaiting-sketch | awaiting-approval | approved | delegated"
composition_choice: "unresolved | selected concept ID | explicitly delegated"
density_choice: "pending calmer/richer visual pair | approved density with evidence | delegated"
composition_sketch_count: "normally 2–3 for one final reference; respect explicit limits"
graphic_treatments: "proposed options and research basis | selected treatment | open"
approved_scope: ""
implementation_target: "unresolved | html-css-js | react | nextjs | existing-other"
target_basis: "supplied | detected in project | user-selected | recommendation | provisional"
target_evidence: "actual request, inspected project setup, or stated recommendation"
project_setup: "existing router/language/package manager/style system | proposed new setup"
viewport: "width x height and device scale"
direction_count: "final-reference count; separate from exploratory sketch count"
```

Record the real approval/delegation message and what it covered. For multiple directions track approval per concept or the approved set; selecting one does not authorize silently replacing the rest with its variants.
