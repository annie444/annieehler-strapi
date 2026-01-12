<script lang="ts">
  import { onMount } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "@utils/tw";
  import type { Tag } from "@utils/content/shared";
  import { SvelteSet } from "svelte/reactivity";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    tags: Tag[];
  }

  let { tags, class: className }: Props = $props();

  // Selected tags state
  let selectedTags = new SvelteSet<string>();

  // Initialize from URL on mount
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const tagParam = params.get("tags");
    if (tagParam) {
      tagParam.split(",").forEach((slug) => selectedTags.add(slug));
    }
  });

  // Toggle tag selection
  function toggleTag(slug: string) {
    if (selectedTags.has(slug)) {
      selectedTags.delete(slug);
    } else {
      selectedTags.add(slug);
    }
    updateUrl();
    dispatchFilterEvent();
  }

  // Clear all filters
  function clearFilters() {
    selectedTags.clear();
    updateUrl();
    dispatchFilterEvent();
  }

  // Update URL with selected tags
  function updateUrl() {
    const url = new URL(window.location.href);
    if (selectedTags.size > 0) {
      url.searchParams.set("tags", Array.from(selectedTags).join(","));
    } else {
      url.searchParams.delete("tags");
    }
    window.history.replaceState({}, "", url.toString());
  }

  // Dispatch custom event for parent to filter posts
  function dispatchFilterEvent() {
    const event = new CustomEvent("filter-tags", {
      detail: { tags: Array.from(selectedTags) },
      bubbles: true,
    });
    document.dispatchEvent(event);
  }

  const hasFilters = $derived(selectedTags.size > 0);
</script>

<div
  class={cn(
    "tag-filter flex flex-col lg:flex-row flex-nowrap lg:items-center gap-1 lg:gap-2",
    className,
  )}
>
  <span class="font-chi text-foreground-dim"> Filter: </span>

  <div class="flex flex-wrap gap-2">
    {#each tags as tag (tag.slug)}
      <button
        onclick={() => toggleTag(tag.slug)}
        class={cn(
          "tag-pill font-chi px-2 py-1 text-xs font-medium transition-colors",
          "border-2 border-solid border-foreground",
          selectedTags.has(tag.slug)
            ? "bg-blue-400 text-grey-dark dark:bg-blue-600"
            : "bg-grey-medium hover:bg-grey-dark",
        )}
      >
        {tag.name}
      </button>
    {/each}

    {#if hasFilters}
      <button
        onclick={clearFilters}
        class="font-chi ml-2 text-xs text-foreground-dim underline
        hover:text-grey-dark"
      >
        Clear
      </button>
    {/if}
  </div>
</div>
