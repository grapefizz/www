import * as lora from '../../content/lora/lora.md';

export function load() {
	return {
		content: lora,
		meta: {
			title: lora.metadata.title,
			description: lora.metadata.description
		}
	};
}
