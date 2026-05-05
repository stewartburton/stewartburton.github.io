---
title: "Wildlife migrations"
category: "product"
status: "Live · web"
order: 6
role: "Solo builder"
summary: "A dark-mode-first visualisation of large-scale animal movement data. Clean lines, restrained palette, designed to be read at a glance and explored on demand."
stack: ["D3", "Astro", "Cloudflare Pages"]
liveUrl: null
repoUrl: null
why: "Data visualisation is its own discipline. Building one from scratch is the cheapest way to keep the chops fresh - and it's a reminder that good visual work is mostly subtraction."
---

## What it is

A small interactive visualisation of seasonal animal movement data. Dark, minimal, quiet. The kind of map that's pleasant to scroll past on a Tuesday afternoon.

## How it works

```mermaid
flowchart LR
    Data["Movement dataset"] --> Build["Astro build pipeline"]
    Build --> CDN["Cloudflare Pages"]
    User["Web user"] --> CDN
    User --> D3["D3 interaction layer"]
```

## What's interesting about it

- **Dark-first.** The palette is dark by default. It's easier on the eyes for an information-dense map and forces every other design choice to be careful.
- **Restraint.** There's exactly one accent colour. No gradients, no glow effects, no animation past what the data needs.

## Status

Live on the open web. A design exercise as much as a product.
