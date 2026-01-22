<script>
	import { onMount } from 'svelte';

	let audioContext;
	let pressedKeys = new Set();
	let isMouseDown = false;
	let keyElements = {};

	const KEYBOARD_MAP = {
		'z': 'C4', 's': 'C#4', 'x': 'D4', 'd': 'D#4', 'c': 'E4', 'v': 'F4',
		'g': 'F#4', 'b': 'G4', 'h': 'G#4', 'n': 'A4', 'j': 'A#4', 'm': 'B4',
		',': 'C5', 'l': 'C#5', '.': 'D5', ';': 'D#5', '/': 'E5', "'": 'F5',
		'\\': 'F#5', '[': 'G5', '=': 'G#5', ']': 'A5', '-': 'A#5'
	};

	const NOTE_FREQUENCIES = {
		'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
		'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
		'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
		'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99,
		'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77
	};

	const WHITE_KEYS = [
		{ note: 'C4', label: 'C', color: 'var(--blue)' },
		{ note: 'D4', label: 'D', color: 'var(--purple)' },
		{ note: 'E4', label: 'E', color: 'var(--pink)' },
		{ note: 'F4', label: 'F', color: 'var(--blue)' },
		{ note: 'G4', label: 'G', color: 'var(--purple)' },
		{ note: 'A4', label: 'A', color: 'var(--pink)' },
		{ note: 'B4', label: 'B', color: 'var(--blue)' },
		{ note: 'C5', label: 'C', color: 'var(--purple)' },
		{ note: 'D5', label: 'D', color: 'var(--pink)' },
		{ note: 'E5', label: 'E', color: 'var(--blue)' },
		{ note: 'F5', label: 'F', color: 'var(--purple)' },
		{ note: 'G5', label: 'G', color: 'var(--pink)' },
		{ note: 'A5', label: 'A', color: 'var(--blue)' }
	];

	const BLACK_KEYS = [
		{ note: 'C#4', label: 'C#', position: 0.5, color: 'var(--purple)' },
		{ note: 'D#4', label: 'D#', position: 1.5, color: 'var(--pink)' },
		{ note: 'F#4', label: 'F#', position: 3.5, color: 'var(--blue)' },
		{ note: 'G#4', label: 'G#', position: 4.5, color: 'var(--purple)' },
		{ note: 'A#4', label: 'A#', position: 5.5, color: 'var(--pink)' },
		{ note: 'C#5', label: 'C#', position: 7.5, color: 'var(--blue)' },
		{ note: 'D#5', label: 'D#', position: 8.5, color: 'var(--purple)' },
		{ note: 'F#5', label: 'F#', position: 10.5, color: 'var(--pink)' },
		{ note: 'G#5', label: 'G#', position: 11.5, color: 'var(--blue)' },
		{ note: 'A#5', label: 'A#', position: 12.5, color: 'var(--purple)' }
	];

	function playNote(frequency) {
		if (!audioContext) return;

		const now = audioContext.currentTime;
		const oscillator = audioContext.createOscillator();
		const gainNode = audioContext.createGain();

		oscillator.type = 'sine';
		oscillator.frequency.value = frequency;

		gainNode.gain.setValueAtTime(0.2, now);
		gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1);

		oscillator.connect(gainNode);
		gainNode.connect(audioContext.destination);

		oscillator.start(now);
		oscillator.stop(now + 1);
	}

	function handleKeyDown(note) {
		if (pressedKeys.has(note)) return;
		pressedKeys.add(note);
		pressedKeys = pressedKeys;

		const frequency = NOTE_FREQUENCIES[note];
		if (frequency) {
			playNote(frequency);
		}
	}

	function handleKeyUp(note) {
		pressedKeys.delete(note);
		pressedKeys = pressedKeys;
	}

	function handleMouseDown(note) {
		isMouseDown = true;
		handleKeyDown(note);
	}

	function handleMouseUp() {
		isMouseDown = false;
		pressedKeys.forEach((note) => handleKeyUp(note));
	}

	function handleMouseEnter(note) {
		if (!isMouseDown) return;
		handleKeyDown(note);
	}

	function handleMouseLeave(note) {
		if (!isMouseDown) return;
		handleKeyUp(note);
	}

	function handleTouchStart(note) {
		isMouseDown = true;
		handleKeyDown(note);
	}

	function handleTouchEnd() {
		isMouseDown = false;
		pressedKeys.forEach((note) => handleKeyUp(note));
	}

	onMount(() => {
		audioContext = new (window.AudioContext || window.webkitAudioContext)();

		function onKeyboardKeyDown(event) {
			const note = KEYBOARD_MAP[event.key.toLowerCase()];
			if (!note) return;
			event.preventDefault();
			handleKeyDown(note);
		}

		function onKeyboardKeyUp(event) {
			const note = KEYBOARD_MAP[event.key.toLowerCase()];
			if (!note) return;
			event.preventDefault();
			handleKeyUp(note);
		}

		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('touchend', handleTouchEnd);
		document.addEventListener('keydown', onKeyboardKeyDown);
		document.addEventListener('keyup', onKeyboardKeyUp);

		return () => {
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('touchend', handleTouchEnd);
			document.removeEventListener('keydown', onKeyboardKeyDown);
			document.removeEventListener('keyup', onKeyboardKeyUp);
		};
	});
