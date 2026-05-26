import { nameFromPath, importOgImage } from '$lib/js/posts.js';
import { error } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function load({ params }) {
	const modules = import.meta.glob('/src/content/lora/*/*.md');

	let match = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (nameFromPath(path) === params.slug) {
			match = { path, resolver };
			break;
		}
	}

	const post = await match?.resolver?.();

	if (!post || (!post.metadata.published && !dev)) {
		throw error(404, 'post not found');
	}

	const metadata = { ...post.metadata };

	if (params.slug === 'favoritepics') {
		const pictures = import.meta.glob(
			'/src/content/lora/favoritepics/pics/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}',
			{
				eager: true,
				query: {
					enhanced: true,
					w: '2000;1200;800'
				}
			}
		);

		metadata.pictureCount = Object.keys(pictures).length;
	}

	let image;

	if (metadata.ogImage) {
		const imagePath = match.path.split('/').slice(0, -1).join('/') + '/' + metadata.ogImage;
		image = await importOgImage(imagePath);
	}

	return {
		post: {
			...post,
			metadata
		},
		meta: {
			title: metadata.name,
			description: metadata.description,
			type: 'article',
			image
		}
	};
}
