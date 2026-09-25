# Lab versions

`/lab/` is a dated history of the home AI lab. Each version is a snapshot, not an edit: an
old version is never rewritten to match a newer one.

| URL | Shows |
|---|---|
| `/lab/` | the newest version (highest `version` number), canonical address |
| `/lab/vN/` | any version by number; archived versions get an archive banner and the date they were replaced |

The version switcher, banner, archive date, canonical link, page title and sitemap entries are all
derived from the files below. There is no per-version page to copy.

## Add v3

1. Copy `v2.yaml` to `v3.yaml`. Set `version: 3`, `label: v3`, `asOf`, `summary` (one line for the
   history strip), `title`, `description`, and the content: `lead`, `stats`, `stamp`, `sections`.
   The shape is checked at build time by the `lab` schema in `src/content/config.ts`; the build
   fails with the field name if something is missing.
2. Add `diagrams/v3.svg`, and write its `diagram.alt` text in `v3.yaml`. The build fails if the
   SVG is missing.
3. `npm run build`. v2 becomes archived automatically and its banner picks up v3's `asOf` date.

Do not edit `v1.yaml` or `v2.yaml` to update claims. Add a new version instead. Fix typos only.

## Section blocks

Each section has a `label`, `heading`, optional `intro`, and a list of `blocks`. Block types:
`facts`, `numbered`, `cards`, `table`, `callout`, `prose`, `chips`, `links`, `linkcards`.
See `v2.yaml` for one of each. A section with `layout: stacked` renders a full-width `linkcards`
block (v1 uses this once).

## Diagrams

One inline SVG per version, drawn in the site palette and fonts (Inter, JetBrains Mono, the
teal accent `#5eead4`). Keep the same `viewBox` width (1240) so versions read at the same scale.
Colours and classes (`ld-*`) are defined in the `<style>` block at the top of `v1.svg`; copy that
block into a new diagram. The SVG is inlined so it inherits the page fonts. The page wraps it in
`role="img"` with `diagram.alt` as the label, so write alt text that describes the components and
the arrows, not just "architecture diagram".

## Before you publish a version

Public site, so check these first:

- Every claim has evidence (running config, measured result). Unverified items go in a "what this
  version does not claim" section, not in the body.
- No keys, tokens, IP addresses, internal hostnames, ports, phone numbers, home or drive paths,
  camera or property detail, budget amounts or spend figures. Say "one local endpoint", not a port.
- No em dashes.
- No new employer or client names.
