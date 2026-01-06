import type { ExperienceProps } from "@utils/content/experience";

/**
 * Mock experience data for development
 * Replace with your actual work history
 */
export const mockExperience: ExperienceProps[] = [
  {
    id: "1",
    company: "Tech Company",
    role: "Senior Software Engineer",
    startDate: "2022-03",
    endDate: undefined, // Present
    location: "San Francisco, CA",
    description:
      "Leading frontend architecture for a high-scale web application. Designing systems that handle millions of daily active users while maintaining sub-second response times.",
    highlights: [
      "Architected a new component library used across 5 product teams",
      "Reduced bundle size by 40% through code splitting and lazy loading",
      "Mentored 3 junior engineers on frontend best practices",
    ],
    technologies: [
      { name: "TypeScript", slug: "typescript" },
      { name: "React", slug: "react" },
      { name: "Node.js", slug: "nodejs" },
    ],
    link: "https://example.com",
  },
  {
    id: "2",
    company: "Startup Inc",
    role: "Full Stack Developer",
    startDate: "2020-06",
    endDate: "2022-02",
    location: "Remote",
    description:
      "Built and scaled the core product from MVP to production. Wore many hats in a fast-paced startup environment.",
    highlights: [
      "Implemented real-time collaboration features using WebSockets",
      "Designed and built the CI/CD pipeline from scratch",
      "Grew the engineering team from 2 to 8 developers",
    ],
    technologies: [
      { name: "Python", slug: "python" },
      { name: "Vue.js", slug: "vuejs" },
      { name: "PostgreSQL", slug: "postgresql" },
    ],
  },
  {
    id: "3",
    company: "Agency Creative",
    role: "Frontend Developer",
    startDate: "2018-09",
    endDate: "2020-05",
    location: "New York, NY",
    description:
      "Delivered pixel-perfect web experiences for Fortune 500 clients. Specialized in animations and interactive experiences.",
    highlights: [
      "Led frontend development for 12+ client projects",
      "Created reusable animation library used across agency projects",
      "Won 2 industry awards for interactive web experiences",
    ],
    technologies: [
      { name: "JavaScript", slug: "javascript" },
      { name: "GSAP", slug: "gsap" },
      { name: "CSS", slug: "css" },
    ],
  },
];
