# Speaking Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Speaking" credential to the rebuilt Astro site - a home-page card and an `/about` subsection - that surfaces the BET Software masterclass talk *System Resilience: Engineering for Reliability* (BET Masterclass Episode 3).

**Architecture:** Two new Astro components driven by a single-record `speaking.json` data file. `SpeakingCard.astro` renders the home-page wide horizontal card (between *Featured work* and *Also building*); `SpeakingEmbed.astro` renders the `/about`-page centered thumbnail with a play-button overlay (between *bio* and *philosophy*). Both link out to YouTube via a static, locally-hosted thumbnail - no iframe, no third-party tracking on page load.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS 3 (existing design tokens in `tailwind.config.mjs`).

**Verification approach:** This codebase has no test framework (no vitest/jest in `site/package.json`, zero `*.test.*` files). Verification = `astro check` (type check), `astro build` (build success), and manual visual check via `astro dev`. Per-task commits.

---

## Spec

The full spec is at `docs/superpowers/specs/2026-05-08-speaking-section-design.md`. Read it before starting.

---

## File Structure

**New files:**
- `site/public/assets/bet-masterclass-ep3-thumbnail.jpg` - the 1280x720 talk thumbnail (copied from `c:\Users\stewa\Downloads\bet-masterclass-ep3-thumbnail.jpg`)
- `site/src/data/speaking.json` - single-record array, future-proofs a multi-talk index without building one
- `site/src/components/SpeakingCard.astro` - home-page wide horizontal card
- `site/src/components/SpeakingEmbed.astro` - `/about`-page centered embed with play-button overlay

**Edited files:**
- `site/src/pages/index.astro` - import `speaking.json` + `SpeakingCard`, render new section between *Featured work* (ends ~L224) and *Also building* (starts ~L228)
- `site/src/pages/about.astro` - import `speaking.json` + `SpeakingEmbed`, render new subsection between *bio* (ends ~L36) and *philosophy* (starts ~L40)

**Decomposition rationale:** Two components instead of one with a `variant` prop because the two layouts are visually distinct (wide horizontal card vs centered embed with play button) and combining them would fork into two large branches inside a single template. Two focused components are easier to read and modify.

---

## Task 1: Foundation - asset and data file

**Files:**
- Create: `site/public/assets/bet-masterclass-ep3-thumbnail.jpg`
- Create: `site/src/data/speaking.json`

- [ ] **Step 1: Verify the source thumbnail exists and check size**

Run from PowerShell:

```powershell
Get-Item "c:\Users\stewa\Downloads\bet-masterclass-ep3-thumbnail.jpg" | Select-Object Name, Length, LastWriteTime
```

Expected: file exists, length probably 100-300 KB. If significantly larger (>500 KB), stop and ask the user whether to compress before committing - we don't want a multi-MB image on the home page.

- [ ] **Step 2: Create the assets directory and copy the thumbnail**

Run from PowerShell (project root):

```powershell
New-Item -ItemType Directory -Force -Path "site\public\assets" | Out-Null
Copy-Item "c:\Users\stewa\Downloads\bet-masterclass-ep3-thumbnail.jpg" "site\public\assets\bet-masterclass-ep3-thumbnail.jpg"
Get-Item "site\public\assets\bet-masterclass-ep3-thumbnail.jpg" | Select-Object Name, Length
```

Expected: file present in `site/public/assets/`, same size as source.

- [ ] **Step 3: Create `site/src/data/speaking.json`**

Write the file with these exact contents:

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

Notes:
- Hyphens (`-`) only, never em dashes (`—`).
- The `thumbnail` path is the public URL (`/assets/...`), not the filesystem path.
- The array (not a single object) is intentional - a future second talk just appends.

- [ ] **Step 4: Validate the JSON parses**

Run from PowerShell:

```powershell
Get-Content site\src\data\speaking.json -Raw | ConvertFrom-Json | Format-List
```

Expected: parses cleanly, prints the record fields. If it errors, fix the JSON before continuing.

- [ ] **Step 5: Commit foundation**

Run from PowerShell:

```powershell
git add site/public/assets/bet-masterclass-ep3-thumbnail.jpg site/src/data/speaking.json
git commit -m @'
feat(speaking): add talk thumbnail and speaking data file

Lays the foundation for the Speaking section: the BET masterclass
episode 3 thumbnail under public/assets/, and a single-record
speaking.json that the upcoming SpeakingCard and SpeakingEmbed
components will consume.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
'@
```

Expected: clean commit, two files added.

