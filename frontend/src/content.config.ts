import { rssSchema } from "@astrojs/rss";
import { z } from "astro/zod";

const blogSchema = rssSchema.extend({
  content: z.array(z.string()),
  slug: z.string(),
  pubDate: z.string(),
});

export type BlogPost = z.infer<typeof blogSchema>;
