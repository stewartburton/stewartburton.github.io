# Claude Prompting Guide — Stewart Burton (DevOps • AI & Automation)
## Customized for stewart-burton.com website development

> This guide is tuned for **stewart-burton.com** development: GitHub Pages, Jekyll/Hugo/Static Site, responsive design, professional portfolio, and modern web standards. Copy/paste the prompt snippets as-is and swap placeholders like `<section>`, `<content>`, `<feature>`.

---

## My default website prompt skeleton (use this first)

```prompt
**Role**: You are a senior web developer + UX designer specializing in professional portfolio websites.

**Context**:  
- Site: stewart-burton.com (GitHub Pages: stewartburton/stewartburton.github.io)
- Stack: Static site generator, HTML5/CSS3/JavaScript, responsive design, fast loading
- Target: Cape Town recruiters, UK/EU remote hiring managers, DevOps professionals, mobile-first
- Brand: Professional, work-life balance focused, hybrid/remote specialist, technical credibility
- Constraints: GitHub Pages compatible, minimal dependencies, fast load times, mobile-optimized

**Goal**: <one sentence outcome I want for the website>

**Inputs**: <current pages, content, or design requirements>

**Output** (choose all that apply):
- [ ] Responsive HTML/CSS/JS components
- [ ] Content strategy and copy
- [ ] SEO optimization plan
- [ ] Performance optimization
- [ ] Accessibility compliance
- [ ] GitHub Pages deployment workflow

**Quality bar**:
- Mobile-first responsive design (iPhone 14 Pro priority)
- Lighthouse score 95+ on all metrics
- Professional DevOps industry tone
- Fast loading (<2s), minimal JS dependencies
- SEO-optimized for "DevOps Cape Town", "remote DevOps UK", "hybrid SRE South Africa"

**Next action**: After delivering, propose 2 website improvements.
```

Why this works: it loads your website context, technical constraints, and professional positioning so Claude's output aligns with your portfolio goals.

---

## Website-specific tips (customized for stewart-burton.com)

### 1) Be clear about website goals
Bad:
```prompt
"Improve my website."
```

Good:
```prompt
Enhance the hero section of stewart-burton.com to position for hybrid DevOps/SRE roles in Cape Town or fully remote UK/EU positions. Current hero is basic - need:
1) Compelling headline emphasizing work-life balance + infrastructure automation expertise
2) 3 key value props with icons (Hybrid flexibility, Technical excellence, Business impact)
3) Location flexibility statement: "Cape Town-based • Open to hybrid CT roles • Remote UK/EU within UTC+2 timezone"
4) CTA button to "Explore how I can help your team" 
4) Subtle animation on scroll
5) Mobile-first responsive (iPhone 14 Pro)
Include HTML/CSS/JS and explain the psychology behind the layout choices.
```

### 2) Use examples (portfolio context)
Bad:
```prompt
"Write about my experience."
```

Good:
```prompt
Write professional copy for my "Experience" section. Keep tone: confident, results-focused, ZA/UK context. Example I liked from another portfolio:

"Led infrastructure modernization reducing deployment time by 78% and saving £120k annually through automated CI/CD pipelines."

Now create 4 similar bullet points for:
- Azure DevOps → GitHub migration enabling hybrid work efficiency
- PowerShell automation improving work-life balance through reduced on-call
- Docker/Kubernetes observability reducing after-hours incidents
- Infrastructure automation enabling flexible working arrangements
Focus on work-life balance benefits alongside business impact.
```

### 3) Think through user journey
Bad:
```prompt
"Add a contact form."
```

Good:
```prompt
Think step-by-step for a contact workflow:
1) Analyze visitor intent (recruiter vs potential client vs networking)
2) Design a multi-path contact section (Quick chat, Project inquiry, Recruitment)
3) Create forms with appropriate fields for each path
4) Add validation, success states, and follow-up automation
5) Ensure GDPR/POPIA compliance for ZA/UK visitors
6) Include clear response time expectations

Provide HTML forms, CSS styling, JavaScript validation, and GitHub Pages-compatible backend options.
```

### 4) Iterate with website context
Bad:
```prompt
"Make it more professional."
```

