---
title: "Brainblitz"
category: "product"
status: "Personal project · smart TV"
order: 11
role: "Solo builder"
summary: "A two-player trivia game show built for the actual TV, not another phone screen - neon game-show UI, AI-generated voice/music/SFX via ElevenLabs, streaks, achievements, and a leaderboard, controlled entirely from an LG remote."
stack: ["HTML5/CSS3", "Cloudflare Pages Functions", "Cloudflare KV", "ElevenLabs API"]
liveUrl: null
repoUrl: null
why: "Every trivia app targets a phone. Brainblitz targets the screen a household is already looking at together during game night - which changes everything about the design: large TV-distance text, remote-only navigation, and a two-player head-to-head format instead of a solo scroll."
---

## What it is

A Triviaverse-inspired, two-player trivia game show for LG webOS TVs (and any browser): neon game-show visuals sized for viewing distance, full Magic Remote and keyboard navigation, speed scoring with a streak multiplier, and South African Afrikaans expressions ("Lekker!", "Ja Boet!", "Haibo!") woven through the feedback.

## How it works

```mermaid
flowchart LR
    Remote["LG Magic Remote / keyboard"] --> Game["Single-file HTML5 game"]
    Game --> Pages["Cloudflare Pages Functions"]
    Pages --> KV["Cloudflare KV\n(scores, achievements)"]
    Pages --> ElevenLabs["ElevenLabs\n(voice, music, SFX)"]
```

## What I optimised for

- **Zero install friction on a TV.** The entire game is a single HTML file with zero dependencies - point the TV's built-in browser at a URL and it runs, no app store, no sideloading.
- **AI-generated audio that degrades gracefully.** ElevenLabs generates custom music and sound effects, cached in KV - if the API is unavailable, a Web Audio API synth step-sequencer fills in seamlessly, so the game never goes silent.
- **A real two-player format.** Streak multipliers, speed scoring, and an answer-cascade reveal are built around a head-to-head living-room dynamic, not a leaderboard of strangers.

## Status

Personal project, built for home use on an LG webOS TV. 250+ built-in questions across custom categories (Frenchies, Braai Culture, SA Food & Slang, and more), 15 unlockable achievements per player, and a PIN-locked admin panel with an ElevenLabs cost dashboard.
