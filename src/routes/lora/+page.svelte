<script>
	let { data } = $props();
	const Content = $derived(data.content.default);
</script>

<main>
	<Content />
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
</style>
