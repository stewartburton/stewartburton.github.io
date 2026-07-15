---
title: "FiscalAI"
category: "product"
status: "Private pilot · pre-launch"
order: 3
role: "Solo founder, designer, and engineer"
summary: "A local-first tax operations platform for South African accounting firms - AI drafts, classifies and extracts on a machine the firm controls, a named human approves every send, and nothing reaches SARS without a person in the loop."
stack: ["Next.js", "Drizzle", "Neon Postgres", "Cloudflare Pages/Workers", "Ollama / LM Studio", "Claude API"]
liveUrl: null
repoUrl: null
why: "Tax practices don't need another chatbot bolted onto eFiling - they need the seasonal grind (chasing client documents, checking VAT201s, triaging SARS correspondence) taken off a practitioner's desk without putting client data at risk or letting AI submit anything unsupervised."
---

## What it is

An operational platform for small-to-mid South African accounting firms, covering the work around tax submission rather than the submission itself: collecting and classifying client documents, extracting the numbers, chasing what's missing, assembling review-ready packs, and triaging SARS correspondence into tracked cases with approval-gated response drafts.

## How it works

```mermaid
flowchart LR
    Portal["Portal (system of record)\nCloudflare Pages/Workers + Neon Postgres"] -- job queue --> Worker["Local Worker\n(firm-controlled Windows machine)"]
    Worker -- Tier 0/1/2 --> Local["Ollama / LM Studio"]
    Worker -- Tier 3 (gated, logged) --> Claude["Claude API"]
    Worker -- proposals --> Portal
    Portal -- human approval --> Send["Sent by a named person"]
```

## What I optimised for

- **Local-first by default.** Document classification, extraction, and drafting run on a machine the firm controls; cloud AI is a logged, policy-gated exception, not the default path.
- **A human in the loop, enforced in the schema.** Every AI output lands as a proposal in an approvals queue - the database's own constraints, not just app logic, make an unapproved send impossible.
- **Boundaries that are binding, not disclaimers.** FiscalAI never touches eFiling, stores SARS credentials, or sends client communication without a named human's sign-off - designed in, not bolted on.

## Status

Private pilot, pre-launch. Piloting with a small South African chartered accounting firm through the 2026 filing season on a feature-complete portal running synthetic data; live model calls and a real connected mailbox are gated behind a documented readiness checklist ahead of real client data.
