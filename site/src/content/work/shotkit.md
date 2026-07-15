---
title: "ShotKit"
category: "product"
status: "Live · web · iPad app"
order: 6
role: "Solo founder, designer, and engineer"
summary: "A natural-language DJI drone mission planner - describe a cinematic shot in plain English and ShotKit generates a flight-ready KMZ, with terrain-aware safety checks, airspace warnings, and battery planning built in."
stack: ["Cloudflare Workers", "D1", "Claude API", "Google Maps JS API", "Expo (iPad)"]
liveUrl: "https://shotkit.stewartb.workers.dev"
repoUrl: null
why: "Drone mission-planning tools make you build a flight waypoint by waypoint. ShotKit's bet is that most cinematic shots - an orbit, a reveal, a crane move - are a handful of named patterns, and a pilot describing the shot in plain English should get a flyable mission back, not a blank map."
---

## What it is

A natural-language to DJI WPML mission generator: describe a shot ("slow orbit of the manor house at golden hour, 60m radius") and ShotKit maps it to one of 8 cinematic templates, generating a flight-ready KMZ that loads directly into DJI Fly or DJI Pilot 2. Terrain-follow paths, patrol/perimeter missions, and manual waypoint import round out the planning side.

## How it works

```mermaid
flowchart LR
    Prompt["Plain-English prompt"] --> Claude["Claude (template + params)"]
    Claude --> Context["Sun / wind / weather / terrain context"]
    Context --> Clamp["Safety clamp + regulatory ceiling"]
    Clamp --> KMZ["DJI WPML KMZ export"]
```

## What I optimised for

- **The prompt does the work a UI usually does.** Cardinal-direction hints, time-of-day phrases ("golden hour"), mood vocabulary ("Nolan/IMAX"), and negative constraints ("stay away from Y") all parse out of one text box instead of a dozen form fields.
- **Safety that can't be skipped by accident.** A post-Claude clamp silently corrects any proposed altitude/speed/radius beyond the drone or regulatory envelope, and export is gated behind a fresh airspace/NFZ check and pre-flight checklist - no KMZ downloads without it.
- **Real flight physics, not just geometry.** Battery planning accounts for wind, temperature, and transit distance; wind-aware speed fixes derate per-segment speeds for crosswind stability.

## Status

Live on the open web at [shotkit.stewartb.workers.dev](https://shotkit.stewartb.workers.dev), with an iPad companion app (Expo/React Native) for on-site planning. 8 mission templates, per-country regulatory ceilings across 8 regions, and export to KMZ/GeoJSON/GPX/CSV/PDF brief.
