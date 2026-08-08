# Site restructure and lab accuracy pass

Date: 2026-08-09
Status: shipped (PRs #30-#35)

Follows [2026-08-08-home-ai-lab-page-design.md](2026-08-08-home-ai-lab-page-design.md).

## What changed

| PR | Change |
|---|---|
| #30 | SKILL.md described as a portable agent skill format, not a Claude-only one |
| #31 | Home AI lab promoted from a `/work` case study to `/lab` |
| #32 | Independent products split onto `/smaller-things`; lab linked to business use |
| #33 | Coding-agent, memory, security and image claims corrected on `/lab` |
| #34 | Frenchie Trivia flipped from in-development to live |
| #35 | Media pipeline layer added to `/lab` |

## The structural decision

Three bodies of work, one page each. `/work` is enterprise only, `/smaller-things`
owns the 12 independent products, `/lab` owns the platform. The homepage's nine-card
product grid was a duplicate of `/work`'s product section, so moving it without
splitting would have produced a third copy of the same 12 summaries.

Case studies stay at `/work/<slug>` so no URLs broke. Product pages set their
breadcrumb root and nav highlight to `/smaller-things`.

Nav label is "smaller things" by Stewart's explicit choice. It was flagged that this
undersells App Store products with paying users; he chose it anyway. Do not silently
rename it to "products".

## Counts are derived

Every count on the homepage, `/work` and `/smaller-things` reads from the content
collection. Proven when Frenchie Trivia's `status` changed: the group headers moved
from 6/4/2 to 7/3/2 and the homepage moved from "6 of them live" to "7" with no
second edit. Never reintroduce a hardcoded count.

Grouping keys off the `status` prefix: `Live` to the live group, `Personal project`
to personal, everything else to in-build.

## The accuracy problem, and the rule that came out of it

Four claims were published from the lab repo's docs and were wrong. Stewart caught
the first; the rest came out of checking the same way.

| Claim | Reality |
|---|---|
| Continue, Cline, Aider as coding agents | No Aider config, no Cline extension. Continue's config dated 4 June against a port retired 5 July, key still `PLACEHOLDER_ANTHROPIC_API_KEY`, no sessions dir, extension not installed |
| LM Studio serving the flagship models | Retired from the serving path 2026-07-05; llama.cpp + llama-swap serve now |
| nomic-embed-text for RAG | `qwen3-embedding:0.6b` at 1024 dimensions |
| DaVinci Resolve for video | Scripted ffmpeg in `hadeda/tools/ad` - 42 invocations, concat, drawtext, afade, amix |

Root cause: `D:\AI\ai-platform-lab` documents an intended stack next to the running
one without marking them apart, and unticked checklists sit next to working code
(`docs/eufy-integration.md` has every phase unticked while `security/alert_bridge.py`
and `ha_watch.py` run).

**Rule: no tool goes on the site as in-use without install evidence.** Check
`~/.vscode/extensions`, a real config with no placeholder values, a sessions or
history directory, `~/.codex/`, `~/.claude/`. For a shipped product, check the store,
not the repo README - Frenchie Trivia's README still has `[ ] App Store submission`
unticked while the app has been live since March.

## Publishing restraint on `/lab`

Withheld deliberately, and the reasoning should survive: no port numbers, no
hostnames, no internal IPs, no home-security camera count, room coverage or vendor.
A working description of a home security topology published beside a real name and
city is not a good trade. The agent-autonomy section states the permissive config
that actually runs rather than only the written design posture.

## Follow-up not done

Resume, one-pager and LinkedIn do not yet reference `/lab` or `/smaller-things`.
