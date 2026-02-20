export interface StrapiProps {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
export async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: StrapiProps): Promise<T> {
  if (endpoint.startsWith("/")) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${import.meta.env.STRAPI_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    let data: Record<string, unknown> | unknown[] = await res.json();

    if (wrappedByKey && !Array.isArray(data)) {
      data = data[wrappedByKey] as Record<string, unknown> | unknown[];
    }

    if (wrappedByList && Array.isArray(data)) {
      return data[0] as T;
    }

    return data as T;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
    throw error;
  }
}
