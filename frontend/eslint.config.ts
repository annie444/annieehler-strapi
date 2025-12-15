import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginAstro from "eslint-plugin-astro";
import { defineConfig } from "eslint/config";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-strict"],
  eslintPluginPrettierRecommended,
  {
    files: ["*.{ts,tsx,mts,cts,js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        function: "readonly",
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
]);
