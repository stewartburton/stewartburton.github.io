# Speaking section - design spec

**Date:** 2026-05-08
**Status:** Approved (awaiting user review of spec, then implementation plan)
**Scope:** Surface the BET Software masterclass talk on stewart-burton.com (rebuilt Astro site)

---

## Goal

Add a "Speaking" credential to the personal site so the BET Software masterclass talk is discoverable to recruiters and visitors. Two placements - home-page card and `/about` subsection - sharing one piece of content.

The talk is third-party-validated technical content directly on-thesis for the site's positioning ("DevOps engineer building the AI layer for engineering teams"). One published, employer-channel talk is closer to a public reference than a portfolio claim, and that's a qualitatively different signal worth surfacing.

---

## The talk (canonical record)

| Field | Value |
|---|---|
| Series | BET Masterclass |
| Episode | 3 |
| Title | System Resilience: Engineering for Reliability |
| YouTube title | BET Masterclass Episode 3 \| System Resilience: Engineering for Reliability |
| Publisher | BET Software (official YouTube channel) |
| Published | February 2026 |
| Duration | ~20 min (19:50) |
| URL | https://youtu.be/s-2zqj-2OOA |
| Thumbnail | `bet-masterclass-ep3-thumbnail.jpg` (1280x720) |

---

## Architectural decisions

