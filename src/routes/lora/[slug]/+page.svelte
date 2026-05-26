<script>
  import { formatDate } from "$lib/js/utils.js";
  import { iconMap } from "$lib/js/icons.js";

  let { data } = $props();
  let { default: content, metadata } = data.post;
  let Icon = iconMap[metadata.icon];

  const Content = $derived(content);
</script>

<main class:wide={metadata.layout === "wide"}>
  <div class="head">
    <a href="/lora" class="back"><span class="arrow">&lt;-</span>other stuffs</a
    >
  </div>
  <h1>
    {#if metadata.icon}
      <Icon class="icon" />
    {/if}{metadata.name}{#if metadata.pictureCount !== undefined}<span
        class="count"
        aria-label="{metadata.pictureCount} photos">[{metadata.pictureCount}]</span
      >{/if}
  </h1>
  <p class="date">{formatDate(metadata.date)}</p>
  <p class="description">{metadata.description}</p>
  <div class="content">
    <Content />
  </div>
</main>

<style>
  main {
    width: 100%;
    max-width: 53rem;
    margin: 0 auto 10rem auto;
    padding: 1.5rem;
  }

  main.wide {
    max-width: none;
    padding-left: 4rem;
    padding-right: 4rem;
  }

  .content {
    overflow-x: hidden;
    max-width: 100%;
  }

  .date {
    margin: 0.5rem 0;
    font-size: 1.375rem;
    font-family: "Space Mono", monospace;
  }

  .description {
    font-size: 1.125rem;
    margin: 0.5rem 0 1.5rem 0;
    font-style: italic;
    color: var(--txt-2);
  }

  h1 {
    font-size: 2.5rem;
    margin: 1rem 0;
  }

  h1 :global(.icon) {
    margin-right: 0.75ch;
  }

  .count {
    color: var(--bg-3);
    margin-left: 0.35ch;
  }

  @media (max-width: 850px) {
    main.wide {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
  }
</style>
