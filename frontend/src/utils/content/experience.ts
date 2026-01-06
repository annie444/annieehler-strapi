import { fetchApi } from "@utils/strapi";
import type { Tag } from "@utils/content/shared";

export interface ExperienceProps {
  id: string;
  company: string;
  role: string;
  startDate: string; // ISO date (YYYY-MM)
  endDate?: string; // ISO date, undefined = present
  description: string;
  highlights?: string[];
  technologies?: Tag[];
  location?: string;
  link?: string;
}

/**
 * Format a date range for display (e.g., "Jan 2020 - Present")
 */
export function formatDateRange(startDate: string, endDate?: string): string {
  const formatDate = (dateStr: string): string => {
    const [year, month] = dateStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  return `${start} - ${end}`;
}

/**
 * Calculate duration in years and months
 */
export function calculateDuration(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} mo`;
  } else if (remainingMonths === 0) {
    return `${years} yr`;
  }
  return `${years} yr ${remainingMonths} mo`;
}

/**
 * Fetch experience data from Strapi
 * Falls back to mock data if API is unavailable
 */
export async function fetchExperience(): Promise<ExperienceProps[]> {
  try {
    const experience = await fetchApi<ExperienceProps[]>({
      endpoint: "experiences?populate=*&sort=startDate:desc",
      wrappedByKey: "data",
    });
    return experience;
  } catch (error) {
    console.warn(
      "Failed to fetch experience from API, using mock data:",
      error,
    );
    // Import mock data as fallback
    const { mockExperience } = await import("@/data/mockExperience");
    return mockExperience;
  }
}
