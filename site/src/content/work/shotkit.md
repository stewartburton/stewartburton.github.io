---
title: "ShotKit"
category: "product"
status: "Live · iOS, Android"
order: 3
role: "Solo founder, designer, and engineer"
summary: "A photo-craft companion app powered by Claude — composition, lighting, and gear hints based on what the camera is actually seeing right now."
stack: ["React Native", "Claude API", "Cloudflare Workers"]
liveUrl: null
repoUrl: null
why: "Most photo-AI apps generate the photo. ShotKit helps the photographer make it. The product distinction is small but the design implications are not — it changes what the model is allowed to do."
---

## What it is

A pocket assistant for amateur photographers. The phone reads the scene, sends the relevant context to Claude, and gets back composition and lighting hints — framed as suggestions, not autopilot.

## How it works

```mermaid
flowchart LR
    Phone["Phone camera"] --> Edge["Cloudflare Worker"]
    Edge --> Claude["Claude API"]
    Claude --> Edge
    Edge --> Phone["Composition / lighting hints"]
```

## What's interesting about it

- **No image generation.** The product line is "advise the photographer," not "create an image." That decision shapes every prompt and every UI affordance.
- **Edge inference.** Same pattern as silkspotter: the Worker fronts every model call, so cost and latency live in one place.
- **Quietness.** The app doesn't pop up suggestions unsolicited. It surfaces them when the photographer asks.

## Status

Live on iOS and Android.
