# Home AI lab page (/lab) - design

Date: 2026-08-08
Status: shipped in PR #31, then superseded in part.

Two things changed after this was written, both covered in
[2026-08-09-site-restructure-and-lab-accuracy.md](2026-08-09-site-restructure-and-lab-accuracy.md):
the "built in this workshop" cards now sit alongside a full `/smaller-things` page,
and four tool claims taken from the lab repo turned out to describe an intended
stack rather than a running one.

## Problem

The home AI lab is the strongest applied-AI artefact Stewart owns, and it is
currently filed as `category: product` in `/work`, sitting in a three-column grid
between a trivia game and a lottery predictor. It is infrastructure, not a
shipped consumer app, and the grid position undersells it.

Two published claims have also drifted from the lab repo:

- The page credits LM Studio as the server for the flagship MoE models. LM Studio
  was retired from the serving path on 2026-07-05; llama.cpp + llama-swap is now
  the model server, running as a Windows service behind one OpenAI-compatible
  endpoint that hot-swaps role-mapped models.
- The page credits `nomic-embed-text` for RAG. The RAG path now embeds with
  `qwen3-embedding:0.6b` at 1024 dimensions.

## Decision

Build `/lab` as a top-level page with its own nav item. Retire the
`/work/ai-platform-lab` case study and redirect it. Solo products stay in
`/work`; `/lab` links to them rather than re-describing them.

Rejected alternatives:

- **A third section on `/work`.** Cheapest, fixes the categorisation, but leaves
  the lab detail buried one level down and gives no URL worth putting on a CV.
- **A "personal projects" page.** Duplicates existing `/work` content, doubles the
  drift surface, and the name reads as hobby to a hiring manager.

## Audience

Hiring managers first, consulting leads second, engineering peers third. One page
serving all three: written for a hiring manager, detailed enough that a peer
believes it.

## Page structure

1. **Hero.** Name, one-line thesis, three stat tiles (1 GPU / 12 GB VRAM,
   6 local models, subscriptions replaced).
2. **The constraint.** Hardware spec, then the four engineering decisions the
   constraint forces: quantization chosen per model, MoE with ~3B active params,
   one heavy GPU consumer at a time, RAG instead of long context.
3. **What runs on it.** Serving, models table, voice, memory, automation, agent,
   image. Every service described by role.
4. **The routing policy.** Local-vs-cloud matrix with named escalation cases and
   a local-only rule for sensitive data.
5. **The agent and its guardrails.** Hermes: tools, the three-tier autonomy
   policy engine, what stays tap-to-approve, audit logging, untrusted-output
   assumption.
6. **The economics.** Rand-first table from the lab's own cost ledger.
7. **Built in this workshop.** Cards to `/work/powermeter`, `/work/fettle`,
   `/work/izwi`.
8. **What it carries into enterprise work.** The transfer back to the day job.

## Content rules

- **No ports, no hostnames.** The lab repo documents real port numbers and a
  public ntfy subdomain. None of that goes on a public page. Services are named
  by role only.
- **Accurate on autonomy.** The published claim that all destructive actions
  require a human is the design posture, not the running config. The page states
  what actually runs: a three-tier policy engine (guardian / builder / autopilot)
  running in autopilot on the owner's own machine, with the irreversible actions
  (delete, force-push, merge to main) still tap-to-approve.
- **No claim that the lab serves the shipped apps.** PowerMeter, Fettle and Izwi
  were built using the lab's local coding agents. They do not run on it.
- **Money.** Rand primary, USD in brackets, taken from the lab's cost ledger at
  its stated rate of ~R18.50/$1 (early 2026). Rate stated once on the page.
- **Dated.** A "stack verified against the lab repo, 8 August 2026" line so the
  next drift is visible.

## Implementation

| Change | File |
|---|---|
| New page | `site/src/pages/lab.astro` |
| Nav item between work and about | `site/src/components/TopNav.astro` |
| `current` prop accepts `'lab'` | `site/src/layouts/Base.astro`, `TopNav.astro` |
| Retire the case study | delete `site/src/content/work/ai-platform-lab.md` |
| Redirect old URL | `redirects` in `site/astro.config.mjs` |
| Lead card to `/lab` in the products section | `site/src/pages/work/index.astro` |

Reuses `Base`, `SectionLabel`, `StackChips` and the existing design tokens: dark
canvas, teal accent, hairline borders, no shadows or gradients, two font weights.

## Verification

- `npm run build` clean, `/lab/index.html` emitted, `/work/ai-platform-lab/`
  emits a redirect page.
- Playwright at 1280 and 390 wide: no horizontal scroll, tables readable on
  mobile, nav does not wrap badly with five items.
- Every figure on the page traceable to a file in the lab repo.

## Follow-up, not in this change

Resume, one-pager and LinkedIn carry the lab as a bullet. Once `/lab` is live
they should point at it. Tracked separately.
