<script>
	import Image from '$lib/components/Image.svelte';
	import emblaCarouselSvelte from 'embla-carousel-svelte';

	let { data } = $props();

	let { default: content, metadata } = data.post;

	let emblaApi;
	let options = { loop: true, align: 'center' };
	let loop = $state(true);

	function emblaInit(event) {
		emblaApi = event.detail;
		loop = emblaApi.internalEngine().slideLooper.canLoop();
	}

	function emblaNext() {
		emblaApi.scrollNext();
	}

	function emblaPrev() {
		emblaApi.scrollPrev();
	}

	const Content = $derived(content);
</script>

<main>
	<div class="head-1">
		<a href="/projects" class="back"><span class="arrow">&lt;-</span>projects</a>
	</div>
	<div class="head-2">
		<div class="row">
			<h1>{metadata.name}</h1>
			<div class="links">
				{#if metadata.website}
					<a class="external" href={metadata.website} target="_blank">
						site<span class="arrow">/></span>
					</a>
				{/if}
				{#if metadata.github}
					<a class="external" href={metadata.github} target="_blank">
						github<span class="arrow">/></span>
					</a>
				{/if}
			</div>
		</div>
		<p class="description">
			{metadata.description}
		</p>
	</div>
	<div class="embla" use:emblaCarouselSvelte={{ options }} onemblaInit={emblaInit}>
		<div class="embla__container" class:loop>
			{#each metadata.images as image}
				<div class="embla__slide" class:tall={metadata.aspect_ratio === 'tall'}>
					<Image {image} alt={metadata.description} sizes="(min-width: 800px) 80vw, 100vw" />
				</div>
			{/each}
		</div>
		<button class="embla__prev" onclick={emblaPrev}><span>&lt;-</span></button>
		<button class="embla__next" onclick={emblaNext}><span>-></span></button>
	</div>
	<div class="content">
		<Content />
	</div>
</main>

<style>
	main {
		width: 100%;
		padding: 0 0rem 10rem 0rem;
		margin: auto;
	}

	h1 {
		font-size: 2.5rem;
		margin: 0;
		margin-right: auto;
	}

	.head-1 {
		margin: 1rem auto;
		padding: 0 1.5rem;
		width: 100%;
		max-width: 53rem;
	}

	.head-2 {
		margin: 1.25rem auto 2.5rem auto;
		padding: 0 1.5rem;
		width: 100%;
		max-width: 53rem;

		a {
			font-family: 'Space Mono', monospace;
			font-size: 1.5rem;
		}

		.row,
		.links {
			display: flex;
			align-items: center;
			gap: 1rem 2rem;
		}

		.description {
			font-size: 1.2rem;
			margin: 1rem 0;
			font-style: italic;
			color: var(--txt-2);
		}
	}

	.content {
		width: 100%;
		max-width: 53rem;
		margin: auto;
		margin-top: 3rem;
		padding: 0 1.5rem;
	}

	.embla {
		overflow: hidden;
		position: relative;
	}
	.embla__container {
		display: flex;
		justify-content: center;

		&.loop {
			justify-content: unset;
		}
	}
	.embla__slide {
		flex: 0 0 70%;
		max-width: 80rem;
		min-width: 0;
		margin-left: 1.5rem;
		margin-right: 1.5rem;

		&.tall {
			flex: 0 0 20%;
			max-width: 20rem;
		}
	}
	.embla__prev,
	.embla__next {
		position: absolute;
		top: 0;
		bottom: 0;
		width: calc(15% - 3rem);
		background: none;

		span {
			display: inline-block;
			color: var(--txt);
			font-size: 3rem;
			font-family: 'Space Mono', monospace;
			transform: scale(1);
			transition: 0.2s;
			opacity: 0;
			background: var(--bg-2);
			width: 3rem;
			height: 3rem;
			line-height: 2.9rem;
		}

		&:hover span {
			opacity: 1;
			transform: scale(1.2);
		}
	}
	.embla__next {
		right: 0;
	}
	.embla__prev {
		left: 0;
	}

	@media (max-width: 850px) {
		.embla__slide {
			flex: 0 0 calc(100% - 3rem);
			max-width: 50rem;
		}
		.embla__prev,
		.embla__next {
			width: 20%;
			span {
				opacity: 1;
			}
		}
		.embla__prev {
			text-align: left;
			padding-left: 1rem;
		}
		.embla__next {
			text-align: right;
			padding-right: 1rem;
		}
	}

	@media (max-width: 650px) {
		.head {
			.row {
				flex-wrap: wrap;
			}
		}
	}
</style>
