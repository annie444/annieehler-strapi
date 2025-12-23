import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { fetchMeta } from "@utils/content/meta";

export const GET: APIRoute = async ({ site }) => {
  const siteMeta = await fetchMeta();
  const items = [...posts]
    .sort((a, b) => (b.pubDate as string).localeCompare(a.pubDate as string))
    .map((post) => {
      const link = `${site}/blog/${post.slug}`;
      const description =
        post.description ?? `${post.title} by ${siteMeta.name}`;
      return {
        title: post.title,
        description,
        pubDate: new Date(post.pubDate),
        link,
        content:
          post.content instanceof Array
            ? post.content.join("\n\n")
            : post.content,
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
