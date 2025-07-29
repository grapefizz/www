<script>
	import { formatDate } from '$lib/js/utils.js';
	import { iconMap } from '$lib/js/icons.js';

	let { data } = $props();
	let { default: content, metadata } = data.post;
	let Icon = iconMap[metadata.icon];

	const Content = $derived(content);
</script>

<main>
	<div class="head">
		<a href="/blog" class="back"><span class="arrow">&lt;-</span>blog</a>
	</div>
	<h1>
		<Icon class="icon" />{metadata.name}
	</h1>
	<p class="date">{formatDate(metadata.date)}</p>
	<p class="description">{metadata.description}</p>
	<div class="content">
		<Content />
	</div>
</main>

<div class="giscus-container">
	<script src="https://giscus.app/client.js"
		data-repo="grapefizz/www"
		data-repo-id="R_kgDOPUQucg"
		data-category-id="DIC_kwDOPUQucs4CtjiG"
		data-mapping="pathname"
		data-strict="0"
		data-reactions-enabled="1"
		data-emit-metadata="0"
		data-input-position="bottom"
		data-theme="preferred_color_scheme"
		data-lang="en"
		data-loading="lazy"
		crossorigin="anonymous"
		async>
	</script>
</div>

<style>
	main {
		width: 100%;
		max-width: 53rem;
		margin: 0 auto 10rem auto;
		padding: 1.5rem;
	}

	.content {
		overflow-x: hidden;
		max-width: 100%;
	}

	.date {
		margin: 0.5rem 0;
		font-size: 1.4rem;
		font-family: 'Space Mono', monospace;
	}

	.description {
		font-size: 1.2rem;
		margin: 0.5rem 0 1.5rem 0;
		font-style: italic;
		color: var(--txt-2);
	}

	h1 {
		font-size: 2.5rem;
		margin: 1.25rem 0;
		line-height: 1.3;
	}

	h1 :global(.icon) {
		margin-right: 0.75ch;
}

/* Giscus comment widget custom styles */

.giscus-container {
  margin: 3rem 0 0 0;
  padding: 0;
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  border: none;
  max-width: 100%;
  overflow-x: auto;
  font-family: 'Space Grotesk', 'Space Mono', monospace, sans-serif;
}

.giscus-container :global(.giscus) {
  font-family: 'Space Grotesk', 'Space Mono', monospace, sans-serif;
  color-scheme: light dark;
  --giscus-font-size: 1.05rem;
  --giscus-bg: transparent;
  --giscus-border: none;
  --giscus-accent-color: #bd63ee;
  --giscus-link-color: #26bbd9;
  --giscus-header-bg: transparent;
  --giscus-header-text-color: var(--txt-2, #6363ee);
  --giscus-btn-bg: #f7f7fa;
  --giscus-btn-text: #6363ee;
  --giscus-btn-border: #bd63ee;
  --giscus-btn-hover-bg: #e6e6fa;
  --giscus-btn-hover-text: #bd63ee;
  --giscus-btn-hover-border: #26bbd9;
  --giscus-reaction-active-bg: #bd63ee22;
  --giscus-reaction-active-text: #bd63ee;
  --giscus-reaction-hover-bg: #26bbd922;
  --giscus-reaction-hover-text: #26bbd9;
  --giscus-input-bg: #fff;
  --giscus-input-text: #222;
  --giscus-input-border: #bd63ee33;
  --giscus-input-focus-border: #26bbd9;
  --giscus-input-placeholder: #6363ee99;
  --giscus-meta: #6363ee99;
  --giscus-shadow: none;
}

@media (max-width: 600px) {
  .giscus-container {
	padding: 1.25rem 0.5rem 1rem 0.5rem;
	border-radius: 0.75rem;
  }
}

@media (max-width: 600px) {
  .giscus-container {
	padding: 0;
	border-radius: 0;
  }
}
</style>

