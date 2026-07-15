---
title: "silkspotter"
category: "product"
status: "Live · web (gated)"
order: 4
role: "Solo founder, designer, and engineer"
summary: "Point your phone at the jockeys before a South African horse race and know who's running in seconds - Claude Vision identifies the silks, matches them against the day's race card, and links straight to the bet."
stack: ["Cloudflare Workers", "Hono", "D1", "KV", "Claude Vision", "Cloudflare Turnstile"]
liveUrl: "https://silkspotter.net"
repoUrl: null
why: "A racecourse is a bad place to be squinting at a race card. silkspotter's bet is that a photo of the silks plus a two-pass Claude Vision check (colour and pattern scoring, then a visual re-verification against the field) beats reading tiny print - and a direct link into the exact race is what turns identification into a placed bet."
---

## What it is

A Cloudflare-native PWA for South African horse racing: photograph a jockey's silks at the track, and Claude Vision identifies the colours and pattern, scores them against every entry on today's race card, and returns the top matches with confidence scores, horse and jockey details, and a direct link to bet on that exact race.

## How it works

```mermaid
flowchart LR
    Camera["Phone camera (cropped to zoom)"] --> Sonnet["Claude Sonnet Vision\n(silk colours -> JSON)"]
    Sonnet --> Score["Score vs today's D1 race entries"]
    Score --> Haiku["Haiku two-pass\n(visual re-verify top 5)"]
    Haiku --> Result["Top matches + confidence + Bet Now link"]
```

## What I optimised for

- **A two-pass vision check, not a single guess.** Sonnet extracts structured silk colours first; Haiku then visually compares the photo against the top-5 candidates' real thumbnails before anything is returned - confidence is √(vision confidence) × match score, capped and honest.
- **The one tap that matters.** "BET NOW" doesn't link to the meeting - it links to the exact race with that horse, on Hollywoodbets.
- **Privacy by default.** Uploaded images are deleted immediately after identification, IPs are SHA-256 hashed before storage, EXIF is stripped client-side, and there's an 18+ gate on first visit - POPIA-conscious from day one.

## Status

Live and gated (invite-only registration, Cloudflare Turnstile, per-IP rate limiting) at [silkspotter.net](https://silkspotter.net). A daily scrape keeps race entries and silk data current; the admin panel tracks coverage per meeting and per race.
