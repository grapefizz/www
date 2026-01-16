<script>
	import GithubIcon from '~icons/ph/github-logo';
	import DiscordIcon from '~icons/ph/discord-logo';
	import KofiIcon from '~icons/ph/coffee';
	import InstagramIcon from '~icons/ph/instagram-logo';

	let content = {
		languages: {
			general: ['py', 'js', 'rust', 'zig', 'java', 'swift', 'c++', 'c', 'lua'],
		},
		tech: {
			frameworks: ['svelte', 'astro', 'actix', 'leptos', 'flask', 'openresty'],
			tools: ['vscode', 'neovim', 'aseprite', 'imhex', 'git', 'blender']
		}
	};
</script>

<main>
	<h1>about</h1>
	<p>
		hi! i'm grapefizz. i'm a junior highschool student who is interested in coding, mechanical engineering, digital art, animation, urbex, mtb, snowboarding, swimming and photography.
	</p>
	<h2>links</h2>
	<a href="https://github.com/grapefizz" class="external icon" target="_blank" rel="noopener">
		<GithubIcon /><span class="text">github</span><span class="arrow">/></span>
	</a>
	<a href="https://discord.com/users/602127622528303114" class="external icon" target="_blank" rel="noopener">
		<DiscordIcon /><span class="text">discord</span><span class="arrow">/></span>
	</a>
		<a href="https://www.instagram.com/karakushiari" class="external icon" target="_blank" rel="noopener">
		<InstagramIcon /><span class="text">instagram</span><span class="arrow">/></span>
	</a>
	<a href="https://ko-fi.com/grapefizz" class="external icon" target="_blank" rel="noopener">
		<KofiIcon /><span class="text">ko-fi</span><span class="arrow">/></span>
	</a>
	<h2>languages</h2>
	{#each Object.keys(content.languages) as category}
		<div class="info">
			{category} <span class="sub">-></span>
			{#each content.languages[category] as item}
				{item}
				{#if item !== content.languages[category][content.languages[category].length - 1]}
					<span class="sub">/</span>&nbsp;
				{/if}
			{/each}
		</div>
	{/each}
	<h2>tech</h2>
	{#each Object.keys(content.tech) as category}
		<div class="info">
			{category} <span class="sub">-></span>
			{#each content.tech[category] as item}
				{item}
				{#if item !== content.tech[category][content.tech[category].length - 1]}
					<span class="sub">/</span>&nbsp;
				{/if}
			{/each}
		</div>
	{/each}
	<h2>this site</h2>
	<div class="info">
		stack <span class="sub">-></span> sveltekit <span class="sub">/</span> mdsvex
		<span class="sub">/</span> vite <span class="sub">/</span> vercel
	</div>
	<div class="info">
		fonts <span class="sub">-></span> space mono <span class="sub">/</span>
		<span style="font-family: 'Space Grotesk Variable'">space grotesk</span>
	</div>
	<div class="info">
		<div class="colors">
			<div class="color" style="background: var(--bg); border: 2px solid var(--bg-2);">bg</div>
			<div class="color" style="background: var(--bg-2);">bg-2</div>
			<div class="color" style="background: var(--bg-3);">bg-3</div>
			<div class="color" style="background: var(--txt-3); color: var(--bg);">txt-3</div>
			<div class="color" style="background: var(--txt-2); color: var(--bg);">txt-2</div>
			<div class="color" style="background: var(--txt); color: var(--bg);">txt</div>
			<div class="color" style="background: var(--txt-0); color: var(--bg);">txt-0</div>
			<div class="color" style="background: var(--pink); color: var(--bg);">pink</div>
			<div class="color" style="background: var(--purple); color: var(--bg);">purple</div>
			<div class="color" style="background: var(--blue); color: var(--bg);">blue</div>
		</div>
	</div>
</main>

<style>
	main {
		width: 100%;
		max-width: 53rem;
		margin: 0 auto 10rem auto;
		padding: 0 1.5rem;
	}

	a {
		font-family: 'Space Mono', monospace;
		font-size: 1.2rem;
		margin: 0.5rem 0;
		display: block;
	}

	.info {
		font-size: 1.2rem;
		margin: 0.5rem 0;
		font-family: 'Space Mono', monospace;
	}

	.colors {
		display: inline-flex;
		margin-top: 0.4rem;
		flex-wrap: wrap;
	}

	.color {
		display: inline-block;
		padding: 0 0.4rem;
		width: 5rem;
		text-align: center;
		font-size: 0.9em;
	}
</style>
