<script>
  import { formatDate } from "$lib/js/utils.js";
  import { iconMap } from "$lib/js/icons.js";
  import MusicPlayer from "$lib/components/MusicPlayer.svelte";

  let { data } = $props();
</script>

<main>
  <div class="header">
    <h1>
      haajjj baabeee :) <span
        class="count"
        aria-label="{data.posts.length} posts">[{data.posts.length}]</span
      >
    </h1>
  </div>

  <div class="posts">
    {#each data.posts as post}
      {@const Icon = iconMap[post.icon]}
      <a href={"/lora/" + post.slug} class="link">
        <div class="date">{formatDate(post.date)}</div>
        <h2>
          {#if post.icon}
            <Icon class="icon" />
          {/if}{post.name}<span class="arrow">-></span>
        </h2>
        <div class="description">{post.description}</div>
      </a>
    {/each}
  </div>

  <section class="music-player">
    <MusicPlayer />
  </section>
</main>

<style>
  main {
    width: 100%;
    max-width: 53rem;
    margin: 0 auto 10rem auto;
    padding: 0 1.5rem;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .music-player {
    margin: 2.5rem 0 0 0;
  }

  .posts {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 100%;
  }

  h2 {
    font-size: 1.5rem;
    margin: 0;
    color: var(--txt);
  }

  .count {
    color: var(--bg-3);
  }

  h2 :global(.icon) {
    margin-right: 0.75ch;
  }

  .date {
    font-size: 1.125rem;
    font-family: "Space Mono", monospace;
    color: var(--txt-2);
    margin-top: 0.25rem;
  }

  .link {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: left;
    gap: 0.5rem 2rem;
  }

  .description {
    grid-column: 2;
  }

  @media (max-width: 600px) {
    .link {
      grid-template-columns: auto;
      gap: 0.5rem;

      .description {
        grid-column: 1;
      }
    }
  }
</style>
