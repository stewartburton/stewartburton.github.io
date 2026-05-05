---
title: "GitHub Copilot PR review rollout at scale"
category: "enterprise"
status: "Live in production"
order: 2
role: "Designer, builder, and rollout owner"
summary: "A repeatable rollout tool that audits repositories, generates repo-specific Copilot instructions, opens PRs, configures rulesets, and tracks adoption - turning what would be hundreds of manual setups into a governed batch workflow."
stack: ["Python", "GitHub APIs", "GitHub Copilot", "Rulesets", "GitHub Actions"]
liveUrl: null
repoUrl: null
why: "GitHub Copilot's built-in PR review is generic out of the box. The work that makes it useful - repo-specific instructions tuned to each codebase's conventions and risk surface - is exactly the work that doesn't scale by hand. This is the tooling that does."
---

## The problem

GitHub Copilot can review PRs, but the quality is generic unless each repository ships its own `copilot-instructions.md`. Writing those by hand for every repo is a nonstarter at enterprise scale: hundreds of repositories, inconsistent conventions, no central owner for review standards.

## The approach

Treat the rollout itself as a product. Audit each repo, generate a tailored instructions file from real signal (recent PRs, review comments, file tree, config files), put it through a second AI critique pass for quality, then open a PR for human approval. After merge, configure the Copilot ruleset and notify the team. Track which repositories are onboarded, which are pending, and which are skipped - and report it.

## How it works

```mermaid
flowchart TD
    A["Repository List"] --> B["Collect Repo Data"]
    B --> C["Build Generation Prompt"]
    C --> D["Generate Copilot Instructions"]
    D --> E["Second AI Review Pass"]
    E --> F["Human Review"]
    F --> G["Create Instructions PR"]
    G --> H["Notify Team"]
    H --> I["Configure Ruleset"]
    I --> J["Track Adoption"]

    B --> B1["File Tree"]
    B --> B2["Recent PRs"]
    B --> B3["Review Comments"]
    B --> B4["Config Files"]
```

## What I built

- **Repo audit collector.** Pulls file tree, recent PRs, review comments, and config files (CI, linters, formatters) so the instruction prompt is grounded in real signal.
- **Generator + critique loop.** First AI pass drafts the instructions, second pass critiques them against the repo's conventions. Output is markdown that the team owns.
- **Batch PR creator.** Branches off, commits the instructions, opens a PR with a standard template and reviewer assignment. Runs in single-repo or batch mode.
- **Notification templates.** Pre-written team messages so rollout communication is consistent across hundreds of teams.
- **Ruleset configuration.** Pre-creates rulesets in disabled mode, ready to flip on after instructions land. Admin scope is isolated to this step.
- **Adoption tracker.** Generates a status report: which repos are merged, which are in flight, which are skipped. Feeds the management reporting layer.

## Impact

Manual setup ran 30–75 minutes per repository - repository inspection, instruction drafting, branching, PR creation, ruleset configuration, team notification. Across hundreds of repositories that's a multi-hundred-hour rollout. The tooling collapses the per-repo cost to minutes of human review time, and the adoption tracker means leadership knows what's onboarded without anyone having to assemble that picture by hand.

## What I'd do next

Surface the adoption tracker as a small dashboard so platform and engineering leadership share the same source of truth. Connect it to the same metrics store as the Azure DevOps reviewer so cost and quality signal lives in one place across both review platforms.
