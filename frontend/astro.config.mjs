// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import sitemap from "@astrojs/sitemap";
import swup, { Theme } from "@swup/astro";
import mermaid from "astro-mermaid";
import pagefind from "astro-pagefind";
import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://annieehler.com",

  experimental: {
    svgo: true,
  },

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ["sharp"],
      },
      // Disable source maps for dependencies to avoid console warnings
      sourcemap: false,
    },
    optimizeDeps: {
      // Exclude problematic packages from pre-bundling source maps
      exclude: ["aria-query", "axobject-query"],
    },
  },

  integrations: [
    svelte({
      include: ["**/*.svelte"],
    }),
    react({
      include: ["**/*.jsx", "**/*.tsx"],
    }),
    sitemap(),
    swup({
      native: true,
      cache: true,
      theme: Theme.slide,
      animationClass: "transition-",
      containers: ["main"],
      preload: true,
      accessibility: true,
      forms: false,
      morph: ["#nav"],
      parallel: false,
      progress: true,
      routes: true,
      smoothScrolling: true,
      updateBodyClass: true,
      updateHead: true,
      reloadScripts: true,
      debug: false,
      loadOnIdle: true,
      globalInstance: true,
    }),
    mermaid({
      theme: "default",
      autoTheme: true,
      mermaidConfig: {
        flowchart: {
          curve: "basis",
        },
      },
      iconPacks: [
        {
          name: "logos",
          loader: () =>
            fetch("https://unpkg.com/@iconify-json/logos@1/icons.json").then(
              (res) => res.json(),
            ),
        },
        {
          name: "iconoir",
          loader: () =>
            fetch("https://unpkg.com/@iconify-json/iconoir@1/icons.json").then(
              (res) => res.json(),
            ),
        },
      ],
    }),
    expressiveCode(),
    pagefind(),
  ],
});