</script>

<div class="piano-container">
	<div class="piano">
		<div class="white-keys">
			{#each WHITE_KEYS as key (key.note)}
				<button
					class="key white-key"
					class:active={pressedKeys.has(key.note)}
					style="--key-color: {key.color}"
					on:mousedown={() => handleMouseDown(key.note)}
					on:mouseenter={() => handleMouseEnter(key.note)}
					on:mouseleave={() => handleMouseLeave(key.note)}
					on:touchstart|preventDefault={() => handleTouchStart(key.note)}
				>
					<span>{key.label}</span>
				</button>
			{/each}
		</div>
		<div class="black-keys">
			{#each BLACK_KEYS as key (key.note)}
				<button
					class="key black-key"
					class:active={pressedKeys.has(key.note)}
					style="left: calc({key.position} * var(--key-width)); --key-color: {key.color}"
					on:mousedown={() => handleMouseDown(key.note)}
					on:mouseenter={() => handleMouseEnter(key.note)}
					on:mouseleave={() => handleMouseLeave(key.note)}
					on:touchstart|preventDefault={() => handleTouchStart(key.note)}
				>
					<span>{key.label}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.piano-container {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		padding: 0 1rem;
	}

	.piano {
		position: relative;
		--key-width: 3.5rem;
		width: calc(13 * var(--key-width));
		height: 12rem;
		background: var(--bg-3);
		border: 1px solid var(--txt-3);
		padding: 1rem;
		display: flex;
		flex-direction: column;
		touch-action: manipulation;
	}

	.white-keys {
		display: flex;
		gap: 0;
		height: 100%;
		position: relative;
		z-index: 1;
	}

	.black-keys {
		position: absolute;
		top: 1rem;
		left: 1rem;
		width: calc(13 * var(--key-width));
		height: 7rem;
	}

	.key {
		border: 1px solid var(--txt-3);
		cursor: pointer;
		font-family: 'Space Mono', monospace;
		font-size: 0.75rem;
		font-weight: 400;
		transition: all 0.1s ease;
		user-select: none;
		-webkit-user-select: none;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 0.5rem;
		touch-action: manipulation;
	}

	.white-key {
		flex: 1;
		background: var(--bg-2);
		color: var(--txt-2);
		border-right: none;
	}

	.white-key:last-child {
		border-right: 1px solid var(--txt-3);
	}

	.white-key:hover {
		background: var(--bg-3);
		color: var(--txt);
	}

	.white-key.active {
		background: var(--key-color);
		color: var(--bg);
		border-color: var(--key-color);
	}

	.black-key {
		position: absolute;
		width: 2.2rem;
		height: 100%;
		background: var(--bg);
		color: var(--txt-2);
		border: 1px solid var(--txt-3);
		margin-left: calc(var(--key-width) * -0.5);
		z-index: 2;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		padding-bottom: 0.4rem;
	}

	.black-key:hover {
		background: var(--bg-2);
		color: var(--txt);
	}

	.black-key.active {
		background: var(--key-color);
		color: var(--bg);
		border-color: var(--key-color);
	}

	.key span {
		font-size: 0.65rem;
		opacity: 0.7;
	}

	.black-key span {
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		.piano {
			--key-width: 2.5rem;
			height: 10rem;
			padding: 0.75rem;
		}

		.black-keys {
			top: 0.75rem;
			left: 0.75rem;
		}

		.key {
			font-size: 0.65rem;
			padding-bottom: 0.3rem;
		}

		.black-key {
			padding-bottom: 0.3rem;
		}
	}

	@media (max-width: 480px) {
		.piano {
			--key-width: 2rem;
			height: 8rem;
			padding: 0.5rem;
			width: calc(13 * var(--key-width));
		}

		.black-keys {
			top: 0.5rem;
			left: 0.5rem;
			width: calc(13 * var(--key-width));
		}

		.key {
			font-size: 0.55rem;
			padding-bottom: 0.2rem;
		}

		.black-key {
			width: 1.6rem;
			padding-bottom: 0.2rem;
		}

		.key span {
			font-size: 0.55rem;
		}
	}
</style>
