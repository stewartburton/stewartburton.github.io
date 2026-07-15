---
title: "Wildlife Migration Tracker"
category: "product"
status: "Live · web"
order: 9
role: "Solo builder"
summary: "An interactive 3D globe visualising migration routes for 62 species - birds, mammals, marine life, insects, reptiles, and crustaceans - aggregating real data from Movebank, eBird, and Journey North, monetised through contextual wildlife-tour and gear affiliate links."
stack: ["React", "Mapbox GL JS", "Cloudflare Workers", "D1", "Cloudflare Pages"]
liveUrl: "https://wildlifemigrations.org"
repoUrl: null
why: "Data visualisation is its own discipline, and building one from scratch against real scientific data sources - not a toy dataset - is the cheapest way to keep those chops fresh. It's also a reminder that good visual work is mostly subtraction: a 3D globe with 62 species has to stay legible, not just impressive."
---

## What it is

An interactive web platform that visualises global wildlife migration on a 3D Mapbox globe: 62 species across six categories, animated migration routes, seasonal timing, and conservation context (IUCN status, viewing tips) - aggregating real tracking and citizen-science data from Movebank, eBird, Journey North, MiCO, and OCEARCH.

## How it works

```mermaid
flowchart LR
    Sources["Movebank / eBird / Journey North / OCEARCH"] --> D1["D1 (species + route data)"]
    D1 --> App["React app"]
    App --> Globe["Mapbox GL 3D globe\n(satellite / terrain)"]
    App --> Affiliate["Contextual affiliate links\n(Viator tours, Amazon gear)"]
```

## What I optimised for

- **Legibility over spectacle.** 62 species on a 3D globe is a lot of data - satellite/terrain toggle, category filtering, and a species detail panel keep it exploratory rather than overwhelming.
- **Real data, validated before it ships.** An affiliate-link validator checks every Amazon ASIN and image before deploy, run as a required pre-deploy step, not an afterthought.
- **A genuine monetisation angle for a side project.** Viator tour links and Amazon gear recommendations are contextual to the selected species, not generic banner ads.

## Status

Live at [wildlifemigrations.org](https://wildlifemigrations.org). 107 Playwright E2E tests cover the map, search/filter, and accessibility; auto-deploys on push to main via Cloudflare Pages.
