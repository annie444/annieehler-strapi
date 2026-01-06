import type { BlogPostProps } from "@utils/content/blog";

/**
 * Mock blog posts for development
 * Replace with your actual blog content
 */
export const mockBlogPosts: BlogPostProps[] = [
  {
    id: "1",
    slug: "streaming-architecture-patterns",
    title: "Streaming Architecture Patterns",
    excerpt:
      "Exploring modern streaming architecture patterns for scalable applications. From event sourcing to CQRS, here's what I've learned building real-time systems.",
    publishedAt: "2024-05-15",
    tags: [
      { name: "Architecture", slug: "architecture" },
      { name: "Systems Design", slug: "systems-design" },
    ],
    readingTime: 8,
    featured: true,
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "When building systems that need to process data in real-time, choosing the right architecture is crucial. In this post, I'll walk through three patterns I've used in production.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [{ type: "text", text: "Event Sourcing" }],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Event sourcing is a pattern where state changes are stored as a sequence of events. Instead of storing just the current state, you store every change that led to that state.",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    slug: "improving-developer-experience",
    title: "Improving Developer Experience",
    excerpt:
      "Tips and tricks to enhance the developer experience in your projects. Good DX isn't a luxury—it's a multiplier for team productivity.",
    publishedAt: "2024-04-10",
    tags: [
      { name: "DX", slug: "dx" },
      { name: "Tooling", slug: "tooling" },
    ],
    readingTime: 5,
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Developer experience (DX) is the sum of all interactions a developer has with your codebase, tools, and documentation. Here's how to make it better.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    slug: "colorful-experiments-with-css",
    title: "Colorful Experiments with CSS",
    excerpt:
      "A dive into creative CSS techniques for vibrant web designs. Exploring OKLCH, color spaces, and perceptual uniformity.",
    publishedAt: "2024-03-22",
    tags: [
      { name: "CSS", slug: "css" },
      { name: "Design", slug: "design" },
    ],
    readingTime: 6,
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Color on the web is more complex than it seems. Let's explore how modern color spaces like OKLCH can help us create more vibrant and accessible designs.",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    slug: "lessons-from-a-failed-project",
    title: "Lessons from a Failed Project",
    excerpt:
      "A postmortem on a project that didn't go as planned. Sometimes the best lessons come from failure.",
    publishedAt: "2024-02-08",
    tags: [
      { name: "Postmortem", slug: "postmortem" },
      { name: "Career", slug: "career" },
    ],
    readingTime: 7,
  },
  {
    id: "5",
    slug: "building-a-design-system",
    title: "Building a Design System from Scratch",
    excerpt:
      "How I built a design system that scaled from one product to five. Tokens, components, and the lessons learned along the way.",
    publishedAt: "2024-01-15",
    tags: [
      { name: "Design Systems", slug: "design-systems" },
      { name: "React", slug: "react" },
    ],
    readingTime: 12,
    featured: true,
  },
  {
    id: "6",
    slug: "typescript-tricks",
    title: "TypeScript Tricks I Wish I Knew Sooner",
    excerpt:
      "Advanced TypeScript patterns that will level up your type safety game. From conditional types to template literals.",
    publishedAt: "2023-12-01",
    tags: [
      { name: "TypeScript", slug: "typescript" },
      { name: "JavaScript", slug: "javascript" },
    ],
    readingTime: 10,
  },
];
