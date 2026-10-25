# Personal site security maintenance - 2026-10-25

Upgrade Astro 5.18.1 to 7.4.2 and compatible MDX. Preserve Tailwind 3 via PostCSS; migrate legacy content collection/render APIs and CI to Node 24. Add types for the existing browser-loaded Mermaid module; patch fast-uri.

## Verification

Build and Astro check pass, all 36 routes retained. Desktop/mobile browser comparison preserves headings, fonts and layout. Critical/high audit counts are zero; five moderate advisories remain.

## Release

Web rollout pending final deployment checks. Native app builds and store actions are outside this pass.
