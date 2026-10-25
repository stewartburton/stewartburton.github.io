import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://stewart-burton.com',
  redirects: {
    // The lab case study was promoted to a top-level page on 2026-08-08.
    '/work/ai-platform-lab': '/lab',
  },
  integrations: [
    mdx(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
