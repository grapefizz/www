<script>
	let { svg } = $props();

	async function importSVG() {
		const svgs = import.meta.glob(`/src/content/*/*/*.svg`, { query: '?raw' });
		for (const [path, src] of Object.entries(svgs)) {
			if (path.includes(svg)) {
				const res = await src();
				return res.default;
			}
		}
	}
</script>

<div class="svg-container">
	{#await importSVG(svg) then src}
		{@html src}
	{/await}
</div>

<style>
	:global(.svg-container svg) {
		width: 100%;
		height: 100%;
	}
</style>
