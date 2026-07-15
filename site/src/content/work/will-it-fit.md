---
title: "Will It Fit"
category: "product"
status: "In development · iOS"
order: 13
role: "Solo founder, designer, and engineer"
summary: "Scan a space once with LiDAR, then scan anything, anywhere, and know in seconds whether it fits - and exactly how to angle it in. Premium, offline, one-time-purchase iOS utility, no accounts and no subscription."
stack: ["Swift", "SwiftUI", "ARKit LiDAR", "SwiftData"]
liveUrl: null
repoUrl: null
why: "Every 'will it fit in my car / doorway / suitcase' question gets answered by squinting at a tape measure. LiDAR on a phone already has the geometry - the missing piece is a fast, offline containment check with a real insertion path, not just a bounding-box guess."
---

## What it is

A native iOS utility that scans a space once with the phone's LiDAR sensor, then checks whether an object fits into it - including the angle it needs to go in at, not just whether its bounding box is smaller. Built for the recurring real-world question of "will this couch/box/suitcase fit through that door/trunk/gap."

## How it works

```mermaid
flowchart LR
    LiDAR["ARKit LiDAR scan"] --> FitKit["FitKit\n(pure Swift math core)"]
    FitKit --> Voxels["Voxel containment + convex hulls"]
    FitKit --> Search["Orientation search + insertion-path BFS"]
    Search --> Result["Fits / doesn't fit + how to angle it"]
```

## What I optimised for

- **A portable math core.** `FitKit` - voxel containment, convex hulls, orientation search, insertion-path BFS, passage traversal - is deliberately built with zero UIKit/ARKit/SwiftUI dependencies, so the hard geometry logic is testable (100+ tests) independent of the app shell.
- **Real insertion paths, not bounding boxes.** The engine checks whether an object can actually be walked through a passage at some orientation, which is the difference between a useful answer and a naive dimension comparison.
- **No accounts, no cloud, no subscription.** A premium one-time purchase, fully offline - the kind of utility that shouldn't need a login to tell you if your couch fits.

## Status

In active build. The FitKit math core is CI-green with 100+ tests; the SwiftUI app scaffold has every screen navigable with SwiftData models and a Keychain-backed entitlement store. AR scanning, real-device verification, and monetization are next.