---

## Task 2: SpeakingCard component + home-page integration

**Files:**
- Create: `site/src/components/SpeakingCard.astro`
- Modify: `site/src/pages/index.astro` (insert section after the divider following *Featured work*, before *Also building*)

- [ ] **Step 1: Create `site/src/components/SpeakingCard.astro`**

Write the file with these exact contents:

```astro
---
interface Talk {
  id: string;
  title: string;
  series: string;
  episode: number;
  date: string;
  duration: string;
  publisher: string;
  url: string;
  thumbnail: string;
  summary: string;
}

interface Props {
  talk: Talk;
}

const { talk } = Astro.props;

const episodeLabel = String(talk.episode).padStart(2, '0');

const monthShort = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const [year, month] = talk.date.split('-');
const dateLabel = `${monthShort[Number(month) - 1]} ${year}`;

const eyebrow = `${talk.series.toLowerCase()} · ep ${episodeLabel} · ${dateLabel}`;
const altText = `${talk.series} Episode ${talk.episode} - ${talk.title}`;
const linkLabel = `Watch ${talk.series} Episode ${talk.episode} on YouTube (opens in new tab)`;
---

<a
  href={talk.url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={linkLabel}
  class="card-elevated p-8 group grid md:grid-cols-[minmax(0,40%)_1fr] gap-x-10 gap-y-6 items-center transition-colors hover:border-border"
>
  <div class="relative overflow-hidden rounded-chip">
    <img
      src={talk.thumbnail}
      alt={altText}
      width="1280"
      height="720"
      loading="lazy"
      class="w-full h-auto block"
    />
    <span
      aria-hidden="true"
      class="absolute inset-0 pointer-events-none"
      style="background: linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.4) 100%);"
    ></span>
  </div>

  <div>
    <span class="font-mono text-mono-label uppercase tracking-wider text-accent">{eyebrow}</span>
    <h3 class="mt-4 text-card-lead text-text-primary">{talk.title}</h3>
    <p class="mt-3 text-card-body text-text-secondary max-w-prose">{talk.summary}</p>
    <span class="inline-flex items-center gap-2 mt-6 font-mono text-mono-label uppercase tracking-wider text-text-primary group-hover:text-accent transition-colors">
      watch on youtube <span class="text-accent" aria-hidden="true">↗</span>
    </span>
  </div>
</a>
```

Why each piece:
- The `Talk` interface mirrors the JSON record exactly so type errors surface at build time if the JSON drifts.
- `card-elevated`, `text-card-lead`, `text-card-body`, `font-mono text-mono-label uppercase tracking-wider text-accent` are existing utilities defined in `tailwind.config.mjs` and `site/src/styles/global.css`. Same classes used by the *Featured work* lead card in `index.astro`.
- `padStart(2, '0')` makes "ep 03" instead of "ep 3" - matches the brief's eyebrow format.
- `loading="lazy"` + explicit `width`/`height` prevents CLS without blocking initial paint.
- The dark-gradient overlay (semantic `<span>` with inline gradient) blends the photographic thumbnail into the dark page surface so it doesn't look like a transplanted blog block.
- Whole card is one `<a>` so the entire card is the click target. `aria-label` carries the descriptive text since the anchor wraps both image and copy.

- [ ] **Step 2: Edit `site/src/pages/index.astro` - import the data and component**

Open `site/src/pages/index.astro`. In the frontmatter section at the top (between the existing imports), add two new imports. The frontmatter currently looks like this (lines 1-5):

```astro
---
import Base from '../layouts/Base.astro';
import SectionLabel from '../components/SectionLabel.astro';
import StackChips from '../components/StackChips.astro';
```

Replace it with:

```astro
---
import Base from '../layouts/Base.astro';
import SectionLabel from '../components/SectionLabel.astro';
import StackChips from '../components/StackChips.astro';
import SpeakingCard from '../components/SpeakingCard.astro';
import speaking from '../data/speaking.json';
```

- [ ] **Step 3: Edit `site/src/pages/index.astro` - insert the Speaking section**

In the same file, find the divider that sits between the *Featured work* `</section>` and the *Also building* `<!-- Also building -->` comment. It looks like this (around lines 224-228):

```astro
    </section>
  </section>

  <div class="mx-auto max-w-page px-8 section-divider"></div>

  <!-- Also building -->
```

Replace those exact lines with:

```astro
    </section>
  </section>

  <div class="mx-auto max-w-page px-8 section-divider"></div>

  <!-- Speaking -->
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

  <div class="mx-auto max-w-page px-8 section-divider"></div>

  <!-- Also building -->
```

