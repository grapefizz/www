<script>
	import { onMount } from 'svelte';

	let {
		date,
		singular = 'day',
		plural = 'days',
		showSince = true,
		locale = undefined
	} = $props();

	let now = $state(new Date());

	function parseDate(value) {
		if (value instanceof Date) {
			return value;
		}

		if (typeof value === 'string') {
			const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

			if (match) {
				const [, year, month, day] = match;
				return new Date(Number(year), Number(month) - 1, Number(day));
			}
		}

		return new Date(value);
	}

	function startOfDay(value) {
		return new Date(value.getFullYear(), value.getMonth(), value.getDate());
	}

	const start = $derived(parseDate(date));
	const isValidDate = $derived(!Number.isNaN(start.getTime()));
	const days = $derived(
		isValidDate
			? Math.max(0, Math.floor((startOfDay(now) - startOfDay(start)) / 86_400_000))
			: 0
	);
	const label = $derived(days === 1 ? singular : plural);
	const formattedDate = $derived(
		isValidDate
			? new Intl.DateTimeFormat(locale, {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				}).format(start)
			: ''
	);
	const datetime = $derived(isValidDate ? start.toISOString().slice(0, 10) : '');

	onMount(() => {
		const interval = window.setInterval(() => {
			now = new Date();
		}, 60_000);

		return () => window.clearInterval(interval);
	});
</script>

{#if isValidDate}
	<span class="day-tracker">
		<span class="count">{days}</span>
		<span class="label">{label}</span>
		{#if showSince}
			<span class="since">since <time {datetime}>{formattedDate}</time></span>
		{/if}
	</span>
{:else}
	<span class="day-tracker invalid">invalid date</span>
{/if}

<style>
	.day-tracker {
		display: inline-flex;
		align-items: baseline;
		gap: 0.45ch;
		font-family: 'Space Mono', monospace;
	}

	.count {
		color: var(--txt-0);
	}

	.since,
	.invalid {
		color: var(--txt-2);
	}
</style>
