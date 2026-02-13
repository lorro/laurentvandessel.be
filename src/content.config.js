import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100),
      description: z.string().max(200),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      featured: z.boolean().default(false),
      locale: z.enum(['en', 'es', 'fr']).default('en'),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedAt: z.coerce.date().optional(),
    locale: z.enum(['en', 'es', 'fr']).default('en'),
  }),
});

export const collections = { blog, pages };
