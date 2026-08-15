<script>
  import TimeTracker from "$lib/components/TimeTracker.svelte";
  import HeartIcon from "~icons/ph/heart";

  let hearts = $state([]);
  let nextHeartId = 0;

  function trajectory(velocityX, velocityY, progress) {
    return {
      x: velocityX * progress,
      y: -velocityY * progress + (110 + velocityY) * progress ** 2,
    };
  }

  function launchHearts() {
    const burst = Array.from({ length: 110 }, () => {
      const velocityX = (Math.random() - 0.5) * 240;
      const velocityY = 140 + Math.random() * 360;
      const rotation = (Math.random() - 0.5) * 1080;

      return {
        id: nextHeartId++,
        ...Object.fromEntries(
          [20, 40, 60, 80].flatMap((step) => {
            const position = trajectory(velocityX, velocityY, step / 100);
            return [
              [`x${step}`, position.x],
              [`y${step}`, position.y],
              [`r${step}`, rotation * (step / 100)],
            ];
          }),
        ),
        x100: velocityX,
        rotation,
        size: 16 + Math.random() * 24,
        duration: 800 + Math.random() * 300,
        delay: Math.random() * 200,
      };
    });

    hearts = [...hearts, ...burst];

    window.setTimeout(() => {
      const burstIds = new Set(burst.map((heart) => heart.id));
      hearts = hearts.filter((heart) => !burstIds.has(heart.id));
    }, 1300);
  }
</script>

<main>
  <h1>
    hi munchkin
    <button class="heart-button" type="button" onclick={launchHearts} aria-label="Celebrate with hearts">
      <HeartIcon class="icon" style="color: var(--red)" />
    </button>
  </h1>
  <h3>
      <TimeTracker showSince={false} date="2025-12-05" time="14:31:24" unit="months" /><br>
      <TimeTracker showSince={false} date="2025-12-05" time="14:31:24" unit="days" /><br>
      <TimeTracker showSince={false} date="2025-12-05" time="14:31:24" unit="hours" /><br>
      <TimeTracker showSince={false} date="2025-12-05" time="14:31:24" unit="minutes" /><br>
      <TimeTracker showSince="date" date="2025-12-05" time="14:31:24" unit="seconds" />
  </h3>
  <p>These last <TimeTracker showSince={false} date="2025-12-05" unit="months" /> have been the most amazing time of my life</p>
  <p>Can't wait for our trip to Tirana :3</p>
</main>

<div class="heart-confetti" aria-hidden="true">
  {#each hearts as heart (heart.id)}
    <span
      class="confetti-heart"
      style={`--x20: ${heart.x20}; --y20: ${heart.y20}; --r20: ${heart.r20}; --x40: ${heart.x40}; --y40: ${heart.y40}; --r40: ${heart.r40}; --x60: ${heart.x60}; --y60: ${heart.y60}; --r60: ${heart.r60}; --x80: ${heart.x80}; --y80: ${heart.y80}; --r80: ${heart.r80}; --x100: ${heart.x100}; --rotation: ${heart.rotation}; --size: ${heart.size}; --duration: ${heart.duration}; --delay: ${heart.delay}`}
      >♥</span
    >
  {/each}
</div>

<style>
  main {
    width: 100%;
    max-width: 53rem;
    margin: 0 auto 10rem auto;
    padding: 0 1.5rem;
  }

  a {
    display: inline-block;
    font-family: "Space Mono", monospace;
    font-size: 1.2rem;
    white-space: nowrap;
  }

  .heart-button {
    display: inline-flex;
    align-items: center;
    padding: 0;
    background: transparent;
    vertical-align: -0.08em;
  }

  .heart-confetti {
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
    overflow: hidden;
  }

  .confetti-heart {
    position: absolute;
    bottom: 0;
    left: 50%;
    color: var(--red);
    font-size: calc(var(--size) * 1px);
    line-height: 1;
    opacity: 0;
    animation: heart-fall calc(var(--duration) * 1ms) linear calc(var(--delay) * 1ms) forwards;
  }

  @keyframes heart-fall {
    0% {
      opacity: 0;
      transform: translate3d(-50%, 0, 0) rotate(0deg) scale(0.4);
    }

    4% {
      opacity: 1;
    }

    20% {
      opacity: 1;
      transform: translate3d(calc(-50% + var(--x20) * 1vw), calc(var(--y20) * 1vh), 0) rotate(calc(var(--r20) * 1deg)) scale(0.85);
    }

    40% {
      opacity: 1;
      transform: translate3d(calc(-50% + var(--x40) * 1vw), calc(var(--y40) * 1vh), 0) rotate(calc(var(--r40) * 1deg)) scale(1);
    }

    60% {
      opacity: 1;
      transform: translate3d(calc(-50% + var(--x60) * 1vw), calc(var(--y60) * 1vh), 0) rotate(calc(var(--r60) * 1deg)) scale(1);
    }

    80% {
      opacity: 1;
      transform: translate3d(calc(-50% + var(--x80) * 1vw), calc(var(--y80) * 1vh), 0) rotate(calc(var(--r80) * 1deg)) scale(1);
    }

    100% {
      opacity: 0;
      transform: translate3d(calc(-50% + var(--x100) * 1vw), 110vh, 0) rotate(calc(var(--rotation) * 1deg)) scale(0.85);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .confetti-heart {
      animation-duration: 1ms;
    }
  }

</style>