Good:
```prompt
Great start on the portfolio section. Please adjust:
- Tone: more confident, quantify impact with specific metrics
- Visual: add project thumbnails with hover effects
- Tech stack: emphasize automation and cloud-native tools
- Case studies: follow this structure: Challenge → Solution → Results (with numbers)
- Call-to-action: "Discuss your infrastructure challenges" vs generic "Contact me"
Keep the loading speed under 2s and ensure mobile responsiveness.
```

### 5) Leverage web best practices
Bad:
```prompt
"Make it load faster."
```

Good:
```prompt
Optimize stewart-burton.com for Core Web Vitals and mobile performance:
- Audit current images and suggest WebP conversions with fallbacks
- Implement lazy loading for below-fold content
- Minify and compress CSS/JS 
- Add critical CSS inlining for hero section
- Create a service worker for offline functionality
- Implement preloading for key resources
Provide before/after Lighthouse audit expectations and GitHub Actions workflow for automated optimization.
```

### 6) Professional positioning
Bad:
```prompt
"Help with my bio."
```

Good:
```prompt
Act as a personal branding consultant for DevOps professionals seeking hybrid Cape Town or remote UK/EU roles. Review my current bio and rewrite to position me for senior opportunities with excellent work-life balance. Emphasize:
- Timezone compatibility (UTC+2 overlaps perfectly with UK business hours)
- Hybrid/remote work expertise and preference
- Infrastructure that enables flexible working
- Team collaboration across distributed environments
- Sustainable operations reducing after-hours incidents
- Cultural fit for progressive, work-life balance focused companies

Target audience: Progressive engineering managers and forward-thinking recruiters. Tone: confident but emphasizing balance and sustainability. Length: 150-200 words for website hero, plus a longer 400-word version for the About page.
```

---

## Website-specific task recipes

### A) Content Strategy & SEO

**Homepage optimization**
```prompt
Optimize stewart-burton.com homepage for search intent "hybrid DevOps jobs Cape Town", "remote SRE UK South Africa timezone", "work life balance DevOps". Create:
1) Meta title and description emphasizing location flexibility
2) H1 and H2 structure with hybrid/remote keywords
3) Hero section copy highlighting timezone compatibility (UTC+2) and hybrid preferences
4) Schema.org markup for professional person with location flexibility
5) Internal linking strategy for work-life balance content
Include content that ranks for: "DevOps Cape Town hybrid", "remote SRE UK timezone", "infrastructure automation work life balance"
```

**Case studies structure**
```prompt
Design a case study template for DevOps projects that converts visitors to leads:
- Hero image + project summary (30 seconds to scan)
- Challenge/Solution/Results format with metrics
- Technical stack badges/icons
- Client testimonial section (anonymized)
- "Similar challenges?" CTA
- Related projects carousel
Provide HTML template + sample content for an Azure→GitHub migration project.
```

### B) Technical Implementation

**GitHub Pages deployment**
```prompt
Create a GitHub Actions workflow for stewart-burton.com that:
- Builds static site (detect Jekyll/Hugo/vanilla HTML)
- Optimizes images (WebP conversion, compression)
- Minifies CSS/JS, inlines critical CSS
- Runs Lighthouse CI and fails on score <90
- Deploys to GitHub Pages
- Updates sitemap and feeds
- Sends Slack notification on deployment
Include: workflow file + local development setup + troubleshooting guide.
```

**Progressive Web App features**
```prompt
Convert stewart-burton.com into a lightweight PWA:
- Service worker for offline portfolio viewing
- Web app manifest for "Add to Home Screen"
- Push notifications for blog updates (if applicable)
- Offline-first contact form with sync when online
- Performance budgets and monitoring
Keep it minimal - enhance existing site without complexity. Provide implementation steps + testing checklist.
```

### C) Portfolio Enhancement

**Interactive project showcase**
```prompt
Create an interactive project gallery for my DevOps work:
- Filter by: Technology (PowerShell, Docker, GitHub), Impact (Cost, Speed, Reliability)
- Card layout with hover animations revealing tech stack
- "Deep dive" modal with detailed case study
- Mobile-friendly carousel for small screens
- Load projects from JSON data file
Provide: HTML structure, CSS animations, JavaScript functionality, sample project data schema.
```

**Skills visualization**
```prompt
Design a modern skills section that shows technical depth without looking like a typical resume:
- Technology categories: Infrastructure, Automation, Monitoring, Cloud
- Proficiency levels shown through interactive elements (not boring progress bars)
- "Recently used" vs "Core expertise" indicators
- Hover states showing relevant projects/experience
- Responsive grid layout
Focus on technologies that matter for senior DevOps roles in 2025.
```

