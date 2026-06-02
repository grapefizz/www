<script>
	import { onMount } from 'svelte';

	let {
		date,
		unit = 'days',
		singular = undefined,
		plural = undefined,
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

	function normalizeUnit(value) {
		const normalized = String(value ?? 'days').toLowerCase();

		return (
			{
				second: 'seconds',
				seconds: 'seconds',
				minute: 'minutes',
				minutes: 'minutes',
				miuntes: 'minutes',
				hour: 'hours',
				hours: 'hours',
				day: 'days',
				days: 'days',
				week: 'weeks',
				weeks: 'weeks',
				month: 'months',
				months: 'months',
				year: 'years',
				years: 'years'
			}[normalized] ?? 'days'
		);
	}

	function singularUnit(value) {
		return {
			seconds: 'second',
			minutes: 'minute',
			hours: 'hour',
			days: 'day',
			weeks: 'week',
			months: 'month',
			years: 'year'
		}[value];
	}

	function countFullMonths(from, to) {
		let months =
			(to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());

		const monthCandidate = new Date(from);
		monthCandidate.setMonth(from.getMonth() + months);

		if (monthCandidate > to) {
			months -= 1;
		}

		return Math.max(0, months);
	}

	function countElapsed(from, to, selectedUnit) {
		const elapsed = to - from;

		if (elapsed <= 0) {
			return 0;
		}

		switch (selectedUnit) {
			case 'seconds':
				return Math.floor(elapsed / 1000);
			case 'minutes':
				return Math.floor(elapsed / 60_000);
			case 'hours':
				return Math.floor(elapsed / 3_600_000);
			case 'weeks':
				return Math.floor((startOfDay(to) - startOfDay(from)) / 604_800_000);
			case 'months':
				return countFullMonths(from, to);
			case 'years':
				return Math.floor(countFullMonths(from, to) / 12);
			case 'days':
			default:
				return Math.floor((startOfDay(to) - startOfDay(from)) / 86_400_000);
		}
	}

	const start = $derived(parseDate(date));
	const selectedUnit = $derived(normalizeUnit(unit));
	const isValidDate = $derived(!Number.isNaN(start.getTime()));
	const count = $derived(isValidDate ? countElapsed(start, now, selectedUnit) : 0);
	const singularLabel = $derived(singular ?? singularUnit(selectedUnit));
	const pluralLabel = $derived(plural ?? selectedUnit);
	const label = $derived(count === 1 ? singularLabel : pluralLabel);
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
	const formattedCount = $derived(String(count).replace(/\B(?=(\d{3})+(?!\d))/g, ','));

	onMount(() => {
		const intervalMs = selectedUnit === 'seconds' ? 1_000 : 60_000;
		const interval = window.setInterval(() => {
			now = new Date();
		}, intervalMs);

		return () => window.clearInterval(interval);
	});
</script>

{#if isValidDate}
	<span class="day-tracker">
		<span class="count">{formattedCount}</span>
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

	@media (max-width: 600px) {
		.day-tracker {
			font-size: 0.78em;
		}
	}
</style>
