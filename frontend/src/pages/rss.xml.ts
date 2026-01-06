import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { fetchMeta } from "@utils/content/meta";
import { fetchBlogPosts } from "@utils/content/blog";

export const GET: APIRoute = async ({ site }) => {
  const siteMeta = await fetchMeta();
  const posts = await fetchBlogPosts();

  const items = [...posts]
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .map((post) => {
      const link = `${site}/blog/${post.slug}`;
      const description = post.excerpt ?? `${post.title} by ${siteMeta.name}`;
      return {
        title: post.title,
        description,
        pubDate: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        link,
      };
    });

  return rss({
    title: siteMeta.title,
    description: siteMeta.tagline,
    site: site!,
    items,
    customData: `<language>en-us</language>`,
  });
};
