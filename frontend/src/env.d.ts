type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  type Locals = Runtime;
}

interface ImportMetaEnv {
  readonly STRAPI_URL: string;
  readonly STRAPI_TOKEN: string;
}
