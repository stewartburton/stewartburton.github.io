---
title: "silkspotter"
category: "product"
status: "Live · iOS, Android, web"
order: 1
role: "Solo founder, designer, and engineer"
summary: "A Claude-Vision-powered identification app for the kind of objects general-purpose vision models are bad at. Edge inference, prompt caching, adversarial protection - the production hardening most AI demos skip."
stack: ["React Native", "Cloudflare Workers", "Claude Vision", "Vectorize", "Stripe"]
liveUrl: "https://silkspotter.net"
repoUrl: null
why: "Real-world Claude Vision in production with edge inference, cost control via caching, and adversarial protection - the kind of production hardening most AI demos skip."
---

## What it is

A mobile-first identification app. The user takes a photo, the app calls Claude Vision behind a Cloudflare Worker, and the answer comes back in seconds - with provenance, confidence, and a "why I think this" rationale.

## How it works

```mermaid
flowchart LR
    Phone["Phone (iOS / Android / Web)"] --> Edge["Cloudflare Worker"]
    Edge --> Cache["Prompt + Response Cache"]
    Edge --> Claude["Claude Vision"]
    Claude --> Edge
    Edge --> Phone
    Edge --> Billing["Stripe Billing"]
```

## What's interesting about it

- **Edge-first.** The Worker is the only thing the phone talks to. No origin server, no warm-pool problem, no cold-start tax.
- **Prompt caching.** Repeated prompts hit the cache. Cost per identification is a fraction of the naive call pattern.
- **Adversarial protection.** Cheap heuristics catch the obvious "is this trying to break out of the prompt" attempts before they hit the model.
- **Solo end-to-end.** Edge architecture, mobile, billing, store deployment - the whole stack is one engineer's work.

## Status

Live on App Store, Google Play, and the open web. Real users, real Stripe billing, real Cloudflare bill - the AI cost story actually has to work.
