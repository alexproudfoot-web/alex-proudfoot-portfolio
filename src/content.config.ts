import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// A still photograph. One markdown file per image.
const stills = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stills" }),
  schema: ({ image }) =>
    z.object({
      // Leave title/place/year off and the wall label is skipped.
      title: z.string().optional(),
      place: z.string().optional(),
      year: z.number().optional(),
      // Path relative to this markdown file, e.g. ../../assets/images/still-01.jpg
      image: image(),
      // Always write this. It is read aloud by screen readers.
      alt: z.string(),
      // Controls how much room the frame takes in the grid.
      span: z.enum(["standard", "wide", "tall"]).default("standard"),
      // Lower numbers come first. Your strongest work should be 1.
      order: z.number().default(99),
      // Set true to show it as the single piece on the home page.
      hero: z.boolean().default(false),
      // Print details, shown on the wall label when available is true.
      print: z
        .object({
          available: z.boolean().default(false),
          process: z.string().default("Archival pigment print"),
          edition: z.string().optional(),
          sizes: z.string().optional(),
          priceFrom: z.string().optional(),
          // Stripe Payment Link or Shopify buy link.
          buyUrl: z.string().url().optional(),
        })
        .default({ available: false, process: "Archival pigment print" }),
    }),
});

// A film or motion piece. Hosted on Vimeo or Mux, never self-hosted.
const films = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/films" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string().optional(),
      year: z.number(),
      runtime: z.string().optional(),
      role: z.string().optional(),
      // Full embed URL. Vimeo: https://player.vimeo.com/video/000000000
      embedUrl: z.string().url(),
      poster: image(),
      alt: z.string(),
      order: z.number().default(99),
    }),
});

export const collections = { stills, films };
