<script>
	let { children } = $props();
</script>

<svelte:head>
	<link
		rel="alternate"
		type="application/rss+xml"
		title="grapefizz.dev - blog rss feed"
		href="/blog/rss.xml"
	/>
</svelte:head>

{@render children()}
