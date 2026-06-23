# Leadership endorsement (AI PR reviews) - design spec

**Date:** 2026-06-23
**Status:** Approved (awaiting user review of spec, then implementation)
**Scope:** Surface verbatim leadership feedback on the AI-powered PR review work across stewart-burton.com

---

## Goal

Make recruiters aware that the AI-powered PR review work earned strong, specific praise from upper
management and the Head of Software Development. The feedback is third-party validation directly
on-thesis for the site's positioning ("DevOps engineer building the AI layer for engineering teams"),
so it is closer to a public reference than a self-authored portfolio claim - a qualitatively different
signal worth surfacing.

Two surfaces, one piece of content:
- **Case study page** (`/work/ai-pr-reviews-azure-devops`) - the full four-quote endorsement, where a
  recruiter is already reading the deepest proof point.
- **Home page** - one distilled pull-quote for reach, linking into the case study.

---

## The feedback (canonical record)

Source: upper management and Head of Software Development (names and companies redacted at the user's
request). Published **verbatim**, with only these faithful corrections:
- OCR/transcription artifacts fixed: `Al` -> `AI`, `OpenAl` -> `OpenAI`.
- One redaction substituted: `saved <Company Redacted> and <Company Redacted> money` -> `saved the
  business money` (user-approved).
- "OpenAI and GitHub Models" stays named (user's explicit call), even though the case-study body keeps
  vendors generic ("LLM API"). This minor internal mismatch is accepted and intentional.

Quotes remain in leadership's third-person voice (correct for a testimonial).

1. "Stewart was the driver of the design, implementation, and scaling of AI-powered PR reviews across
   the organisation, enabling consistent, automated code quality checks across all active repos. When
   we ran into issues with the primary implementation, he introduced a resilient architecture combining
   OpenAI and GitHub Models, ensuring continuous operation even under cost and platform constraints."
2. "Beyond implementation, Stewart elevated the initiative by developing ROI-driven reporting that
   clearly demonstrates business value, including production issues prevented and security risks
   flagged. He has also continuously improved the accuracy and credibility of these insights, ensuring
   leadership can trust the data."
3. "His work has materially improved engineering quality, reduced risk, and ultimately saved the
   business money by preventing potential outages. Stewart's ownership, innovation, and execution make
   him a standout contributor and highly deserving of this recognition."
4. "Stewart has masterfully embraced and implemented new technologies into his day-to-day work. His work
   in particular with regards to AI code reviews have the potential to save large amounts of time when
   implemented at scale and within budget. We look forward to seeing what else he can achieve when
   running point on emerging technologies."

**Attribution string:** `Upper management & Head of Software Development`

**Home-page pull-quote** (verbatim first sentence, trimmed at the comma):
"Stewart was the driver of the design, implementation, and scaling of AI-powered PR reviews across the
organisation."

---

## Architectural decisions

### One data source, keyed by slug
`site/src/data/endorsements.json` mirrors the existing `speaking.json` pattern:

```json
{
  "ai-pr-reviews-azure-devops": {
    "attribution": "Upper management & Head of Software Development",
    "quotes": ["...", "...", "...", "..."],
    "pullQuote": "Stewart was the driver of the design, implementation, and scaling of AI-powered PR reviews across the organisation."
  }
}
```

Both surfaces import from here, so wording cannot drift between them. Generalises to future case
studies for free.

### One component, two variants
`site/src/components/Endorsement.astro`:
- `variant="full"` - `endorsement` mono-label, the four quotes stacked (each with a 0.5px accent
  left-rule), then attribution. Visual language echoes the existing "why this matters" callout
  (`border-accent/30`, accent label) so it reads as proof, not decoration.
- `variant="pull"` - single quote at `body-lead` size, attribution in `mono-meta`, and a "read the case
  study" link.

Props: `quotes: string[]`, `attribution: string`, `variant: 'full' | 'pull'`, `href?: string`
(case-study link for the pull variant), `pullQuote?: string`.

### Placement
- **`work/[...slug].astro`** - after the case-study prose grid, before the "next case study" pager,
  introduced by a `section-divider`. Rendered only when `endorsements[entry.slug]` exists.
- **`index.astro`** - an understated band after the **Featured work** section (which already leads with
  this exact case study) and before **Speaking**, wrapped in the same `section-divider` sibling pattern.

### Scope boundary
Full block on the Azure DevOps flagship only - not duplicated onto the GitHub Copilot case study, to
avoid diluting the same praise across two pages. A short pointer on the Copilot page is a possible
later follow-up, explicitly out of scope here.

---

## Design-system compliance

- Dark + single teal accent (`#5eead4`), 0.5px hairline borders only, no shadows, no gradients.
- Type: Inter body, JetBrains Mono labels; weights 400/500 only.
- Copy uses `-` (hyphen), never `—` (em dash).
- No new design tokens; reuse `card`, `mono-label`, `section-divider`, `border-accent/30`,
  `text-body-lead`, `max-w-prose`, `max-w-page`, `py-section`.

---

## Out of scope / follow-ups

- Endorsement on the GitHub Copilot case study page.
- Syncing this feedback into the resume / one-pager / LinkedIn (positioning-consistency pass) - separate
  task once the site copy is settled.

---

## Success criteria

- Endorsement block renders on `/work/ai-pr-reviews-azure-devops`; pull-quote renders on home page.
- Both pull copy from the same JSON source.
- `npm run build` succeeds (22 pages, unchanged count - no new route, no schema/type errors).
- Visual check in-browser: on-brand, hairline borders, accent label, no layout regressions, mobile and
  desktop.
