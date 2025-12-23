import { fetchApi } from "@utils/strapi";
import type { Tag, Link, Locale, Image, Author } from "@utils/content/shared";

export interface SiteMetaProps {
  name: string;
  tagline: string;
  locale: string;
  links: Link[];
  defaultMeta: PageMetaProps;
}

export interface PageMetaProps {
  title: string;
  locale: string;
  description?: string;
  pageType?: "website" | "article";
  image?: Image;
  twitterHandle?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: Author[];
  section?: string;
  tags?: Tag[];
}

export interface LocaleMetaProps {
  locale?: Locale;
  locales: Locale[];
}

export interface MetaProps {
  name: string;
  tagline: string;
  links: Link[];
  siteLocale: string;
  title: string;
  pageLocale: string;
  description?: string;
  pageType?: "website" | "article";
  image?: Image;
  twitterHandle?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authors?: Author[];
  section?: string;
  tags?: Tag[];
  defaultLocale?: Locale;
  locales: Locale[];
}

export async function fetchGlobalMeta(): Promise<SiteMetaProps> {
  const siteMeta = await fetchApi<SiteMetaProps>({
    endpoint: "site-meta?populate=*",
    wrappedByKey: "data",
  });
  return siteMeta;
}

export async function fetchPageMeta(pageId: string): Promise<PageMetaProps> {
  const page = encodeURIComponent(pageId);
  const pageMeta = await fetchApi<PageMetaProps>({
    endpoint: `page-meta?populate=*&filters[slug][$eq]=${page}`,
    wrappedByKey: "data",
  });
  return pageMeta;
}

export async function fetchLocales(): Promise<LocaleMetaProps> {
  const locales = await fetchApi<Locale[]>({
    endpoint: "i18n/locales",
    wrappedByKey: "data",
  });
  const defaultLocale = locales?.find((locale) => locale.isDefault);
  return { locale: defaultLocale, locales };
}

export async function fetchMeta(pageId?: string): Promise<MetaProps> {
  const [siteMeta, locales] = await Promise.all([
    fetchGlobalMeta(),
    fetchLocales(),
  ]);
  const { defaultMeta, locale: siteLocale, ...site } = siteMeta;
  let pageMeta = defaultMeta;
  if (pageId) {
    try {
      const fetchedPageMeta = await fetchPageMeta(pageId);
      pageMeta = { ...pageMeta, ...fetchedPageMeta };
    } catch (error) {
      console.warn(
        `Page meta not found for pageId: ${pageId}. Got error:`,
        error,
      );
    }
  }
  const { locale: pageLocale, ...page } = pageMeta;
  return {
    ...site,
    ...page,
    siteLocale,
    pageLocale,
    defaultLocale: locales.locale,
    locales: locales.locales,
  };
}
