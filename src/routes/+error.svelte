<script>
	import { page } from '$app/stores';
	import Piano from '$lib/components/Piano.svelte';
</script>

<main>
	{#if $page.error}
		<h1 class="errorCode">{$page.status}</h1>
		<h2 class="errorMessage">{$page.error.message.toLowerCase()}</h2>
		<h2>take a moment to play</h2>
		<Piano />
	{/if}
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

	.errorCode {
		font-size: 5rem;
		margin: 0;
	}

	.errorMessage {
		margin: 1rem 0 0 0;
		color: var(--txt);
	}
</style>
