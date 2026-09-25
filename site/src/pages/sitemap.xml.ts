import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getLabVersions } from '../lib/lab';

const ORIGIN = 'https://www.stewart-burton.com';

// Top-level pages are discovered from the file tree, so a new page needs no edit here.
const flatPages = Object.keys(import.meta.glob('./*.astro'));
const dirPages = Object.keys(import.meta.glob('./*/index.astro'));

export const GET: APIRoute = async () => {
  const paths = new Set<string>(['/']);
  for (const f of flatPages) {
    const name = f.replace('./', '').replace('.astro', '');
    if (name !== 'index') paths.add(`/${name}/`);
  }
  for (const f of dirPages) paths.add(`/${f.split('/')[1]}/`);

  for (const w of await getCollection('work')) paths.add(`/work/${w.slug}/`);

  // /lab/ is the newest version; its /lab/vN/ twin is canonicalised to it, so only archived
  // versions get their own entry.
  for (const v of await getLabVersions()) if (!v.isCurrent) paths.add(v.path);

  const body = [...paths]
    .sort()
    .map((p) => `  <url>\n    <loc>${ORIGIN}${p}</loc>\n  </url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
