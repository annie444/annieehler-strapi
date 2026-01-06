import type { Config } from "prettier";

const config: Config = {
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  overrides: [
    {
      files: ["*.astro", "**/*.astro"],
      options: {
        parser: "astro",
      },
    },
  ],
};

export default config;