### D) Performance & Analytics

**Core Web Vitals optimization**
```prompt
Audit stewart-burton.com for Core Web Vitals and create an optimization plan:
1) Current performance baseline estimation
2) Image optimization strategy (formats, lazy loading, responsive images)
3) JavaScript bundle analysis and code splitting recommendations
4) CSS optimization (critical path, unused CSS removal)
5) Hosting optimization for GitHub Pages
6) Monitoring setup with free tools
Provide specific code changes and implementation priority order.
```

**Analytics and conversion tracking**
```prompt
Set up privacy-friendly analytics for stewart-burton.com to track:
- Visitor flow: Homepage → About → Projects → Contact
- Key conversions: Contact form submissions, CV downloads, project deep dives
- Traffic sources: Direct, LinkedIn, GitHub, search
- Geographic data (ZA vs UK vs other)
- Page load performance in real-time
Recommend tools (Google Analytics 4 vs alternatives), implementation code, and dashboard setup. Ensure GDPR/POPIA compliance.
```

---

## Content-specific recipes

### A) Professional Copywriting

**Value proposition development**
```prompt
Craft a compelling value proposition for DevOps/SRE professional seeking hybrid Cape Town or remote UK/EU roles:
- Lead with work-life balance: sustainable infrastructure, reduced on-call burden
- Address hiring manager concerns: timezone alignment (UTC+2 perfect for UK), proven remote collaboration
- Differentiate: "Hybrid-first mindset" - builds systems that support flexible working
- Location flexibility: "Cape Town local for hybrid opportunities, remote-ready for UK/EU teams"
- Include social proof elements emphasizing team happiness and retention
Test multiple versions: flexibility-focused vs stability-focused vs efficiency-focused. Provide A/B testing framework.
```

**Technical blog content**
```prompt
Write a 1500-word blog post: "Migrating 200+ Azure DevOps Repositories to GitHub: Lessons Learned"
Structure:
- Hook: Common migration disasters and how to avoid them
- The challenge: Scale, complexity, team adoption
- Solution approach: Tooling, phased approach, change management
- Results: Metrics on speed, adoption, issues resolved
- Actionable takeaways for other teams
Include code snippets, decision trees, and downloadable migration checklist. Optimize for search terms: "azure devops github migration enterprise".
```

### B) UI/UX for Professional Sites

**Contact section optimization**
```prompt
Design a high-converting contact section for DevOps professional seeking hybrid Cape Town or remote UK/EU roles:
- Multiple contact paths: Cape Town hybrid opportunity, Remote UK/EU role, Consulting project
- Pre-qualifying questions about work arrangement preferences and timezone requirements
- Clear availability statement: "UTC+2 timezone, ideal overlap with UK/EU business hours"
- Response time expectations with timezone consideration
- Work-life balance statement: "Committed to sustainable operations and healthy team dynamics"
- Alternative contact methods: LinkedIn, email, calendar booking with timezone selection
- GDPR/POPIA compliant data collection
Provide HTML forms, validation, styling, and conversion optimization for location-flexible positioning.
```

**Mobile-first navigation**
```prompt
Create a mobile-first navigation for stewart-burton.com that works on iPhone 14 Pro:
- Hamburger menu with smooth animations
- Quick access to: Home, About, Projects, Blog, Contact
- Secondary menu: CV download, LinkedIn, GitHub
- Search functionality for blog/projects
- Breadcrumbs for deeper pages
- Accessibility compliance (screen readers, keyboard nav)
Include CSS transitions, JavaScript functionality, and fallbacks for older browsers.
```

---

## Website maintenance & growth recipes

### A) Content Management

**Blog content calendar**
```prompt
Create a 6-month blog content calendar for DevOps professional targeting hybrid Cape Town and remote UK/EU opportunities:
- 2 posts/month mixing work-life balance with technical excellence
- Keywords: "hybrid devops cape town", "remote SRE UK timezone", "work life balance infrastructure", "sustainable operations"
- Content types: Hybrid work tutorials, timezone collaboration guides, sustainable architecture, tooling for distributed teams
- Topics: "Building Infrastructure for Hybrid Teams", "UTC+2 Advantage for UK Remote Work", "Reducing On-Call Burden"
- Social media promotion strategy for LinkedIn targeting Cape Town and UK DevOps communities
Provide: Content titles, outlines, keyword targets, publishing schedule, promotion checklist focusing on work-life balance messaging.
```

