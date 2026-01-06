import type { ProjectProps } from "@utils/content/project";

/**
 * Mock projects for development
 * Replace with your actual projects
 */
export const mockProjects: ProjectProps[] = [
  {
    title: "Portfolio Website",
    description:
      "Personal portfolio built with Astro and Strapi, featuring a System 8.0-inspired retro UI design.",
    link: "/",
    tags: [
      { name: "Astro", slug: "astro" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind", slug: "tailwind" },
    ],
    problem:
      "Needed a portfolio that stands out while showcasing technical skills and personality.",
    constraints: [
      "Must be fast and accessible",
      "Should work without JavaScript for core content",
      "Need to support dark mode",
      "Content should be CMS-driven for easy updates",
    ],
    approach:
      "Built with Astro for static generation and optimal performance. Used Strapi as a headless CMS for content management. Designed a retro UI inspired by Apple's System 8.0 to create a memorable experience.",
    result:
      "A unique, fast-loading portfolio that gets compliments on its design. Perfect Lighthouse scores and works great on all devices.",
    codeUrl: "https://github.com/annieehler/portfolio",
    liveUrl: "https://annieehler.com",
    projectStatus: "completed",
    featured: true,
  },
  {
    title: "Design System",
    description:
      "A comprehensive design system with React components, design tokens, and documentation.",
    link: "#",
    tags: [
      { name: "React", slug: "react" },
      { name: "Storybook", slug: "storybook" },
      { name: "Design Systems", slug: "design-systems" },
    ],
    problem:
      "Multiple product teams were building inconsistent UIs with duplicated effort.",
    constraints: [
      "Support 5+ product teams with different needs",
      "Must work with existing codebases",
      "Needs comprehensive documentation",
      "Should be tree-shakeable for bundle size",
    ],
    approach:
      "Created a token-based design system with React components. Used Storybook for documentation and visual testing. Implemented CSS-in-JS with theme support.",
    result:
      "Reduced UI development time by 40%. Achieved consistent look across all products. Design system is now used by 50+ developers.",
    codeUrl: "https://github.com/example/design-system",
    projectStatus: "completed",
    featured: true,
  },
  {
    title: "Real-time Dashboard",
    description:
      "Analytics dashboard with real-time data visualization and alerting.",
    link: "#",
    tags: [
      { name: "Vue.js", slug: "vuejs" },
      { name: "WebSocket", slug: "websocket" },
      { name: "D3.js", slug: "d3js" },
    ],
    problem: "Team needed real-time visibility into system metrics and alerts.",
    approach:
      "Built with Vue.js and D3.js for interactive visualizations. Used WebSockets for real-time updates. Implemented custom alerting rules.",
    result:
      "Reduced incident response time by 60%. Dashboard handles 10K+ data points per second.",
    projectStatus: "completed",
  },
];