Verify: the *Featured work* section closes, followed by ONE divider, then the new Speaking section, then ONE divider, then *Also building*. The divider count between sections must remain exactly one - if you end up with two consecutive dividers, that's a bug.

- [ ] **Step 4: Type-check the project**

Run from PowerShell (working directory: `D:\Dev\Repos\stewartburton.github.io\site`):

```powershell
cd site
npx astro check
```

Expected: zero errors. If the check reports type errors in the Talk interface or the JSON shape, fix before continuing. (Common cause: a typo in the interface that doesn't match the JSON keys.)

- [ ] **Step 5: Build the site**

Run from PowerShell (still in `site/`):

```powershell
npm run build
```

Expected: build succeeds. Final output should report a built `dist/` with no warnings about the new files. If the build fails on the import path for `speaking.json` or the asset path, fix before continuing.

- [ ] **Step 6: Manual visual check**

Run from PowerShell (still in `site/`):

```powershell
npm run dev
```

In a browser, open the URL the dev server prints (typically `http://localhost:4321/`). Verify:
- The Speaking section appears between *Featured work* (which ends with the silkspotter "independent product" card) and *Also building*.
- The eyebrow reads `speaking` and the h2 reads `On record.`.
- The card shows the BET thumbnail on the left, copy on the right (desktop). Resize the browser narrow - the card should stack thumbnail-on-top, copy-below.
- Click the card. A new browser tab opens to `https://youtu.be/s-2zqj-2OOA`.
- Hover the card. The border subtly brightens (border-strong). The "watch on youtube" CTA turns teal.
- No layout shift when the page loads (the explicit width/height on the `<img>` should prevent CLS).

Stop the dev server (Ctrl+C) once verified.

- [ ] **Step 7: Commit home-page integration**

Run from PowerShell (back in project root):

```powershell
cd ..
git add site/src/components/SpeakingCard.astro site/src/pages/index.astro
git commit -m @'
feat(home): add Speaking section with BET masterclass talk

New SpeakingCard component renders a wide horizontal card showing
the BET Software masterclass episode 3 talk, placed between Featured
work and Also building on the home page. Driven by speaking.json so
a future second talk is a data change.

Built on the existing card-elevated / text-card-lead / font-mono
utilities so the section is visually consistent with the surrounding
Featured work and Also building sections. Static thumbnail with
target=_blank link to YouTube - no iframe, no third-party load on
the home page.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
'@
```

Expected: clean commit, two files changed.

---

## Task 3: SpeakingEmbed component + about-page integration

**Files:**
- Create: `site/src/components/SpeakingEmbed.astro`
- Modify: `site/src/pages/about.astro` (insert subsection after the divider following *bio*, before *philosophy*)

- [ ] **Step 1: Create `site/src/components/SpeakingEmbed.astro`**

Write the file with these exact contents:

```astro
---
interface Talk {
  id: string;
  title: string;
  series: string;
  episode: number;
  date: string;
  duration: string;
  publisher: string;
  url: string;
  thumbnail: string;
  summary: string;
}

interface Props {
  talk: Talk;
}

const { talk } = Astro.props;

const monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const [year, month] = talk.date.split('-');
const dateLabel = `${monthLong[Number(month) - 1]} ${year}`;

const caption = `${talk.series} · Episode ${talk.episode} · ${dateLabel} · ${talk.duration}`;
const altText = `${talk.series} Episode ${talk.episode} - ${talk.title}`;
const linkLabel = `Watch ${talk.series} Episode ${talk.episode} on YouTube (opens in new tab)`;
---

<figure class="m-0">
  <a
    href={talk.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={linkLabel}
    class="group relative block overflow-hidden rounded-chip border border-hairline border-border-subtle"
  >
    <img
      src={talk.thumbnail}
      alt={altText}
      width="1280"
      height="720"
      loading="lazy"
      class="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
    />
    <span
      aria-hidden="true"
      class="absolute inset-0 pointer-events-none"
      style="background: linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.45) 100%);"
    ></span>
    <span aria-hidden="true" class="absolute inset-0 flex items-center justify-center">
      <span class="flex items-center justify-center w-14 h-14 rounded-full border border-hairline border-accent transition-colors" style="background: rgba(10,10,10,0.7);">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="text-accent ml-1"
        >
          <path d="M5 3.5L17 10L5 16.5V3.5Z" fill="currentColor" />
        </svg>
      </span>
    </span>
  </a>
  <figcaption class="mt-3 font-mono text-mono-meta uppercase tracking-wide text-text-tertiary text-center">
    {caption}
  </figcaption>
</figure>
```

Why each piece:
- `<figure>` + `<figcaption>` is the semantically correct wrapper for an image with a caption.
- The play-button is a 56px circle (matches the brief's `w-14 h-14`) with a teal hairline border, semi-transparent dark fill, and a teal SVG triangle. `ml-1` on the SVG nudges the visual centre of the triangle into the centre of the circle (a `<` triangle has visual mass on its left).
- Inline `style="background: rgba(...)"` for the play-button background because `bg-bg-primary/70` (Tailwind opacity utility) is fragile across versions and we want the same `#0a0a0a @ 70%` value the page uses elsewhere.
- The play-button is `aria-hidden="true"` because the parent `<a>` carries the descriptive label - announcing "play button" twice in a screen reader is noise.
- Hairline border on the figure container so the embedded thumbnail has a visible edge against the dark page background. (Home-page card has `card-elevated` which already provides the border; the `/about` embed needs its own.)

- [ ] **Step 2: Edit `site/src/pages/about.astro` - import the data and component**

Open `site/src/pages/about.astro`. The frontmatter currently looks like this (lines 1-4):

```astro
---
import Base from '../layouts/Base.astro';
import SectionLabel from '../components/SectionLabel.astro';
---
```

Replace it with:

```astro
---
import Base from '../layouts/Base.astro';
import SectionLabel from '../components/SectionLabel.astro';
import SpeakingEmbed from '../components/SpeakingEmbed.astro';
import speaking from '../data/speaking.json';
---
```

- [ ] **Step 3: Edit `site/src/pages/about.astro` - insert the Speaking subsection**

Find the divider that sits between the *bio* `</section>` and the *philosophy* `<section>`. It looks like this (around lines 36-40):

```astro
  </section>

  <div class="mx-auto max-w-page px-8 section-divider"></div>

  <section>
    <div class="mx-auto max-w-page px-8 py-section grid md:grid-cols-[200px_1fr] gap-x-10 gap-y-6">
      <SectionLabel label="philosophy" />
```

Replace those exact lines with:

```astro
  </section>

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

  <div class="mx-auto max-w-page px-8 section-divider"></div>

  <section>
    <div class="mx-auto max-w-page px-8 py-section grid md:grid-cols-[200px_1fr] gap-x-10 gap-y-6">
      <SectionLabel label="philosophy" />
```

Verify: divider, then the new Speaking subsection (using the same two-column `grid md:grid-cols-[200px_1fr]` layout as bio/philosophy/availability), then a new divider, then *philosophy*.

- [ ] **Step 4: Type-check**

Run from PowerShell (in `site/`):

```powershell
cd site
npx astro check
```

Expected: zero errors. If the project root is not `site/`, adjust the path.

- [ ] **Step 5: Build**

Run from PowerShell (in `site/`):

```powershell
npm run build
```

Expected: build succeeds.

- [ ] **Step 6: Manual visual check**

Run from PowerShell (in `site/`):

```powershell
npm run dev
```

Open `http://localhost:4321/about` in a browser. Verify:
- A new "speaking" subsection appears between *bio* and *philosophy*, in the same two-column layout (label-left, content-right).
- The paragraph reads correctly and uses hyphens (no em dashes).
- Below the paragraph, the embedded thumbnail appears with a teal-circled play button centred on it.
- Caption underneath reads `BET Masterclass · Episode 3 · February 2026 · ~20 min`.
- Hover the embed. The thumbnail subtly scales up; the cursor is a pointer.
- Click. A new tab opens to `https://youtu.be/s-2zqj-2OOA`.
- Resize the browser narrow. The two-column grid stacks; the embed fills the prose width.

Stop the dev server (Ctrl+C) once verified.

- [ ] **Step 7: Commit about-page integration**

Run from PowerShell (back in project root):

```powershell
cd ..
git add site/src/components/SpeakingEmbed.astro site/src/pages/about.astro
git commit -m @'
feat(about): add Speaking subsection with talk embed

New SpeakingEmbed component renders a centred thumbnail with a teal
play-button overlay and a mono caption, placed between bio and
philosophy on /about. Same JSON data source as the home-page card,
different visual treatment that fits inside the personal narrative
flow rather than the front-door card stack.

No iframe - static thumbnail link-out to YouTube to keep page weight
low and avoid loading a third-party tracking pixel on /about.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
'@
```

Expected: clean commit, two files changed.

---

## Task 4: Final verification sweep

**Files:** none (read-only verification of the prior commits).

- [ ] **Step 1: Em-dash sweep on the new content**

Run from PowerShell (project root):

```powershell
Select-String -Path "site\src\components\SpeakingCard.astro","site\src\components\SpeakingEmbed.astro","site\src\data\speaking.json","site\src\pages\index.astro","site\src\pages\about.astro" -Pattern "—"
```

Expected: no matches. If any em dash was introduced, replace with `-` and amend the relevant commit (or create a fixup commit) before pushing.

- [ ] **Step 2: Verify the asset is reachable in the build output**

Run from PowerShell (in `site/`):

```powershell
cd site
npm run build
Get-Item "dist\assets\bet-masterclass-ep3-thumbnail.jpg" | Select-Object Name, Length
```

Expected: the JPEG is present in `dist/assets/` at the same size as the source. If missing, the asset path is wrong.

- [ ] **Step 3: Final preview**

Run from PowerShell (in `site/`):

```powershell
npm run preview
```

Open the URL the preview server prints (typically `http://localhost:4321/`). Click through:
- Home page → Speaking section visible, card click opens YouTube
- `/about` → Speaking subsection visible, embed click opens YouTube
- Top nav unchanged (still work / about / services / contact - no "speaking" item)
- No console errors in DevTools (no missing-asset 404s, no stylesheet warnings)

Stop the preview server (Ctrl+C) once verified.

- [ ] **Step 4: Confirm no extraneous changes**

Run from PowerShell (project root):

```powershell
cd ..
git status
git log --oneline -5
```

Expected:
- `git status` is clean (no untracked or modified files).
- `git log` shows three new commits: foundation, home-page integration, about-page integration. (Plus the spec commit from earlier.)

---

## Self-review

**Spec coverage check:**

| Spec section | Implemented in |
|---|---|
| Goal: surface BET masterclass talk | Tasks 2 + 3 |
| Path B only | Plan implements Path B exclusively (no Path A artefacts) |
| Two surfaces, one content | Task 2 (home), Task 3 (about) |
| No `/speaking` index, no nav item | Confirmed in Task 4 Step 3 (top nav unchanged) |
| JSON-driven | Task 1 Step 3 (`speaking.json`), Tasks 2+3 import via `speaking[0]` |
| Reuse live design system | Tasks 2+3 use `card-elevated`, `text-card-lead`, `font-mono text-mono-label`, `border-hairline border-border-subtle`, etc. - no hardcoded `#141414` / `0.5px` / `11px` values |
| Static thumbnail, no iframe | Tasks 2+3 use `<img>` with `loading="lazy"`; no iframe anywhere |
| `site/public/assets/bet-masterclass-ep3-thumbnail.jpg` | Task 1 Steps 1-2 |
| `site/src/data/speaking.json` | Task 1 Step 3 |
| `SpeakingCard.astro` | Task 2 Step 1 |
| `SpeakingEmbed.astro` | Task 3 Step 1 |
| `index.astro` edits | Task 2 Steps 2-3 |
| `about.astro` edits | Task 3 Steps 2-3 |
| Home-page section copy locked (eyebrow, h2, sub-blurb, card title, body, CTA) | Task 2 Steps 1+3 |
| About-page subsection copy locked (label, paragraph, caption) | Task 3 Steps 1+3 |
| Hyphens only, no em dashes | Task 4 Step 1 sweeps for them |
| Accessibility: aria-label, alt text, lazy-load, explicit dimensions, target/rel pair | Tasks 2+3 Step 1 |
| Out of scope items | None implemented (no /speaking page, no nav item, no iframe, no MP4 backup, no transcript) |

All spec sections covered.

**Placeholder scan:**
- No "TBD" / "TODO" / "implement later" / "fill in details" anywhere.
- No "add appropriate error handling" or vague directives.
- All code blocks contain complete, copy-pasteable code.

**Type / signature consistency:**
- The `Talk` interface is defined identically in both `SpeakingCard.astro` and `SpeakingEmbed.astro`. (Acceptable duplication for two small files; if a third consumer arrives, factor into `site/src/types/speaking.ts`.)
- JSON keys (`id`, `title`, `series`, `episode`, `date`, `duration`, `publisher`, `url`, `thumbnail`, `summary`) match the interface fields exactly.
- Both components consume `speaking[0]` from the imported JSON array in the same way.

Plan is internally consistent.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-08-speaking-section.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
