---
title: "PowerMeter"
category: "product"
status: "Live · web"
order: 2
role: "Solo founder, designer, and engineer"
summary: "An electricity tracker for South African prepaid users - token logs, cost-per-kWh trends, monthly forecasts, and ZAR-with-VAT context the local utility apps don't show."
stack: ["FastAPI", "PostgreSQL", "Cloudflare", "Web (responsive)"]
liveUrl: "https://powermeter.app/login"
repoUrl: null
why: "South African prepaid electricity is opaque by default. PowerMeter is the small thing that makes it legible - typical of consumer software where the right design choice is what's missing, not what's added."
---

## What it is

A small consumer app that tracks prepaid electricity tokens, computes cost per kWh net of VAT, and projects monthly spend. The audience is SA households on prepaid meters who want to know whether the next R500 token will see them through the month.

## How it works

```mermaid
flowchart LR
    Browser["Browser (mobile or desktop)"] --> API["FastAPI"]
    API --> DB["PostgreSQL"]
    Browser --> Charts["Charts and forecasts"]
```

## What I optimised for

- **One-screen mental model.** The home screen shows the current month's spend, units, and forecast. Everything else is one tap away.
- **VAT-aware costs.** Every cost figure is shown net and gross of 15% VAT - the only honest way to compare months when token prices shift.
- **Forecasts that admit uncertainty.** A range, not a point. The app says "between X and Y given current usage," not "you'll spend exactly Z."

## Status

Live on the open web at [powermeter.app](https://powermeter.app/login). Mobile-first responsive design, no app-store install required - which suits the prepaid-electricity audience and keeps the deployment story simple.
