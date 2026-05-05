---
title: "Frenchie Trivia"
category: "product"
status: "Live · web"
order: 5
role: "Solo builder"
summary: "A small trivia game built end-to-end. Light project, real production hosting — the kind of thing that keeps the shipping muscle warm."
stack: ["Vite", "TypeScript", "Cloudflare Pages"]
liveUrl: null
repoUrl: null
why: "Side projects that ship are how you stay sharp on the parts of web work that don't show up in enterprise infrastructure. Frenchie Trivia is a personal-scale exercise in the full stack — design, build, deploy, iterate."
---

## What it is

A trivia game with a French Bulldog mascot. Yes, really. It's silly, but it's a real Vite app, on a real CDN, with real users (who are mostly relatives).

## How it works

```mermaid
flowchart LR
    User["Web (Vite + TypeScript)"] --> CDN["Cloudflare Pages"]
    CDN --> User
```

## Why it's here

The portfolio isn't only enterprise work. Personal-scale projects keep the frontend muscle warm — type discipline, build tooling, accessibility, deploy automation — and they're a useful counterweight to platform engineering, which tends not to ship visual things.

## Status

Live on the open web.
