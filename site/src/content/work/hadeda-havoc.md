---
title: "Hadeda Havoc"
category: "product"
status: "Live · iOS App Store · paid"
order: 2
role: "Solo builder (Claude-Code-planned, agent-built)"
summary: "A one-tap arcade flyer starring South Africa's most beloved noisy bird - flap a hadeda through Table Mountain, jacaranda-lined Pretoria streets and Highveld thunderstorms, dodging power lines and minibus taxis for snacks and score."
stack: ["Expo", "React Native", "EAS Build", "Playwright (e2e)", "Cloudflare Workers"]
liveUrl: "https://hadeda-havoc.stewartb.workers.dev"
repoUrl: null
why: "Shipping a paid iOS game from a Windows PC, with no Mac anywhere in the pipeline, is its own kind of production exercise - EAS Build handles the platform, but the audio resilience, difficulty tuning and OTA update discipline are the same craft as any shipped product."
---

## What it is

A proudly South African one-tap arcade game: fly a hadeda ibis through the wires, jacarandas and Highveld storms of a Mzansi dawn. A flap-through-gaps game with a six-city tour of the country, a real SA hadeda screech, storm and taxi-gauntlet events, and a shareable branded high-score card.

## How it works

```mermaid
flowchart LR
    ClaudeCode["Claude Code (design + architecture)"] --> Agents["Local agents (implementation)"]
    Agents --> App["Expo / React Native app"]
    App --> EAS["EAS Build"]
    EAS --> TestFlight["TestFlight / App Store"]
    App -.OTA update.-> App
```

## What's interesting about it

- **No Mac, shipped to iPhone anyway.** The entire pipeline - design, build, and TestFlight/App Store submission - runs through Expo EAS Build from a Windows machine.
- **Resilient audio as a design constraint.** The screech always fires and the soundtrack survives interruptions (notifications, Siri, screen recording) via a watchdog - the kind of production hardening a demo build skips but a shipped game can't.
- **AI-planned, agent-built.** Claude Code does the design and architecture; local agents implement phase by phase; local image models generate the art. The repo's structure documents that split explicitly.

## Status

Live and approved on the [App Store](https://apps.apple.com/app/hadeda-havoc/id6777222298), paid (no ads, no IAP, no accounts). The marketing homepage at [hadeda-havoc.stewartb.workers.dev](https://hadeda-havoc.stewartb.workers.dev) was rebuilt the same day the app went live - hero, features, a six-city gallery, and a real interactive "hear the screech" moment.
