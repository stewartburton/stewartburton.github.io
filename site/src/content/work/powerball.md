---
title: "Powerball ML"
category: "product"
status: "Personal project · local dashboard"
order: 10
role: "Solo builder"
summary: "A statistical intelligence platform for South African Powerball - scrapes every historical draw, trains a 5-model ensemble (XGBoost, LightGBM, LSTM, Transformer, stacking), and publishes its own honest backtest: a measurable but modest edge over random, and an upfront disclaimer that no algorithm predicts a jackpot."
stack: ["Next.js", "Prisma", "PostgreSQL", "Python/FastAPI", "XGBoost/LightGBM", "Ollama"]
liveUrl: null
repoUrl: null
why: "Most lottery-prediction projects sell false hope or quietly bury their failures. This one publishes the opposite: a rigorous walk-forward backtest showing a real (if modest) payout lift on smaller prize tiers, 'jackpot odds remain essentially impossible' stated plainly, and every model version, hyperparameter, and Brier score tracked so the claim can be checked, not taken on faith."
---

## What it is

A self-improving statistical platform for South African Powerball: scrapes the full draw history back to 2009, engineers time-series/entropy/frequency-domain features, and runs a five-model ensemble (XGBoost, LightGBM, LSTM, Transformer, and a stacking meta-learner) that retrains automatically as new draws land. A local Ollama model turns each run's metrics into a plain-language summary.

## How it works

```mermaid
flowchart LR
    Scrape["Scrape SA Powerball draws"] --> Features["Feature engineering\n(time-series, entropy, FFT)"]
    Features --> Ensemble["5-model ensemble\n(XGBoost, LightGBM, LSTM, Transformer)"]
    Ensemble --> Bandit["Bandit-weighted blend\n+ champion/challenger gate"]
    Bandit --> Tickets["Ranked candidate tickets"]
```

## What I optimised for

- **An honest scoreboard, not a marketing number.** A dedicated tier-hit calibration backtest measures the system against random ticket selection over 500 real draws - the current, published result is a 1.59x payout lift, with the "no jackpots predicted" caveat stated as plainly as the win.
- **Champion/challenger discipline.** Every backtest and pipeline run feeds a promotion gate with configurable thresholds - a new model only replaces the incumbent when it demonstrably beats it, tracked in the database, not just in a notebook.
- **Drift and monitoring as first-class citizens.** Weekly GitHub Actions jobs run backtests and drift detection (PSI, KL divergence, KS statistic) and open an issue automatically if a model's performance degrades.

## Status

Personal project, run locally with a Next.js dashboard and a Python ML microservice. 1,700+ historical draws ingested, five model types trained and benchmarked, automated weekly backtest and drift-detection jobs in CI. Educational and entertainment use only - see the project's own disclaimer.
