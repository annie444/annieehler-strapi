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
  const projects = await fetchApi<ProjectProps[]>({
    endpoint: "projects?populate=*",
    wrappedByKey: "data",
  });
  return projects;
}

export async function fetchProject(slug: string): Promise<ProjectProps | null> {
  const projects = await fetchApi<ProjectProps[]>({
    endpoint: `projects?populate=*&filters[slug][$eq]=${encodeURIComponent(slug)}`,
    wrappedByKey: "data",
  });
  return projects?.[0] ?? null;
}
