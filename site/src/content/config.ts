import { defineCollection, z } from 'astro:content';

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

export const collections = { work };
