import type { HeroProps } from "@utils/content/hero";

/**
 * Mock hero data for development
 * Replace with your actual bio and links
 */
export const mockHero: HeroProps = {
  headline: "Annie Ehler",
  tagline: "Software Engineer",
  bio: `Hi, I'm Annie! I'm a software engineer who loves building
beautiful, performant web applications. I specialize in frontend
architecture, design systems, and developer experience.

Currently focused on: TypeScript, React, and making the web
a little more delightful, one component at a time.`,
  competencies: [
    // Languages
    { name: "TypeScript", category: "languages" },
    { name: "JavaScript", category: "languages" },
    { name: "Python", category: "languages" },
    { name: "Rust", category: "languages" },

    // Frameworks
    { name: "React", category: "frameworks" },
    { name: "Astro", category: "frameworks" },
    { name: "Svelte", category: "frameworks" },
    { name: "Node.js", category: "frameworks" },

    // Tools
    { name: "Git", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "PostgreSQL", category: "tools" },
    { name: "Figma", category: "tools" },

    // Practices
    { name: "System Design", category: "practices" },
    { name: "CI/CD", category: "practices" },
    { name: "Testing", category: "practices" },
    { name: "A11y", category: "practices" },
  ],
  socialLinks: [
    {
      label: "GitHub",
      platform: "github",
      url: "https://github.com/annieehler",
    },
    {
      label: "LinkedIn",
      platform: "linkedin",
      url: "https://linkedin.com/in/annieehler",
    },
    {
      label: "Email",
      platform: "email",
      url: "mailto:hello@annieehler.com",
    },
  ],
  resumeUrl: "/resume.pdf",
};
