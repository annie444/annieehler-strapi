<script lang="ts">
  /**
   * TerminalContent - Interactive terminal content (no window chrome)
   *
   * This is just the terminal body - wrap in AccordionWindow for the full experience.
   * Fixed: Uses index-based keys to prevent disappearing content bug.
   */
  import { onMount, tick } from "svelte";
  import { SvelteMap } from "svelte/reactivity";
  import type { TerminalCommand } from "@utils/content/hero";

  interface Props {
    commands: TerminalCommand[];
    username?: string;
  }

  let { commands, username = "guest" }: Props = $props();

  // Terminal state
  let history: { id: number; type: "input" | "output"; content: string }[] =
    $state([]);
  let nextId = $state(0);
  let currentInput = $state("");
  let commandHistory: string[] = $state([]);
  let historyIndex = $state(-1);
  let isBooted = $state(false);
  let inputEl: HTMLInputElement | undefined = $state();
  let terminalEl: HTMLDivElement | undefined = $state();

  // Track user interaction to switch placeholder from "whoami" to "help"
  let hasInteracted = $state(false);

  // Placeholder is shown when input is empty
  let isShowingPlaceholder = $derived(currentInput === "");

  // Placeholder switches from "whoami" (intro) to "help" (guidance) after first command
  let placeholderCommand = $derived(hasInteracted ? "help" : "whoami");

  // Command lookup map
  let commandMap = $derived(
    new SvelteMap<string, TerminalCommand>(
      commands.map((c) => [c.name.toLowerCase(), c]),
    ),
  );

  // Inline completion - suggests rest of command as user types
  let completion = $derived.by(() => {
    if (!currentInput) return "";
    const input = currentInput.toLowerCase();
    for (const name of commandMap.keys()) {
      if (name.startsWith(input) && name !== input) {
        return name.slice(input.length);
      }
    }
    return "";
  });

  // Scroll to bottom after state updates
  async function scrollToBottom() {
    await tick();
    if (terminalEl) {
      terminalEl.scrollTop = terminalEl.scrollHeight;
    }
  }

  // Add output lines to history with unique IDs
  function addOutput(lines: string | string[]) {
    const newLines = Array.isArray(lines) ? lines : [lines];
    const entries = newLines.map((content) => ({
      id: nextId++,
      type: "output" as const,
      content,
    }));
    history = [...history, ...entries];
    scrollToBottom();
  }

  // Add input to history
  function addInput(content: string) {
    history = [...history, { id: nextId++, type: "input", content }];
  }

  // Process user command
  function processCommand(input: string) {
    const trimmed = input.trim();
    const cmd = trimmed.toLowerCase();

    // Add input to display history
    addInput(trimmed);

    if (!cmd) {
      scrollToBottom();
      return;
    }

    // Add to command history for arrow key navigation
    commandHistory = [...commandHistory, trimmed];
    historyIndex = -1;

    // Handle special commands
    if (cmd === "clear") {
      history = [];
      return;
    }

    if (cmd === "resume") {
      const resumeCmd = commandMap.get("resume");
      if (resumeCmd) {
        addOutput(resumeCmd.output);
        if (typeof resumeCmd.output === "string") {
          const match = resumeCmd.output.match(/\(([^)]+)\)/);
          if (match?.[1] && !match[1].includes("not available")) {
            window.open(match[1], "_blank");
          }
        }
      }
      return;
    }

    // Look up command
    const command = commandMap.get(cmd);
    if (command) {
      addOutput(command.output);
    } else {
      addOutput(
        `Command not found: ${cmd}. Type "help" for available commands.`,
      );
    }
  }

  // Keyboard handler
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      // If showing placeholder, execute the placeholder command
      const commandToRun = isShowingPlaceholder
        ? placeholderCommand
        : currentInput;
      processCommand(commandToRun);
      currentInput = "";
      hasInteracted = true;
    } else if (event.key === "Tab" && completion) {
      // Tab to accept inline completion
      event.preventDefault();
      currentInput = currentInput + completion;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (
        commandHistory.length > 0 &&
        historyIndex < commandHistory.length - 1
      ) {
        historyIndex++;
        currentInput =
          commandHistory[commandHistory.length - 1 - historyIndex] ?? "";
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        currentInput =
          commandHistory[commandHistory.length - 1 - historyIndex] ?? "";
      } else if (historyIndex === 0) {
        historyIndex = -1;
        currentInput = "";
      }
    } else if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      history = [];
    }
  }

  function focusInput() {
    inputEl?.focus();
  }

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Boot sequence
  onMount(async () => {
    const bootLines = [
      "System 8.0 Terminal",
      "Copyright (c) 2026 Annie Ehler",
      "",
      "Initializing...",
    ];

    for (const line of bootLines) {
      addOutput(line);
      await sleep(300);
    }

    await sleep(200);
    addOutput("Loading personality modules... done");
    await sleep(300);
    addOutput("Mounting /projects... done");
    await sleep(150);
    addOutput("Mounting /blog... done");
    await sleep(200);
    addOutput("");
    addOutput('Type "help" for available commands.');
    addOutput("");

    isBooted = true;
    await tick();
    focusInput();
  });