**SEO monitoring and improvement**
```prompt
Set up ongoing SEO monitoring for stewart-burton.com:
- Track rankings for: "hybrid devops cape town", "remote SRE UK timezone", "devops work life balance", "infrastructure engineer south africa"
- Monitor Core Web Vitals monthly
- Content gap analysis vs competitors positioning for hybrid/remote work
- Backlink opportunities in Cape Town tech community and UK remote work networks
- Technical SEO checklist (monthly audit)
Provide: Free tool recommendations, automation scripts, improvement workflow, success metrics for hybrid/remote positioning.
```

### B) Professional Growth Integration

**Portfolio project documentation**
```prompt
Create a template for documenting new projects on stewart-burton.com:
- Project brief and business context
- Technical challenges and constraints
- Solution architecture with diagrams
- Implementation approach and timeline
- Results and metrics (before/after)
- Technologies used and why
- Lessons learned and future improvements
- Client testimonial integration
Format for quick website updates + detailed case study versions. Include photography/screenshot guidelines.
```

**Skills and certifications showcase**
```prompt
Design a dynamic skills section that grows with my career:
- Current certifications with expiry tracking
- In-progress learning (courses, certifications)
- Skill evolution timeline
- Technology adoption curve (early adopter vs mainstream)
- Conference talks and community contributions
- Open source contributions visualization
Auto-update from GitHub activity, LinkedIn API, certification providers. Provide implementation plan + maintenance workflow.
```

---

## Emergency website fixes (quick wins)

**Quick performance boost**
```prompt
Provide 5 immediate performance improvements for stewart-burton.com that take <30 minutes each:
1) Image optimization commands and workflow
2) CSS/JS minification setup
3) Caching headers for GitHub Pages
4) Font loading optimization
5) Third-party script audit and cleanup
Include before/after metrics expectations and testing commands.
```

**Mobile responsiveness check**
```prompt
Create a mobile audit checklist for stewart-burton.com:
- Navigation usability on iPhone/Android
- Touch target sizes and spacing
- Text readability without zooming
- Form completion ease
- Page load speed on 3G
- Portrait/landscape orientation handling
Provide testing workflow + common fixes for professional portfolio sites.
```

---

## Reusable website mini-templates

**GitHub Pages deployment**
```prompt
First create a deployment plan for GitHub Pages. Wait for my "go" signal. Then implement with:
- Build workflow configuration
- Custom domain setup (stewart-burton.com)
- SSL certificate configuration
- Deployment testing checklist
- Rollback procedure
```

**Website copy review**
```prompt
Review website copy for professional positioning:
- Headlines for clarity and impact
- Value propositions for differentiation
- Call-to-actions for conversion
- Technical content for accessibility
- Overall tone for UK market fit
Return specific edits with rationale.
```

**Feature implementation**
```prompt
Return **only** valid JSON for website feature specification:
{
  "feature_name": "string",
  "user_story": "string",
  "acceptance_criteria": ["string"],
  "technical_approach": "string",
  "files_to_modify": [{"path":"string","changes":"string"}],
  "testing_checklist": ["string"],
  "performance_impact": "string"
}
```

**Accessibility audit**
```prompt
Given this page section, create WCAG 2.1 AA compliance improvements:
- Color contrast ratios
- Keyboard navigation flow
- Screen reader optimization
- Alt text for images
- Form labeling and validation
- Focus indicators
Include testing tools and validation steps.
```

---

## Good vs Bad examples (website context)

### Example 1 — Portfolio Project Page

Bad:
```prompt
"Create a project page."
```

Good:
```prompt
Create a case study page for "Enterprise GitHub Migration" project:
- Hero: Problem statement + visual impact (before/after metrics)
- Challenge: 200+ repos, 12 teams, zero downtime requirement
- Solution: 3-phase approach with diagrams and tech stack
- Results: 78% faster deployments, £120k annual savings, 95% team adoption
- Technical details: Expandable sections for implementation specifics
- Client testimonial with photo/logo
- Next project CTA: "Ready to modernize your development workflow?"
Mobile-optimized, fast loading, professional photography suggestions included.
```

### Example 2 — Blog Implementation

Bad:
```prompt
"Add a blog."
```

