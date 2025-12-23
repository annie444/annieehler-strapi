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

export interface Image {
  image: string;
  mimeType?: string;
  width?: number | string;
  height?: number | string;
  altText?: string;
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
