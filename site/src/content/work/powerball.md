---
title: "Powerball ML"
category: "product"
status: "Personal project"
order: 10
role: "Solo builder"
summary: "A statistical exploration of South African Powerball historical draws. Not a tip service - an honest exploration of randomness, designed mostly to disabuse anyone (myself included) of the idea that there's signal here."
stack: ["Python", "pandas", "matplotlib", "Jupyter"]
liveUrl: null
repoUrl: null
why: "Half the value of an ML side project is showing what doesn't work. This one is a worked example of disciplined null results - the same rigor I'd apply to a feature evaluation in production work."
---

## What it is

A Jupyter notebook and data pipeline that ingests historical Powerball draws, runs a battery of statistical tests, and produces visualisations of frequency distributions, gap distributions, and correlation between balls.

## What it shows

That the draws are statistically indistinguishable from a uniform random source over the relevant horizons - which is what you'd expect, and the point of running the analysis. The interesting thing is the *evidence*, not the conclusion.

## How it works

```mermaid
flowchart LR
    Source["Historical draw CSV"] --> Pipeline["pandas pipeline"]
    Pipeline --> Tests["Statistical tests"]
    Tests --> Charts["matplotlib charts"]
```

## Why this is in the portfolio

A useful counterweight to "AI does the thing." Sometimes the rigorous engineering answer is "no, the model is not finding signal because there isn't any." Knowing how to design and read that experiment is part of the job.

## Status

Personal project. The notebook is reproducible end-to-end.
