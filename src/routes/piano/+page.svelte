<script>
	import Piano from '$lib/components/Piano.svelte';
</script>

<main>
  <h1 class="text">piano :></h1>
  <h2 class="text">take a moment to play</h2>
  <Piano />
  <p class="text">press keys on your keyboard or click the piano keys</p>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		min-height: calc(100vh - 6rem);
		padding-bottom: 2rem;
	}

  text {
    margin: 0;
    color: var(--txt);
  }
</style>