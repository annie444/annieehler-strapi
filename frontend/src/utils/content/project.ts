import { fetchApi } from "@utils/strapi";
import type { Tag, Image } from "@utils/content/shared";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

export interface ProjectProps {
  title: string;
  slug?: string;
  description: string;
  text?: BlocksContent;
  tags: Tag[];
  link: string;

  // Enhanced fields for detailed project view
  problem?: string;
  constraints?: string[];
  approach?: string;
  result?: string;

  // Links
  codeUrl?: string;
  liveUrl?: string;

  // Media
  screenshots?: Image[];
  diagram?: string; // Mermaid code

  // Status
  projectStatus?: "completed" | "in-progress" | "archived";
  featured?: boolean;
}

export async function fetchProjects(): Promise<ProjectProps[]> {
  try {
    const projects = await fetchApi<ProjectProps[]>({
      endpoint: "projects?populate=*",
      wrappedByKey: "data",
    });
    return projects;
  } catch (error) {
    console.warn("Failed to fetch projects from API, using mock data:", error);
    const { mockProjects } = await import("@/data/mockProjects");
    return mockProjects;
  }
}

export async function fetchProject(slug: string): Promise<ProjectProps | null> {
  try {
    const projects = await fetchApi<ProjectProps[]>({
      endpoint: `projects?populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}`,
      wrappedByKey: "data",
    });
    return projects?.[0] ?? null;
  } catch (error) {
    console.warn(`Failed to fetch project "${slug}" from API:`, error);
    return null;
  }
}
