import { fetchApi } from "@utils/strapi";
import type { Tag, Author, Image } from "@utils/content/shared";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export interface BlogPostProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: BlocksContent;
  publishedAt: string; // ISO date
  updatedAt?: string;
  author?: Author;
  tags: Tag[];
  readingTime?: number; // minutes
  featured?: boolean;
  coverImage?: Image;
}

export interface BlogIndexProps {
  posts: BlogPostProps[];
  tags: Tag[];
  totalCount: number;
}

/**
 * Format a date for display (e.g., "May 15, 2024")
 */
export function formatPublishDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Estimate reading time from text content
 * Assumes average reading speed of 200 words per minute
 */
export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Count words in block content (simplified)
 */
export function countWordsInBlocks(blocks: BlocksContent): number {
  if (!blocks || !Array.isArray(blocks)) return 0;

  let wordCount = 0;

  const extractText = (node: unknown): void => {
    if (!node || typeof node !== "object") return;
    const n = node as Record<string, unknown>;

    if (n.type === "text" && typeof n.text === "string") {
      wordCount += n.text.trim().split(/\s+/).filter(Boolean).length;
    }

    if (Array.isArray(n.children)) {
      n.children.forEach(extractText);
    }
  };

  blocks.forEach(extractText);
  return wordCount;
}

/**
 * Fetch all blog posts from Strapi
 */
export async function fetchBlogPosts(): Promise<BlogPostProps[]> {
  const posts = await fetchApi<BlogPostProps[]>({
    endpoint: "blog-posts?populate=*&sort=publishedAt:desc",
    wrappedByKey: "data",
  });
  return posts;
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchBlogPost(
  slug: string,
): Promise<BlogPostProps | null> {
  const posts = await fetchApi<BlogPostProps[]>({
    endpoint: `blog-posts?populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}`,
    wrappedByKey: "data",
  });
  return posts?.[0] ?? null;
}

/**
 * Get all unique tags from blog posts
 */
export async function fetchBlogTags(): Promise<Tag[]> {
  const posts = await fetchBlogPosts();
  const tagMap = new Map<string, Tag>();

  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (!tagMap.has(tag.slug)) {
        tagMap.set(tag.slug, tag);
      }
    });
  });

  return Array.from(tagMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}
