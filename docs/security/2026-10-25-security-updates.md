# Personal site security maintenance - 2026-10-25

Upgrade Astro 5.18.1 to 7.4.2 and compatible MDX. Preserve Tailwind 3 via PostCSS; migrate legacy content collection/render APIs and CI to Node 24. Add types for the existing browser-loaded Mermaid module; patch fast-uri.

## Verification

Build and Astro check pass, all original 36 routes retained before upstream sync; final 35-page build preserves the newer remote removal of Silkspotter. Desktop/mobile browser comparison preserves headings, fonts and layout. Critical/high audit counts are zero; five moderate advisories remain.

## Release

GitHub Pages build and deployment succeeded: https://github.com/stewartburton/stewartburton.github.io/actions/runs/40187477773 (deployed commit 4b03fa9). Live homepage returns 200. Both Astro lockfiles were also verified with real clean npm ci on macOS.
