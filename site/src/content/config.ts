import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.enum(['enterprise', 'open-source', 'product']),
    status: z.string(),
    order: z.number(),
    summary: z.string(),
    stack: z.array(z.string()),
    role: z.string().optional(),
    liveUrl: z.string().url().nullable().optional(),
    repoUrl: z.string().url().nullable().optional(),
    why: z.string(),
  }),
});

// One file per lab version (v1.yaml, v2.yaml, ...). See src/content/lab/README.md.
const labBlock = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('facts'),
    items: z.array(z.object({ k: z.string(), v: z.string() })),
  }),
  z.object({
    type: z.literal('numbered'),
    items: z.array(z.object({ h: z.string(), p: z.string() })),
  }),
  z.object({
    type: z.literal('cards'),
    title: z.string().optional(),
    items: z.array(z.object({ label: z.string(), text: z.string() })),
  }),
  z.object({
    type: z.literal('table'),
    title: z.string().optional(),
    columns: z.array(
      z.object({
        head: z.string().optional(),
        style: z.enum([
          'primary',
          'primary-mono',
          'secondary',
          'secondary-nowrap',
          'body-mono',
          'route',
          'meta',
        ]),
      }),
    ),
    rows: z.array(z.array(z.string())),
  }),
  z.object({ type: z.literal('callout'), label: z.string(), text: z.string() }),
  z.object({ type: z.literal('prose'), text: z.string() }),
  z.object({
    type: z.literal('chips'),
    label: z.string(),
    items: z.array(z.string()),
  }),
  z.object({
    type: z.literal('linkcards'),
    items: z.array(
      z.object({ title: z.string(), href: z.string(), text: z.string(), cta: z.string() }),
    ),
  }),
  z.object({
    type: z.literal('links'),
    items: z.array(
      z.object({ label: z.string(), href: z.string(), tone: z.enum(['accent', 'primary']) }),
    ),
  }),
]);

const lab = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/lab' }),
  schema: z.object({
    version: z.number().int().positive(),
    label: z.string(),
    asOf: z.string(),
    summary: z.string(),
    title: z.string(),
    description: z.string(),
    eyebrow: z.string(),
    // [text before, accent phrase, text after]
    heading: z.tuple([z.string(), z.string(), z.string()]),
    lead: z.string(),
    stats: z.array(z.object({ label: z.string(), value: z.string(), note: z.string() })),
    stamp: z.string(),
    archiveNote: z.string().optional(),
    diagram: z.object({
      label: z.string(),
      heading: z.string(),
      intro: z.string(),
      alt: z.string(),
    }),
    sections: z.array(
      z.object({
        label: z.string(),
        layout: z.enum(['split', 'stacked']).default('split'),
        heading: z.string(),
        intro: z.string().optional(),
        blocks: z.array(labBlock),
      }),
    ),
  }),
});

export const collections = { work, lab };
