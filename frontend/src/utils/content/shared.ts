export interface Tag {
  name: string;
  slug: string;
}

export interface Link {
  label: string;
  url: string;
}

export interface Locale {
  name: string;
  code: string;
  isDefault: boolean;
}

/**
 * Strapi v5 media format
 * Matches the structure returned by Strapi's media fields
 */
export interface Image {
  url: string;
  mime?: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  name?: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

export interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface Author {
  firstName: string;
  lastName: string;
  slug: string;
  email?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
}
