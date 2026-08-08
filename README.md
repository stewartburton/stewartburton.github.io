<div align="center">

# Stewart Burton

Applied AI engineer focused on **`AI platform enablement`**, developer productivity, DevOps automation and internal AI tooling.

<sub>CAPE&nbsp;TOWN,&nbsp;SOUTH&nbsp;AFRICA&nbsp;&nbsp;→&nbsp;&nbsp;SA,&nbsp;HYBRID,&nbsp;OR&nbsp;FULLY&nbsp;REMOTE&nbsp;&nbsp;→&nbsp;&nbsp;UK&nbsp;TIMEZONE-FRIENDLY&nbsp;·&nbsp;BRITISH&nbsp;PASSPORT</sub>

<br />

[![stewart-burton.com](https://img.shields.io/badge/-stewart--burton.com-0d9488?style=for-the-badge&logoColor=white)](https://www.stewart-burton.com)
[![LinkedIn](https://img.shields.io/badge/-linkedin-0a0a0a?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/stewart-burton/)
[![Email](https://img.shields.io/badge/-stewart@stewart--burton.com-0a0a0a?style=for-the-badge&logo=protonmail&logoColor=white)](mailto:stewart@stewart-burton.com)

</div>

---

##### `›` ABOUT

Source for **[stewart-burton.com](https://www.stewart-burton.com)** - personal portfolio and recruiter-facing materials. Built as an Astro static site, deployed to GitHub Pages on every push to `main`. Custom domain via CNAME in `site/public/`.

The repo also holds the multi-page CV and the single-page recruiter handout - both are pure HTML rendered to PDF via headless Chrome, fully reproducible.

---

##### `›` LIVE

| | |
|---|---|
| Site | [`www.stewart-burton.com`](https://www.stewart-burton.com) |
| Work index | [`/work`](https://www.stewart-burton.com/work) <sub>· enterprise AI/DevOps only</sub> |
| Independent products | [`/smaller-things`](https://www.stewart-burton.com/smaller-things) <sub>· grouped live / in build / personal</sub> |
| Home AI lab | [`/lab`](https://www.stewart-burton.com/lab) <sub>· the platform underneath</sub> |
| Certifications | [`/certifications`](https://www.stewart-burton.com/certifications) <sub>· inline PDF modal viewer</sub> |
| CV (4-page) | [`/resume/...Resume.pdf`](https://www.stewart-burton.com/resume/Stewart_Burton_AI_DevOps_Engineer_Resume.pdf) |
| One-pager | [`/resume/...Profile.pdf`](https://www.stewart-burton.com/resume/Stewart_Burton_AI_DevOps_Engineer_Profile.pdf) |

---

##### `›` STACK

![Astro](https://img.shields.io/badge/-astro-0a0a0a?style=flat-square&logo=astro&logoColor=5eead4)
![TypeScript](https://img.shields.io/badge/-typescript-0a0a0a?style=flat-square&logo=typescript&logoColor=5eead4)
![Tailwind](https://img.shields.io/badge/-tailwind-0a0a0a?style=flat-square&logo=tailwindcss&logoColor=5eead4)
![Mermaid](https://img.shields.io/badge/-mermaid-0a0a0a?style=flat-square&logo=mermaid&logoColor=5eead4)
![GitHub Actions](https://img.shields.io/badge/-github%20actions-0a0a0a?style=flat-square&logo=githubactions&logoColor=5eead4)
![GitHub Pages](https://img.shields.io/badge/-github%20pages-0a0a0a?style=flat-square&logo=github&logoColor=5eead4)

---

##### `›` REPO LAYOUT

```text
.
├── site/                                # Astro source - the live site
│   ├── src/
│   │   ├── pages/                       # /, /work, /smaller-things, /lab, /about, /services, /contact, /certifications
│   │   ├── pages/work/[...slug].astro   # case-study template (serves both enterprise and product entries)
│   │   ├── content/work/                # 21 case studies (Markdown + frontmatter): 9 enterprise, 12 product
│   │   ├── content/config.ts            # collection schema
│   │   ├── components/                  # TopNav · Footer · SectionLabel · StackChips · MermaidEnhancer · WorkCard · SpeakingCard · SpeakingEmbed
│   │   ├── layouts/Base.astro
│   │   └── styles/global.css
│   ├── public/                          # served at site root
│   │   ├── CNAME                        # www.stewart-burton.com
│   │   ├── certificates/                # KodeKloud + ISTQB cert PDFs
│   │   ├── resume/                      # CV + AI/DevOps profile PDFs
│   │   └── robots.txt
│   ├── astro.config.mjs
│   └── tailwind.config.mjs              # design tokens
├── resume/
│   ├── source/resume.html               # multi-page A4 CV source
│   └── Stewart_Burton_AI_DevOps_Engineer_Resume.pdf
├── assets/
│   ├── onepager/
│   │   ├── onepager.html                # single-page recruiter handout source
│   │   ├── profile.jpg
│   │   └── Stewart_Burton_AI_DevOps_Engineer_Profile.pdf
│   └── certificates/                    # source-of-truth cert PDFs
└── .github/workflows/deploy.yml         # build + publish on push to main
```

<sub>The legacy static site (`index.html`, `style.css`, `script.js`) at the repo root is from before the rebuild. It's not served - only the Astro `site/dist/` build is.</sub>

---

##### `›` SITE STRUCTURE

Three bodies of work, one page each, no product described in two places:

| Page | Owns | Source |
|---|---|---|
| `/work` | Enterprise AI/DevOps case studies | `content/work/` where `category` is `enterprise` or `open-source` |
| `/smaller-things` | Independent products, grouped live / in build / personal | `content/work/` where `category` is `product`, grouped by the `status` prefix |
| `/lab` | The home AI platform | Hand-written `pages/lab.astro`, sourced from `D:\AI\ai-platform-lab` |

Case studies for both categories live at `/work/<slug>`; product pages set their breadcrumb root and nav highlight to `/smaller-things`. `/work/ai-platform-lab` redirects to `/lab` via `redirects` in `astro.config.mjs`.

**Counts are derived, never hardcoded.** The group headers on `/smaller-things`, the case-study count on `/work` and the homepage's "N independent products / N of them live" all read from the content collection, so one `status` change updates every surface at once.

**Grouping depends on the `status` prefix.** `Live` puts a product in the live group; `Personal project` puts it in the personal group; anything else (`Beta`, `In development`, `Private pilot`) lands in the in-build group. Keep the prefix conventional when adding an entry.

**Two content rules on `/lab`:** no port numbers, hostnames or internal IPs, and no tool listed as in-use without install evidence. The source repo documents an *intended* stack next to the running one and does not mark them apart - Continue, Cline, Aider and DaVinci Resolve were all published as in-use before checking, and none of them were. The page carries a dated "stack verified against the lab repo" line; bump it when refreshing.

---

##### `›` LOCAL DEV

```bash
cd site
npm install
npm run dev          # http://localhost:4321
npm run build        # → site/dist/
npm run preview      # serve the build
```

---

##### `›` REGENERATE PDFs

Both the CV and the one-pager are pure HTML, rendered to PDF via headless Chrome.

```bash
# CV - multi-page A4
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="resume/Stewart_Burton_AI_DevOps_Engineer_Resume.pdf" \
  "file:///$(pwd)/resume/source/resume.html"

# One-pager - single A4, no print headers / no margins
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="assets/onepager/Stewart_Burton_AI_DevOps_Engineer_Profile.pdf" \
  --print-to-pdf-no-header --no-margins \
  "file:///$(pwd)/assets/onepager/onepager.html"
```

After regenerating, copy the PDFs into `site/public/resume/` so the live site serves the latest.

---

##### `›` DEPLOY

`.github/workflows/deploy.yml` fires on every push to `main`:

```text
checkout  →  setup-node@20  →  npm ci  →  npm run build  →  upload-pages-artifact  →  deploy-pages
```

Pages source is set to **GitHub Actions** (not legacy branch). CNAME bundled in `site/public/` so the custom domain stays live across deploys. First-run deploy time: ~1m.

---

##### `›` DESIGN SYSTEM

> Dark, restrained, mono accents, single teal accent. Hairline borders only. No shadows. No gradients.

| | |
|---|---|
| Type | `Inter` for body · `JetBrains Mono` for nav, labels, metadata, tech chips |
| Weights | `400 regular` · `500 medium` (no `600+`) |
| Borders | `0.5px` only |
| Accent | `#5eead4` on dark · `#0d9488` on print |
| Casing | sentence case headings · lowercase mono labels |
| Mermaid | themed via `site/src/components/MermaidEnhancer.astro` - matches Shiki's `pre[data-language="mermaid"]` markup |

Tokens defined in `site/tailwind.config.mjs`.

---

##### `›` CONTACT

```
✉  stewart@stewart-burton.com
↗  linkedin.com/in/stewart-burton
↗  github.com/stewartburton
🌐  stewart-burton.com
```

---

##### `›` LICENSE

Code: [`MIT`](LICENSE). Content (case studies, copy, imagery, CVs) © Stewart Burton - please don't copy it for your own portfolio.

<div align="center">
<sub>© Stewart Burton · Cape Town, South Africa</sub>
</div>
