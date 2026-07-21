---
title: "Casino game catalog automation"
category: "enterprise"
status: "Working proof of concept"
order: 3
role: "Designer and builder"
summary: "Playwright plus a locally-hosted vision model automating two manual jobs across a ~3,400-game online slots lobby: transcribing in-game metadata to feed recommendation models, and verifying every game is actually live and playable."
stack: ["TypeScript", "Playwright", "Local VLM (Qwen3-VL)", "Node.js", "ExcelJS"]
liveUrl: null
repoUrl: null
why: "Manual work at catalog scale quietly eats teams. Ten metadata fields across thousands of games is an estimated five to seven person-weeks of transcription per refresh, and hourly is-it-up checks consume a rotation of people. Both collapse into unattended browser automation once a zero-cost local vision model can do the reading."
---

## The problem

An online slots lobby at a major casino operator lists roughly 3,400 games from around 60 game studios. Two jobs around that catalog were entirely manual:

- **Metadata transcription.** Enriching the games catalog for player recommendation models meant a person opening each game, dismissing splash screens, finding the rules and paytable panel, and reading off ~10 fields - volatility, RTP, max-win multiplier, bonus-buy and free-spins availability, mechanic flags, bet limits. At four to six minutes per game, a full refresh is an estimated five to seven person-weeks of transcription.
- **Uptime verification.** Confirming games were actually live meant people logging in and launching them by hand, every hour.

## How it works

```mermaid
flowchart TD
    A["Master catalog spreadsheet"] --> B["Tier 1: resolve each row via the platform's public catalog API"]
    B --> C["Authenticated Playwright session - persisted and reusable"]
    C --> D{"Per-studio extractor"}
    D --> D1["5 dedicated modules"]
    D --> D2["Generic fallback - 26 more studios"]
    D1 --> E["Open rules / paytable panel"]
    D2 --> E
    E --> F{"Info panel is real DOM?"}
    F -->|"Yes"| G["Regex-parse the text - no vision call"]
    F -->|"No"| H["Screenshot to local vision model"]
    G --> I["Per-game JSONL checkpoint - crash-safe, resumable"]
    H --> I
    I --> J["Compile enriched spreadsheet - original columns preserved"]

    K["Monitor run"] --> L["Tier A: catalog API sweep - ~2,880 games in ~2 min"]
    K --> M["Tier B: launch 90 canary games headlessly"]
    M --> N["Six health signals incl. vision-verified render check"]
    L --> O["Traffic-light HTML report - evidence thumbnails, run-over-run diff"]
    N --> O
```

## What I built

- **A tiered extraction pipeline.** Catalog resolution against the platform's public API first, then an authenticated browser session, then per-studio extractor modules behind one shared interface - five dedicated modules, with everything else routed through a defensive generic fallback (conditional splash dismissal, vision-guided icon location with retries, cross-frame DOM scans). Covers 31 slot studios.
- **DOM-first, vision-second.** When the rules panel is real DOM, a regex parser reads it for free; only image-rendered panels go to the vision model. The model is Qwen3-VL served locally - a full catalog run makes on the order of 40,000 vision calls, an estimated four-figure API bill per run at paid-inference prices, and zero locally.
- **Crash-safe by construction.** Every game writes a JSONL checkpoint, so any run resumes exactly where it died, and the final spreadsheet compiles from checkpoints while preserving every original column.
- **A two-tier uptime monitor.** A fast API sweep verifies ~2,880 games still exist in about two minutes; a deep tier launches sample games in a headless browser and only calls one "ready" when six independent signals pass - including a screenshot showing a live symbol grid and working balance and bet controls. Output is a self-contained traffic-light HTML report with embedded evidence thumbnails and diffs against the previous run, exiting non-zero on any red studio so a scheduler can alert.

## Impact

- **Metadata refresh:** an estimated five to seven person-weeks of manual transcription per pass, replaced by two to three days of unattended runtime.
- **Extraction quality:** first full-catalog studio runs came back 99% clean on one studio, and iterative hardening lifted another from 33% to 82% coverage.
- **Uptime checks:** ~2,880 games verified in ~2 minutes (fast tier), or ~29 minutes with vision-confirmed render checks - no humans in the loop.
- **Inference cost:** zero per run, by serving the vision model locally instead of calling a paid API (an estimated four-figure saving per full catalog pass).

## Status

A working proof of concept, run on demand. All identifiers, platform details, and studio names are sanitised here. Next steps are scheduled execution and an automated test harness.