Good:
```prompt
Implement a blog system for stewart-burton.com using GitHub Pages:
- Article structure: Technical tutorials + industry insights
- Categories: Automation, Migration, Best Practices, Tools
- SEO optimization for DevOps keywords
- Social sharing integration
- Related posts algorithm
- RSS feed generation
- Comment system (GitHub issues integration)
- Reading time estimates
- Search functionality
Include: Markdown templates, styling, navigation integration, and content governance workflow.
```

---

## Website maintenance recipes

### A) Regular Updates

**Monthly website health check**
```prompt
Create a monthly website maintenance checklist for stewart-burton.com:
- Performance monitoring (Lighthouse scores)
- Broken link detection and fixes
- Content freshness audit (outdated tech, old projects)
- Security headers and dependency updates
- SEO ranking changes and opportunities
- Contact form functionality
- Mobile experience testing
- Analytics review and insights
Provide automation scripts where possible and manual testing procedures.
```

**Content refresh strategy**
```prompt
Design a quarterly content update process:
- Project portfolio additions/updates
- Skills section refresh with new technologies
- Blog content calendar planning
- Industry trends integration
- Client testimonials collection
- CV/resume synchronization
- Social media content repurposing
Include templates for each content type and approval workflow.
```

### B) Growth & Optimization

**Conversion rate optimization**
```prompt
Analyze stewart-burton.com conversion funnel and suggest improvements:
1) Landing page effectiveness for different traffic sources
2) Navigation flow optimization
3) Contact form placement and design
4) Trust signals and social proof positioning
5) Mobile conversion barriers
6) Page load impact on conversions
Provide A/B testing framework, implementation code, and measurement plan.
```

**Professional networking integration**
```prompt
Integrate professional networking touchpoints throughout stewart-burton.com:
- LinkedIn profile synchronization
- GitHub activity showcase
- Speaking engagements and conferences
- Community contributions and articles
- Professional recommendations display
- Industry network visualization
- Newsletter signup with value proposition
Create automated content syndication where possible + manual update workflows.
```

---

## Emergency website scenarios

**Quick fixes for live site issues**
```prompt
Provide immediate fixes for common stewart-burton.com issues:
1) Broken mobile layout on iOS Safari
2) Contact form not submitting
3) Slow loading on mobile networks
4) Accessibility compliance failure
5) SEO ranking drop investigation
Each fix should take <15 minutes and include testing steps.
```

**Recruiter-ready optimization**
```prompt
Optimize stewart-burton.com for recruiter visits in next 24 hours:
- Clear value proposition above the fold
- Easy CV download with tracking
- Contact information prominence
- Project results quantification
- Professional headshot and credibility signals
- Mobile-friendly recruiter workflow
- LinkedIn integration for easy connecting
Provide priority order and implementation time estimates.
```

---

## Final website-specific notes

- **Mobile-first always**: Test on iPhone 14 Pro first, then scale up
- **Professional positioning**: Target DevOps roles in South African or UK market
- **Performance obsessed**: Sub-2s load times, 95+ Lighthouse scores
- **Conversion focused**: Every page should have a clear next step
- **GitHub Pages constraints**: Static site generators, no server-side processing
- **Personal brand consistency**: Professional, technical, results-driven
- **Location flexibility**: Cape Town hybrid preferred, remote UK/EU within UTC+2 ±3 hours
- **Work-life balance priority**: Sustainable operations, reduced on-call, healthy team dynamics
- **Timezone advantage**: UTC+2 perfect for UK business hours overlap
- **Hybrid expertise**: Building systems that support flexible working arrangements

**Repository Integration**
- Save prompts in `/prompts/` directory in stewartburton.github.io
- Use GitHub Issues for website feature requests and bugs
- Tag releases for major website updates
- Document all customizations in repository README

---

## Quick reference commands

**Local development:**
```bash
# Serve locally (Jekyll)
bundle exec jekyll serve --host 0.0.0.0 --port 4000

# Build for production
bundle exec jekyll build

# Test mobile responsive
# Use browser dev tools device simulation
```

**Performance testing:**
```bash
# Lighthouse CLI
npx lighthouse https://stewart-burton.com --output=json --output-path=./lighthouse-report.json

# Web Vitals testing
npx web-vitals-cli https://stewart-burton.com
```

Remember: **Short, surgical prompts** with website context, clear outcomes, and mobile-first thinking. When in doubt, add: "If this affects site performance or mobile experience, flag it immediately."