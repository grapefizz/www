<script>
  import { onMount } from "svelte";
  import { formatDate } from "$lib/js/utils.js";
  import { iconMap } from "$lib/js/icons.js";
  import PlayIcon from "~icons/ph/play";
  import PauseIcon from "~icons/ph/pause";
  import PreviousIcon from "~icons/ph/skip-back";
  import NextIcon from "~icons/ph/skip-forward";

  const musicImports = import.meta.glob(
    "/src/content/music/*.{mp3,wav,ogg,m4a}",
    {
      import: "default",
      eager: true,
    },
  );

  const songs = Object.entries(musicImports).map(([path, src]) => ({
    src,
    name: decodeURIComponent(path.split("/").pop().replace(/\.[^.]+$/, "")),
  }));

  let { data } = $props();
  let audio = $state();
  let currentIndex = $state(0);
  let isPlaying = $state(false);
  let currentTime = $state(0);
  let duration = $state(0);

  const currentSong = $derived(songs[currentIndex]);

  $effect(() => {
    if (audio && currentSong) {
      audio.load();
    }
  });

  function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${remainingSeconds}`;
  }

  async function play() {
    if (!audio || !currentSong) {
      return;
    }

    await audio.play();
    isPlaying = true;
  }

  function pause() {
    audio?.pause();
    isPlaying = false;
  }

  function togglePlayback() {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function changeSong(direction) {
    if (songs.length === 0) {
      return;
    }

    const shouldResume = isPlaying;
    currentIndex = (currentIndex + direction + songs.length) % songs.length;
    currentTime = 0;
    duration = 0;

    if (shouldResume) {
      requestAnimationFrame(() => play());
    }
  }

  function syncDuration() {
    duration = Number.isFinite(audio?.duration) ? audio.duration : 0;
  }

  onMount(() => {
    if (songs.length > 0) {
      currentIndex = Math.floor(Math.random() * songs.length);
    }
  });
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

  <section class="music-player" aria-label="music player">
    {#if currentSong}
      <div class="song-name">{currentSong.name}</div>
      <audio
        bind:this={audio}
        src={currentSong.src}
        preload="metadata"
        ontimeupdate={() => (currentTime = audio?.currentTime ?? 0)}
        onloadedmetadata={syncDuration}
        ondurationchange={syncDuration}
        onended={() => changeSong(1)}
        onplay={() => (isPlaying = true)}
        onpause={() => (isPlaying = false)}
      ></audio>

      <div class="player-row">
        <div class="buttons-row">
          <button type="button" aria-label="previous song" onclick={() => changeSong(-1)}>
            <PreviousIcon />
          </button>
          <button
            type="button"
            class="play-button"
            aria-label={isPlaying ? "pause" : "play"}
            onclick={togglePlayback}
          >
            {#if isPlaying}
              <PauseIcon />
            {:else}
              <PlayIcon />
            {/if}
          </button>
          <button type="button" aria-label="next song" onclick={() => changeSong(1)}>
            <NextIcon />
          </button>
        </div>
        <div class="duration">{formatTime(currentTime)}/{formatTime(duration)}</div>
      </div>
    {:else}
      <div class="song-name">no songs yet</div>
    {/if}
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

  .song-name {
    margin-bottom: 0.8rem;
    font-family: "Space Mono", monospace;
    color: var(--txt-0);
    overflow-wrap: anywhere;
  }

  .player-row {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .buttons-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .buttons-row button {
    display: inline-grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    background: transparent;
    color: var(--txt);
    border: none;
  }

  .buttons-row button:hover {
    background: transparent;
  }

  .buttons-row button :global(svg) {
    border-bottom: 2px solid transparent;
    padding-bottom: 0.12em;
    transition: border-bottom-color 0.2s ease;
  }

  .buttons-row button:hover :global(svg) {
    border-bottom-color: currentColor;
  }

  .play-button {
    width: 2.75rem !important;
    height: 2.75rem !important;
  }

  .play-button :global(svg) {
    border-bottom: 2px solid transparent;
    padding-bottom: 0.12em;
    transition: border-bottom-color 0.2s ease;
  }

  .play-button:hover :global(svg) {
    border-bottom-color: currentColor;
  }

  .duration {
    font-family: "Space Mono", monospace;
    color: var(--txt);
    font-size: 0.875rem;
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
