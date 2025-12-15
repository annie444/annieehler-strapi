export type Theme = "light" | "dark";

declare global {
  interface DocumentEventMap {
    "set-theme": CustomEvent<Theme>;
  }
}

const STORAGE_KEY = "theme-preference";

let doesPreferDark: MediaQueryList | undefined;

export function prefersDark(): MediaQueryList {
  if (!doesPreferDark) {
    doesPreferDark = window.matchMedia("(prefers-color-scheme: dark)");
  }
  return doesPreferDark;
}

export function getSystemPreference(): Theme {
  return prefersDark().matches ? "dark" : "light";
}

export function getStoredPreference(): Theme | null {
  if (typeof localStorage === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return null;
}

export function resolveTheme(): Theme {
  return getStoredPreference() ?? getSystemPreference();
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute("data-theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  document.documentElement.style.colorScheme = theme;
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(STORAGE_KEY, theme);
  applyTheme(theme);
  dispatchThemeChangeEvent(theme);
}

export function toggleTheme(): void {
  const current = resolveTheme();
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
}

function dispatchThemeChangeEvent(theme: Theme): void {
  const event = new CustomEvent("set-theme", {
    detail: theme,
    bubbles: true,
    cancelable: false,
  });
  document.dispatchEvent(event);
}