</script>

<!-- eslint -->
<div
  bind:this={terminalEl}
  class="min-h-75 max-h-95 font-jetbrains overflow-auto bg-neutral-900 p-4 text-sm dark:bg-neutral-950"
  onclick={focusInput}
  onkeydown={focusInput}
  role="textbox"
  tabindex="0"
  aria-label="Portfolio terminal interface"
>
  {#each history as entry (entry.id)}
    {#if entry.type === "input"}
      <div class="text-base/[1.6] flex font-jetbrains">
        <span class="text-green-500 font-jetbrains">{username}@portfolio</span>
        <span class="text-neutral-400 font-jetbrains">:</span>
        <span class="text-blue-400 font-jetbrains">~</span>
        <span class="text-neutral-400 font-jetbrains">$</span>
        <span class="ml-2 text-neutral-100 font-jetbrains">{entry.content}</span
        >
      </div>
    {:else}
      <div
        class="text-base/[1.6] mb-1 [&_a]:text-blue-400 font-jetbrains
        [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-blue-300 whitespace-pre-wrap text-neutral-300"
      >
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html entry.content}
      </div>
    {/if}
  {/each}

  {#if isBooted}
    <div class="text-base/[1.6] font-jetbrains flex items-center">
      <span class="text-green-500 font-jetbrains">{username}@portfolio</span>
      <span class="text-neutral-400 font-jetbrains">:</span>
      <span class="text-blue-400 font-jetbrains">~</span>
      <span class="text-neutral-400 font-jetbrains">$</span>
      <input
        bind:this={inputEl}
        bind:value={currentInput}
        onkeydown={handleKeyDown}
        id="terminal-input"
        name="terminal-input"
        type="text"
        class="caret-transparent w-0 max-w-0 bg-transparent text-neutral-100 outline-none"
        spellcheck="false"
        autocomplete="off"
        autocapitalize="off"
      />
      <span class="w-1"></span>
      {#if !isShowingPlaceholder}
        <span class="text-base/[1.6] font-jetbrains text-neutral-100"
          >{currentInput}</span
        >
      {/if}
      <span
        class="relative font-jetbrains w-2 top-[-4.8px] ml-px mr-[1.5px] h-4 text-base/[1.6]"
      >
        <span class="absolute top-0 left-0 z-10 cursor-blink text-green-400"
          >█</span
        >
        {#if isShowingPlaceholder}
          <span class="absolute top-0 left-0 z-20 text-neutral-500 italic"
            >{placeholderCommand.charAt(0)}</span
          >
        {:else if completion}
          <span class="absolute top-0 left-0 z-20 text-neutral-500 italic"
            >{completion.charAt(0)}</span
          >
        {/if}
      </span>
      {#if isShowingPlaceholder}
        <span class="text-base/[1.6] font-jetbrains text-neutral-500 italic"
          >{placeholderCommand.slice(1)}</span
        >
      {:else if completion}
        <span class="text-base/[1.6] font-jetbrains text-neutral-500 italic"
          >{completion.slice(1)}</span
        >
      {/if}
    </div>
  {/if}
</div>

<style>
  .cursor-blink {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
</style>
