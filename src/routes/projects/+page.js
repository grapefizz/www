import { getPosts } from '$lib/js/posts.js';

export async function load() {
	const modules = import.meta.glob('/src/content/projects/*/*.md');
	let posts = await getPosts(modules);
	posts = posts.sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});

	return {
		posts,
		meta: {
			title: 'projects',
			description: "projects i've worked on."
		}
	};
}
