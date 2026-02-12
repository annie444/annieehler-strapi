type Runtime = import("@astrojs/cloudflare").Runtime<Env>;
import Swup from "swup";

declare namespace App {
  type Locals = Runtime;
}

declare global {
  // Note the capital "W"
  interface Window {
    swup: Swup;
  }
}

interface ImportMetaEnv {
  readonly STRAPI_URL: string;
  readonly STRAPI_TOKEN: string;
}
