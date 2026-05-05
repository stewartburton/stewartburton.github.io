---
title: "Kafka AI deployment assistant"
category: "enterprise"
status: "Live in production"
order: 6
role: "Designer and builder"
summary: "A request-to-PR workflow that turns a structured wiki request into validated Kafka topic and connector YAML — with duplicate detection, secret-reference checks, and environment validation before anything reaches a pull request."
stack: ["Python", "Kafka", "GitOps", "YAML", "Wiki templates", "Vault references"]
liveUrl: null
repoUrl: null
why: "Kafka onboarding is the kind of work that looks low-stakes until a malformed YAML lands in production. The fix isn't to write a smarter linter — it's to redesign the intake so the request is structured before anyone touches the infrastructure code."
---

## The problem

Kafka topic and connector deployments required engineers to translate developer requests into infrastructure YAML by hand. The process was vulnerable to formatting mistakes, duplicate topics, inconsistent environment values, and missing secret references. Every step was manual, and validation only happened during the PR review — by which point a malformed request had already become a malformed YAML file.

## The approach

Move the validation **upstream of the YAML**. Give developers a structured wiki template that captures what they actually need (topic name, environment, secret references, replication, retention). Build a tool that parses the template, validates required fields, checks Vault references, normalises values, deduplicates against existing definitions, and generates the YAML diff for review. The PR is what GitOps deploys; the tool is what makes the PR safe.

## How it works

```mermaid
flowchart TD
    Dev["Developer"] --> Template["Structured Wiki Template"]
    Template --> Request["Completed Change Request"]
    Request --> Tool["Kafka AI Tool"]

    Tool --> Parse["Parse Request"]
    Tool --> Validate["Validate Required Values"]
    Tool --> Vault["Check Secret References"]
    Tool --> Merge["Merge / Deduplicate YAML"]
    Tool --> Diff["Show Git Diff"]

    Diff --> DevOps["DevOps Review"]
    DevOps --> PR["Infrastructure PR"]
    PR --> CloudReview["Platform Review"]
    CloudReview --> GitOps["GitOps Sync"]
    GitOps --> Verify["Connector / Topic Verification"]
```

## What I built

- **Developer-facing request templates.** Structured wiki templates that make the necessary inputs explicit and the optional inputs visible.
- **Parser and validator.** Reads the template, validates required fields against the target environment, and surfaces missing or malformed inputs *before* generation.
- **Vault reference checker.** Confirms secret references resolve in the target environment without ever fetching the secret itself.
- **Duplicate detection with normalisation.** Catches topic redefinitions even when the YAML uses different formatting or value casing.
- **Diff preview.** Shows the engineer the exact infrastructure change before a PR is opened, so review is reading a diff, not reverse-engineering a request.
- **Manual AI fallback.** When the API path is unavailable, the tool prints a curated prompt the engineer can paste into a chat client — same workflow, different transport.

## Outcome

A typical Kafka request that previously required 30–90 minutes of manual interpretation, validation, YAML drafting, and secret checking is now a structured intake that produces a reviewable diff in minutes. The defects that used to surface in production — duplicate topics, missing secret refs, wrong environment values — are caught at intake time. GitOps still owns deployment; this tool just makes sure GitOps gets a clean PR.
