<script>
	import SVG from './SVG.svelte';

	let { svg, alt = '', source = '' } = $props();

	source = source.replace(/</g, '').replace(/>/g, '');
</script>

<figure>
	<SVG {svg} />
	{#if alt !== ''}
		<figcaption>
			{alt}
			{#if source !== ''}
				<a href={source}>source</a>{/if}
		</figcaption>
	{/if}
</figure>

<style>
	figcaption {
		font-size: 1rem;
		text-align: center;
		margin-top: 1.5rem;
	}
</style>