### Path B only (Path A moot)
The brief described two paths: A) quick win on the pre-rebuild site, B) full integration in the rebuilt Astro site. The Astro rebuild is live (PRs #11-#13 merged). Path A no longer applies. This spec covers Path B exclusively.

### Two surfaces, one piece of content
Ship the home-page card and the `/about` subsection together. The home-page card is the front-door credential; the `/about` paragraph gives the talk room to breathe inside the personal narrative. Same content, different roles.

### No `/speaking` index, no nav item
A single talk does not justify a `/speaking` index page or a top-level nav entry. Setting that expectation gets backfilled with weak content (other people's talks, podcast cameos). One credential, two placements is the right weight. If a second talk lands, promote both to a proper index then.

### JSON-driven, not inline
Drive both components from `site/src/data/speaking.json` as a single-record array. Adding a second talk later becomes a data change, not a component change. Don't build the multi-talk scaffolding (index page, "see all" link) now - one record is enough today.

### Reuse the live design system, not the brief's hardcoded tokens
The brief was written before the Astro rebuild shipped and hardcodes specific values (`#141414`, `0.5px`, `11px`, `letter-spacing: 0.12em`, etc.). Those values are now centralised in Tailwind utilities and the global stylesheet (`card-elevated`, `font-mono text-mono-label`, `border-hairline border-border-subtle`, `text-card-lead`, `text-card-body`, `text-mono-meta`, etc.). Build against the existing utilities so the new section is visually identical to *Featured work* and *Also building*. The brief's tokens stay as a sanity check, not as the implementation source.

### Static thumbnail, no iframe
Use the locally-hosted thumbnail JPEG and link out to YouTube. No `<iframe>`. Reasons: page weight stays low; no third-party tracking pixel loads on home page; render is independent of YouTube's CDN being reachable; the page still renders if BET ever takes the upload down.

---

## Files to create

### `site/public/assets/bet-masterclass-ep3-thumbnail.jpg`
The 1280x720 thumbnail, copied from the user's Downloads. New `assets/` folder under `site/public/` (does not currently exist).

### `site/src/data/speaking.json`
Single-record array. Schema:

```json
[
  {
    "id": "bet-masterclass-ep3",
    "title": "System Resilience: Engineering for Reliability",
    "series": "BET Masterclass",
    "episode": 3,
    "date": "2026-02",
    "duration": "~20 min",
    "publisher": "BET Software",
    "url": "https://youtu.be/s-2zqj-2OOA",
    "thumbnail": "/assets/bet-masterclass-ep3-thumbnail.jpg",
    "summary": "Practical approaches to designing systems that remain reliable under pressure - incident response, observability, and using AI to manage incidents calmly."
  }
]
```

### `site/src/components/SpeakingCard.astro`
Home-page wide horizontal card. Layout:
- Desktop: `grid md:grid-cols-[minmax(0,40%)_1fr]` with thumbnail left, copy right
- Mobile: stacks - thumbnail full-width on top, copy below
- Built on the existing `card-elevated` utility for parity with the *Featured work* lead card
- Eyebrow: `font-mono text-mono-label uppercase tracking-wider text-accent` reading `bet masterclass · ep 03 · feb 2026`
- Title: `text-card-lead text-text-primary`
- Body: `text-card-body text-text-secondary max-w-prose`
- CTA: `font-mono text-mono-label uppercase tracking-wider text-accent` reading `watch on youtube ↗`
- Whole card is one `<a>` with `target="_blank" rel="noopener noreferrer"` and `aria-label="Watch BET Masterclass Episode 3 on YouTube (opens in new tab)"`
- `<img>` uses `loading="lazy"`, explicit `width="1280" height="720"`, and a thin overlay (`linear-gradient` from `transparent` to `rgba(10,10,10,0.4)`) so the photographic thumbnail recedes into the dark page surface

Props: takes a single `talk` record from the JSON.

### `site/src/components/SpeakingEmbed.astro`
About-page embed. Layout:
- Centered `<a>` wrapping the thumbnail with a play-button SVG overlay (~56px circle, accent teal stroke + fill, semi-transparent bg)
- Caption underneath in `font-mono text-mono-meta uppercase tracking-wide text-text-tertiary`: `BET Masterclass · Episode 3 · February 2026 · ~20 min`
- Same `target="_blank" rel="noopener noreferrer"` and accessible `aria-label`
- Same lazy-loaded image with explicit dimensions

Props: takes a single `talk` record from the JSON.

---

## Files to edit

### `site/src/pages/index.astro`
Insert a new section between the existing *Featured work* section (ends ~line 224) and the existing `section-divider` before *Also building* (~line 226). Resulting section order:

1. Hero
2. What I build (four pillars)
3. Featured work
4. **Speaking** *(new)*
5. Also building
6. About

The new section follows the established pattern:

```astro
<div class="mx-auto max-w-page px-8 section-divider"></div>

<section>
  <div class="mx-auto max-w-page px-8 py-section">
    <SectionLabel label="speaking" />
    <h2 class="mt-4 text-h2 text-text-primary">On record.</h2>
    <p class="mt-3 max-w-prose text-body text-text-secondary">
      Published technical talk on system resilience and the operational philosophy underneath the AI tooling.
    </p>

    <div class="mt-10">
      <SpeakingCard talk={speaking[0]} />
    </div>
  </div>
</section>
```

`speaking` is imported from `../data/speaking.json` in the frontmatter alongside the existing data.

### `site/src/pages/about.astro`
Insert a new `<section>` between *bio* (ends ~line 36) and *philosophy* (~line 40), matching the existing two-column layout (`grid md:grid-cols-[200px_1fr] gap-x-10 gap-y-6`):

```astro
<div class="mx-auto max-w-page px-8 section-divider"></div>

<section>
  <div class="mx-auto max-w-page px-8 py-section grid md:grid-cols-[200px_1fr] gap-x-10 gap-y-6">
    <SectionLabel label="speaking" />
    <div class="max-w-prose body-prose text-body-lead text-text-body">
      <p>
        In early 2026 I delivered a masterclass on system resilience for BET Software's published masterclass series. The talk covered incident response, observability, eliminating single points of failure, and using AI to manage incidents calmly under pressure - the operational philosophy underneath most of the tooling featured on this site.
      </p>
      <div class="mt-8">
        <SpeakingEmbed talk={speaking[0]} />
      </div>
    </div>
  </div>
</section>
```

---

## Copy (locked)

### Home-page section
- SectionLabel: `speaking`
- h2: `On record.`
- Sub-blurb: `Published technical talk on system resilience and the operational philosophy underneath the AI tooling.`

### Home-page card
- Eyebrow: `bet masterclass · ep 03 · feb 2026`
- Title: `System Resilience: Engineering for Reliability`
- Body: `Practical approaches to designing systems that remain reliable under pressure - incident response, observability, and using AI to manage incidents calmly.`
- CTA: `watch on youtube ↗`

### About-page subsection
- SectionLabel: `speaking`
- Paragraph: *(see edit above)*
- Embed caption: `BET Masterclass · Episode 3 · February 2026 · ~20 min`

All copy uses hyphens (`-`), never em dashes (`—`), per house style.

---

## Accessibility

- Both `<a>` wrappers have descriptive `aria-label` text rather than relying on the image alt
- `<img>` `alt` text describes the talk subject, not the visual: `BET Masterclass Episode 3 - System Resilience: Engineering for Reliability`
- Explicit `width` / `height` on `<img>` to prevent layout shift
- `target="_blank"` is paired with `rel="noopener noreferrer"`
- Play-button SVG on the `/about` embed has `aria-hidden="true"` (the parent `<a>` carries the label)
- Heading order: home-page section uses `<h2>On record.</h2>` matching surrounding sections; the card title inside it is `<h3>`. The `/about` page subsection follows the existing pattern (bio / philosophy / availability all use SectionLabel + paragraph body with **no `<h2>`** in the section body) - the new Speaking subsection does the same.

---

## Out of scope

These are explicitly **not** part of this work, even though the brief mentions them:

- `/speaking` index page
- "Speaking" nav item
- YouTube `<iframe>` embed
- Personal MP4 backup of the talk (separate repo / drive concern)
- Transcript file in the repo (future, not now)
- Linking the BET Incident Response Playbook (requires verifying authorship credit; defer)
- A `/work/system-resilience-talk` companion case study page
- Any change to the four pillars / featured work / also-building copy

If a second talk lands later, the followup work is: promote both records to a `/speaking` index, add a nav item, possibly add "latest talk" + "see all" treatment on the home page. The JSON-driven design supports that without rework.

---

## Risk / dependency notes

- **Link rot.** If BET deletes the upload, the link breaks. The page still renders (thumbnail is local). Mitigation: separate task to keep a personal MP4 copy.
- **Title/thumbnail mismatch.** YouTube title is the long form; thumbnail says "Building Resilient Systems." We use the long form for title in copy and let the thumbnail speak for itself. No reconciliation needed.
- **Image weight.** ~200KB JPEG is small but not free; lazy-loaded so it doesn't block initial paint.
- **No iframe = no autoplay/preview.** Acceptable trade for the privacy / weight / reliability win.

---

## Success criteria

- Speaking section visible on home page between *Featured work* and *Also building*, visually consistent with surrounding sections
- `/about` shows a Speaking subsection between *bio* and *philosophy* with the play-button embed
- Both link out to https://youtu.be/s-2zqj-2OOA in a new tab
- No new Lighthouse warnings; CLS unaffected by the new image
- `npm run build` in `site/` produces no errors or warnings related to the new files
