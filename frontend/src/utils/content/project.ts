import { fetchApi } from "@utils/strapi";
import type { Tag } from "@utils/content/shared";
import type { BlockContent } from "@strapi/blocks-react-renderer";

export interface ProjectProps {
  title: string;
  description: string;
  text?: BlockContent;
  tags: Tag[];
  link: string;
}

export async function fetchProjects(): Promise<ProjectProps[]> {
  const projects = await fetchApi<ProjectProps[]>({
    endpoint: "projects?populate=*",
    wrappedByKey: "data",
  });
  return projects;
}
