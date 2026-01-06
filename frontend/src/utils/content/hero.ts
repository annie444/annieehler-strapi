import { fetchApi } from "@utils/strapi";
import type { Link } from "@utils/content/shared";

export interface Competency {
  name: string;
  icon?: string; // icon identifier or emoji
  category?: "languages" | "frameworks" | "tools" | "practices";
}

export interface SocialLink extends Link {
  platform: string;
  icon?: string;
}

export interface HeroProps {
  headline: string;
  tagline: string;
  bio: string;
  competencies: Competency[];
  socialLinks: SocialLink[];
  resumeUrl?: string;
}

/**
 * Terminal command definitions for the interactive hero
 */
export interface TerminalCommand {
  name: string;
  description: string;
  output: string | string[];
}

/**
 * Get terminal commands based on hero data
 */
export function getTerminalCommands(hero: HeroProps): TerminalCommand[] {
  const skills: string[] = [];
  const languages = hero.competencies.filter(
    (c) => c.category !== undefined && c.category === "languages",
  );
  const frameworks = hero.competencies.filter(
    (c) => c.category !== undefined && c.category === "frameworks",
  );
  const tools = hero.competencies.filter(
    (c) => c.category !== undefined && c.category === "tools",
  );
  const practices = hero.competencies.filter(
    (c) => c.category !== undefined && c.category === "practices",
  );
  const other = hero.competencies.filter((c) => c.category === undefined);

  if (languages.length > 0) {
    skills.push(`Languages: ${languages.map((c) => c.name).join(", ")}`);
  }
  if (frameworks.length > 0) {
    skills.push(`Frameworks: ${frameworks.map((c) => c.name).join(", ")}`);
  }
  if (tools.length > 0) {
    skills.push(`Tools: ${tools.map((c) => c.name).join(", ")}`);
  }
  if (practices.length > 0) {
    skills.push(`Practices: ${practices.map((c) => c.name).join(", ")}`);
  }
  if (other.length > 0) {
    skills.push(`Other: ${other.map((c) => c.name).join(", ")}`);
  }

  if (skills.length === 0) {
    skills.push("No skills available...");
  }

  return [
    {
      name: "whoami",
      description: "Display user information",
      output: hero.bio,
    },
    {
      name: "skills",
      description: "List technical competencies",
      output: skills,
    },
    {
      name: "contact",
      description: "Show contact links",
      output: hero.socialLinks.map(
        (l) =>
          `  ${l.platform}: <a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.url}</a>`,
      ),
    },
    {
      name: "resume",
      description: "Download resume",
      output: hero.resumeUrl
        ? `Opening resume... (${hero.resumeUrl})`
        : "Resume not available",
    },
    {
      name: "help",
      description: "Show available commands",
      output: [
        "Available commands:",
        "  whoami   - About me",
        "  skills   - Technical competencies",
        "  contact  - Get in touch",
        "  resume   - Download my resume",
        "  clear    - Clear terminal",
        "  help     - Show this message",
      ],
    },
    {
      name: "clear",
      description: "Clear the terminal",
      output: "", // Handled specially in terminal component
    },
    // Easter eggs
    {
      name: "sudo",
      description: "Execute with elevated privileges",
      output: "Nice try! But this terminal doesn't have sudo access.",
    },
    {
      name: "rm",
      description: "Remove files",
      output: "I'm not letting you delete anything from my portfolio!",
    },
    {
      name: "ls",
      description: "List directory contents",
      output: [
        "drwxr-xr-x  projects/",
        "drwxr-xr-x  experience/",
        "drwxr-xr-x  blog/",
        "-rw-r--r--  resume.pdf",
        "-rw-r--r--  README.md",
      ],
    },
    {
      name: "cat",
      description: "Display file contents",
      output: 'Try "cat README.md" for a surprise!',
    },
    {
      name: "cat README.md",
      description: "Display README",
      output: [
        "# Welcome to my portfolio!",
        "",
        "Thanks for exploring. Feel free to check out:",
        "- /projects - Things I've built",
        "- /blog - Things I've written",
        "- /experience - Places I've worked",
      ],
    },
  ];
}

/**
 * Fetch hero data from Strapi
 */
export async function fetchHero(): Promise<HeroProps> {
  try {
    const hero = await fetchApi<HeroProps>({
      endpoint: "hero?populate=*",
      wrappedByKey: "data",
    });
    return hero;
  } catch (error) {
    console.warn("Failed to fetch hero from API, using mock data:", error);
    const { mockHero } = await import("@/data/mockHero");
    return mockHero;
  }
}
