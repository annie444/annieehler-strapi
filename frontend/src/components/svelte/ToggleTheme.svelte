<script lang="ts">
  import { Moon, Sun } from "@lucide/svelte";
  import { resolveTheme, toggleTheme, type Theme } from "@utils/theme";
  import { onMount } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "@utils/tw";

  let theme: Theme = $state<Theme>("light");

  onMount(() => {
    theme = resolveTheme();

    const handler = (event: CustomEvent<Theme>): void => {
      theme = event.detail;
    };

    document.addEventListener("set-theme", handler);
    return () => {
      document.removeEventListener("set-theme", handler);
    };
  });

  type Props = Omit<HTMLAttributes<HTMLButtonElement>, "onclick">;
  let { class: classNames, ...props }: Props = $props();

  const isDark = $derived(theme === "dark");
</script>

<button
  {...props}
  onclick={() => toggleTheme()}
  class={cn(
    "rounded-full bg-neutral-900 dark:bg-neutral-100 h-8 w-8 block items-center justify-center overflow-hidden",
    classNames,
  )}
>
  {#if isDark}
    <Sun
      size="1.25rem"
      class="absolute inset-0 m-auto transition-opacity stroke-neutral-900"
    />
  {:else}
    <Moon
      size="1.25rem"
      class="absolute inset-0 m-auto transition-opacity stroke-neutral-50"
    />
  {/if}
</button>
