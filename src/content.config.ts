import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  destination: z.string().optional(),
});

const go = defineCollection({
  loader: glob({ base: './src/content/go', pattern: '**/*.{md,mdx}' }),
  schema: postSchema,
});

const eatDrink = defineCollection({
  loader: glob({ base: './src/content/eat-drink', pattern: '**/*.{md,mdx}' }),
  schema: postSchema,
});

const live = defineCollection({
  loader: glob({ base: './src/content/live', pattern: '**/*.{md,mdx}' }),
  schema: postSchema,
});

const think = defineCollection({
  loader: glob({ base: './src/content/think', pattern: '**/*.{md,mdx}' }),
  schema: postSchema,
});

export const collections = { go, 'eat-drink': eatDrink, live, think };
