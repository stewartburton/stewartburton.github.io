---
title: "Brainblitz"
category: "product"
status: "Live · web"
order: 8
role: "Solo builder"
summary: "A small mental-arithmetic trainer with a deliberately spartan UI — no streaks, no leaderboards, no rewards. Just the practice loop, fast and minimal."
stack: ["Vite", "TypeScript", "Cloudflare Pages"]
liveUrl: null
repoUrl: null
why: "Most learning apps are gamification with practice as a side effect. Brainblitz is the inverse — strip the gamification and the practice loop is what's left. A small but useful design point."
---

## What it is

A mental-arithmetic trainer for adults. Pick a difficulty, answer questions, see your time. That's it.

## How it works

```mermaid
flowchart LR
    User["Web (Vite + TypeScript)"] --> CDN["Cloudflare Pages"]
    CDN --> User
```

## Design choices worth noting

- **No streaks.** Streaks are coercive; they punish missed days. The point is to practice when you want to, not when an app demands.
- **No leaderboard.** Comparing yourself to other people is mostly a distraction from comparing yourself to yesterday's-you.
- **No animation.** The interface should feel instant. Anything that delays the next question is friction, full stop.

## Status

Live on the open web. Personal-scale.
