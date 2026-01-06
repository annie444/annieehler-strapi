import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginSvelte from "eslint-plugin-svelte";
import svelteConfig from "./svelte.config.js";
import { defineConfig } from "eslint/config";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  // Use flat config variants for Astro
  ...eslintPluginAstro.configs["flat/recommended"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-strict"],
  ...eslintPluginSvelte.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  // Apply prettier only to non-Astro/Svelte files
  // Astro/Svelte files are formatted via prettier-plugin-astro (CLI/IDE), not ESLint
  {
    files: ["**/*.{ts,tsx,mts,cts,js,mjs,cjs,jsx}"],
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte"], // Add support for additional file extensions, such as .svelte
        parser: tseslint.parser,
        svelteConfig,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "build/**",
      "**/generated/**",
      "**/*.min.*",
      ".astro/**",
      ".vite/**",
      "!.github/**",
      "!.vscode/**",
      ".git/**",
      ".serena/**",
    ],
  },
  // Disable prettier for embedded scripts in Astro files
  // These are virtual paths used by eslint-plugin-astro for inline scripts
  {
    files: ["**/*.astro/*.js", "**/*.astro/*.ts"],
    rules: {
      "prettier/prettier": "off",
    },
  },
]);
