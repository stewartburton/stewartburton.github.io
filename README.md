# stewart-burton.com

[![Live Site](https://img.shields.io/badge/Live-stewart--burton.com-0d9488?style=for-the-badge)](https://www.stewart-burton.com)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Actions-success?style=for-the-badge&logo=github-actions)](.github/workflows/deploy.yml)
[![Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01?style=for-the-badge&logo=astro)](https://astro.build)

> DevOps engineer building the AI layer for engineering teams.

The personal portfolio + recruiter-facing materials for [Stewart Burton](https://www.linkedin.com/in/stewart-burton/) — DevOps engineer, Cape Town. Built as an Astro static site, deployed to GitHub Pages on every push to `main`.

## What's in this repo

```
stewartburton.github.io/
├── site/                                # Astro source (the live site)
│   ├── src/
│   │   ├── pages/                       # /, /work, /about, /services, /contact, /certifications
│   │   ├── pages/work/[...slug].astro   # case-study template
│   │   ├── content/work/                # 16 case studies as Markdown (8 enterprise + 8 product)
│   │   ├── content/config.ts            # content collection schema
│   │   ├── components/                  # TopNav, Footer, SectionLabel, StackChips, MermaidEnhancer, WorkCard
│   │   ├── layouts/Base.astro
│   │   └── styles/global.css            # Tailwind base + design tokens
│   ├── public/                          # served at site root
│   │   ├── CNAME                        # www.stewart-burton.com
│   │   ├── certificates/                # KodeKloud + ISTQB cert PDFs
│   │   ├── resume/                      # CV + AI/DevOps profile PDFs
│   │   └── robots.txt
│   ├── astro.config.mjs
│   ├── tailwind.config.mjs              # design tokens (colours, type scale, spacing)
│   └── package.json
├── resume/
│   ├── source/resume.html               # multi-page A4 CV source
│   └── Stewart_Burton_AI_DevOps_Engineer_Resume.pdf
├── assets/
│   ├── onepager/
│   │   ├── onepager.html                # single-page recruiter handout source
│   │   ├── profile.jpg
│   │   └── Stewart_Burton_AI_DevOps_Engineer_Profile.pdf
│   ├── certificates/                    # source-of-truth cert PDFs (mirrored into site/public/)
│   └── profile.jpg
├── .github/workflows/deploy.yml         # build Astro + publish to Pages on push to main
└── README.md
```

The repo also contains the legacy static site (`index.html`, `style.css`, `script.js`) at the root from before the rebuild — these are not served. The Astro `site/dist/` build is the only thing GitHub Pages publishes.

## Live URLs

- **Site** — https://www.stewart-burton.com
- **Work index** — https://www.stewart-burton.com/work
- **Certifications** — https://www.stewart-burton.com/certifications (inline PDF modal viewer)
- **CV download** — https://www.stewart-burton.com/resume/Stewart_Burton_AI_DevOps_Engineer_Resume.pdf
- **One-pager download** — https://www.stewart-burton.com/resume/Stewart_Burton_AI_DevOps_Engineer_Profile.pdf

## Local development

```bash
cd site
npm install
npm run dev          # http://localhost:4321
npm run build        # produces site/dist/
npm run preview      # serve the built dist
```

## Regenerating the PDFs

Both the multi-page CV and the one-pager are pure HTML rendered to PDF via headless Chrome — no resume builder, no third-party tool, fully reproducible from this repo.

```bash
# Multi-page CV
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="resume/Stewart_Burton_AI_DevOps_Engineer_Resume.pdf" \
  "file:///$(pwd)/resume/source/resume.html"

# One-pager (no margins, no print headers)
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="assets/onepager/Stewart_Burton_AI_DevOps_Engineer_Profile.pdf" \
  --print-to-pdf-no-header --no-margins \
  "file:///$(pwd)/assets/onepager/onepager.html"
```

After regenerating, copy into `site/public/resume/` so the live site serves the latest version.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`:

1. `actions/checkout@v4`
2. `actions/setup-node@v4` (Node 20, npm cache keyed on `site/package-lock.json`)
3. `npm ci` and `npm run build` in `site/`
4. `actions/upload-pages-artifact@v3` with the `site/dist/` directory
5. `actions/deploy-pages@v4`

GitHub Pages source is set to **GitHub Actions** (not legacy branch). CNAME is in `site/public/` so the custom domain stays live across deploys.

## Design system

Dark, restrained, mono accents, single teal accent. Hairline borders only (`0.5px`). No shadows. No gradients. Two font weights (Inter 400 / 500 + JetBrains Mono 400 / 500). Sentence case in headings, lowercase in mono labels.

Design tokens are defined in `site/tailwind.config.mjs`. Mermaid diagrams in case studies are themed via `site/src/components/MermaidEnhancer.astro` (matches Shiki's `pre[data-language="mermaid"]` markup, extracts clean text, renders via the Mermaid runtime).

## Contact

- 📧 [stewart@stewart-burton.com](mailto:stewart@stewart-burton.com)
- 💼 [linkedin.com/in/stewart-burton](https://www.linkedin.com/in/stewart-burton/)
- 🌐 [stewart-burton.com](https://www.stewart-burton.com)
- 🐙 [github.com/stewartburton](https://github.com/stewartburton)

## License

Code: [MIT](LICENSE). Content (case studies, copy, profile imagery, CV PDFs) is © Stewart Burton — please don't copy it for your own portfolio.
