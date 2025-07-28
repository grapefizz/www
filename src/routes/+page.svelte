<script>
	import { onMount } from 'svelte';

	let svgContainer;
	let animationComplete = false;
	let showElements = { axis1: false, axis2: false, parabola: false };
	let isHovering = false;
	let isSpinning = false;
	let spinCompleted = false;

	function startSpinAnimation() {
		if (isSpinning) return;
		isSpinning = true;
		spinCompleted = false;
		
		const parabola = document.querySelector('.parabola');
		const spinLine = document.querySelector('.spin-line');
		
		if (!parabola || !spinLine) return;
		
		// Hide the spin line initially
		spinLine.style.opacity = '0';
		
		// First, morph the parabola into a diagonal line with smoother transition
		const morphDuration = 500; // Faster morph transition
		const morphStartTime = performance.now();
		
		// Original parabola path
		const originalPath = "M 65 60 Q 100 90 135 60";
		// Target diagonal line path (as a path, not a line element)
		const diagonalPath = "M 70 55 L 130 95";
		
		function morphAnimate(currentTime) {
			const elapsed = currentTime - morphStartTime;
			const progress = Math.min(elapsed / morphDuration, 1);
			
			// Use a smoother easing function - easeInOutCubic instead of easeInOutQuart
			const eased = progress < 0.5 
				? 4 * progress * progress * progress 
				: 1 - Math.pow(-2 * progress + 2, 3) / 2;
			
			// Smooth interpolation from parabola to diagonal line
			const startX = 65 + (70 - 65) * eased;
			const startY = 60 + (55 - 60) * eased;
			const endX = 135 + (130 - 135) * eased;
			const endY = 60 + (95 - 60) * eased;
			
			// Gradually flatten the control point more smoothly
			const controlX = 100;
			const controlY = 90 + (75 - 90) * eased;
			
			// Use a more gradual transition threshold
			if (eased < 0.85) {
				// Longer curve phase for smoother transition
				const morphedPath = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
				parabola.setAttribute('d', morphedPath);
			} else {
				// Final 15% - transition to straight line
				const morphedPath = `M ${startX} ${startY} L ${endX} ${endY}`;
				parabola.setAttribute('d', morphedPath);
			}
			
			// Start spinning when morph is 90% complete
			if (progress >= 0.9 && !spinStarted) {
				spinStarted = true;
				startSpinning();
			}
			
			if (progress < 1) {
				requestAnimationFrame(morphAnimate);
			}
		}
		
		let spinStarted = false;
		
		function startSpinning() {
			const spinStartTime = performance.now();
			const duration = 1200; // Faster spin - 1.2 seconds
			const totalRotations = 1; // Just 1 full rotation
			
			function animate(currentTime) {
				const elapsed = currentTime - spinStartTime;
				const progress = Math.min(elapsed / duration, 1);
				
				// easeInOutQuart (same as initial page animation)
				const eased = progress < 0.5 
					? 8 * progress * progress * progress * progress 
					: 1 - Math.pow(-2 * progress + 2, 4) / 2;
				
				const rotation = totalRotations * 360 * eased;
				parabola.style.transform = `rotate(${rotation}deg)`;
				parabola.style.transformOrigin = '100px 75px';
				
				if (progress < 1) {
					requestAnimationFrame(animate);
				} else {
					// Spinning animation complete
					spinCompleted = true;
					isSpinning = false;
					
					// If mouse is no longer hovering, morph back
					if (!isHovering) {
						morphBackToParabola();
					}
				}
			}
			
			requestAnimationFrame(animate);
		}
		
		requestAnimationFrame(morphAnimate);
	}

	function morphBackToParabola() {
		const parabola = document.querySelector('.parabola');
		
		if (!parabola) return;
		
		// Reset rotation and transform
		parabola.style.transform = 'rotate(0deg)';
		parabola.style.transformOrigin = '';
		
		// Morph back to original parabola with smooth transition
		const morphDuration = 500; // Same faster duration as forward morph
		const morphStartTime = performance.now();
		
		function morphBack(currentTime) {
			const elapsed = currentTime - morphStartTime;
			const progress = Math.min(elapsed / morphDuration, 1);
			
			// Use the same smoother easing - easeInOutCubic
			const eased = progress < 0.5 
				? 4 * progress * progress * progress 
				: 1 - Math.pow(-2 * progress + 2, 3) / 2;
			
			// Smooth interpolation from diagonal line back to parabola
			const startX = 70 + (65 - 70) * eased;
			const startY = 55 + (60 - 55) * eased;
			const endX = 130 + (135 - 130) * eased;
			const endY = 95 + (60 - 95) * eased;
			
			// Gradually raise the control point
			const controlX = 100;
			const controlY = 75 + (90 - 75) * eased;
			
			// Create smooth transition from line back to curve
			if (eased < 0.15) {
				// First 15%: stay as straight line
				const morphedPath = `M ${startX} ${startY} L ${endX} ${endY}`;
				parabola.setAttribute('d', morphedPath);
			} else {
				// Remaining 85%: transition to curved parabola
				const morphedPath = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
				parabola.setAttribute('d', morphedPath);
			}
			
			if (progress < 1) {
				requestAnimationFrame(morphBack);
			} else {
				// Reset to original state
				spinCompleted = false;
			}
		}
		
		requestAnimationFrame(morphBack);
	}

	function stopSpinAnimation() {
		// Only morph back if spinning is complete
		if (spinCompleted || !isSpinning) {
			morphBackToParabola();
		}
		// If spinning is still in progress, morphBackToParabola will be called when it completes
	}

	function handleMouseEnter() {
		isHovering = true;
		startSpinAnimation();
	}

	function handleMouseLeave() {
		isHovering = false;
		stopSpinAnimation();
	}

	onMount(() => {
		// Animate Y-axis from top to bottom
		setTimeout(() => {
			showElements.axis1 = true;
			const yAxis = document.querySelector('.axis-y');
			if (yAxis) {
				let progress = 0;
				const animate = () => {
					progress += 0.025; // Slightly slower
					const currentY = 25 + (100 * progress); // 25 to 125
					yAxis.setAttribute('y2', Math.min(currentY, 125));
					if (progress < 1) {
						requestAnimationFrame(animate);
					}
				};
				animate();
			}
		}, 200);
		
		// Animate X-axis from left to right
		setTimeout(() => {
			showElements.axis2 = true;
			const xAxis = document.querySelector('.axis-x');
			if (xAxis) {
				let progress = 0;
				const animate = () => {
					progress += 0.025; // Slightly slower
					const currentX = 50 + (100 * progress); // 50 to 150
					xAxis.setAttribute('x2', Math.min(currentX, 150));
					if (progress < 1) {
						requestAnimationFrame(animate);
					}
				};
				animate();
			}
		}, 900);
		
		// Animate parabola from left to right
		setTimeout(() => {
			showElements.parabola = true;
		}, 1600);
		
		setTimeout(() => {
			animationComplete = true;
		}, 2400);
	});
</script>

<main>
	<div class="container">
		<div class="row">
			<h1>grapefizz</h1>
			<div class="svg-container" class:animated={animationComplete} bind:this={svgContainer} 
				 on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
				<svg width="160" height="120" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
					<!-- Y-axis - draws from top to bottom -->
					<line 
						x1="100" y1="25" x2="100" y2="25" 
						stroke="#bd63ee" stroke-width="5" stroke-linecap="round"
						class="axis-y" class:visible={showElements.axis1}
					/>
					
					<!-- X-axis - draws from left to right -->
					<line 
						x1="50" y1="75" x2="50" y2="75" 
						stroke="#6363ee" stroke-width="5" stroke-linecap="round"
						class="axis-x" class:visible={showElements.axis2}
					/>
					
					<!-- Parabola - draws from left to right, morphs on hover -->
					<path 
						d="M 65 60 Q 100 90 135 60" 
						stroke="#26bbd9" stroke-width="7 " fill="none" stroke-linecap="round"
						class="parabola" class:visible={showElements.parabola}
						pathLength="100"
					/>
					
					<!-- Spinning line - larger diagonal line for hover effect -->
					<line 
						x1="70" y1="55" x2="130" y2="95" 
						stroke="#26bbd9" stroke-width="7" stroke-linecap="round"
						class="spin-line"
						style="opacity: 0; transform-origin: 100px 75px;"
					/>
				</svg>
			</div>
		</div>
		<p>heyo! i'm a highschool student interested in comp sci and stuff.</p>
		<nav>
			<a class="nav" href="/about">
				<span class="arrow">-></span><span class="slash">/</span>about
			</a>
			<a class="nav" href="/projects">
				<span class="arrow">-></span><span class="slash">/</span>projects
			</a>
			<a class="nav" href="/blog">
				<span class="arrow">-></span><span class="slash">/</span>blog
			</a>
			<a class="nav" href="/pics">
				<span class="arrow">-></span><span class="slash">/</span>pics
			</a>
			<a class="nav" href="/contact">
				<span class="arrow">-></span><span class="slash">/</span>contact
			</a>
		</nav>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		max-height: calc(100vh - 12rem);
		margin: 0 1.5rem;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 2rem;
	}

	.svg-container {
		width: 10rem;
		height: 7.5rem;
		opacity: 1;
		transform: scale(1);
		cursor: pointer;
	}

	.svg-container.animated {
		opacity: 1;
		transform: scale(1);
	}

	.svg-container svg {
		width: 100%;
		height: 100%;
		filter: drop-shadow(0 0 8px rgba(189, 99, 238, 0.2));
	}

	/* Y-axis animation: grows from top to bottom */
	.svg-container svg .axis-y {
		opacity: 0;
		transform-origin: 100px 25px;
	}

	.svg-container svg .axis-y.visible {
		opacity: 1;
		animation: elasticAppear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
	}

	/* X-axis animation: grows from left to right */
	.svg-container svg .axis-x {
		opacity: 0;
		transform-origin: 50px 75px;
	}

	.svg-container svg .axis-x.visible {
		opacity: 1;
		animation: elasticAppear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
	}

	/* Parabola animation: draws from left to right */
	.svg-container svg .parabola {
		stroke-dasharray: 100;
		stroke-dashoffset: 100;
		opacity: 0;
	}

	.svg-container svg .parabola.visible {
		opacity: 1;
		animation: drawParabola 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards;
	}

	.svg-container svg .spin-line {
		opacity: 0;
		transform-origin: 100px 75px;
		transition: opacity 0.3s ease, transform 0.1s ease;
	}

	@keyframes elasticAppear {
		0% {
			opacity: 0;
			transform: scale(0.3);
		}
		50% {
			opacity: 1;
			transform: scale(1.05);
		}
		70% {
			transform: scale(0.95);
		}
		100% {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes drawParabola {
		0% {
			stroke-dashoffset: 100;
			opacity: 0;
		}
		20% {
			opacity: 1;
		}
		60% {
			stroke-dashoffset: 0;
		}
		75% {
			stroke-width: 9;
			filter: drop-shadow(0 0 8px rgba(38, 187, 217, 0.8));
		}
		85% {
			stroke-width: 6;
		}
		100% {
			stroke-dashoffset: 0;
			stroke-width: 7;
			filter: drop-shadow(0 0 4px rgba(38, 187, 217, 0.4));
		}
	}

	h1 {
		font-size: 3.2rem;
		margin: 0;
	}

	nav {
		display: flex;
		gap: 2rem;

		a {
			font-size: 1.5rem;
			font-family: 'Space Mono', monospace;
		}
	}

	p {
		font-size: 1.2rem;
		margin: 1.25rem 0;
	}

	@media (max-width: 600px) {
		nav {
			flex-direction: column;
			gap: 1rem;
		}
		.row {
			flex-direction: column-reverse;
			gap: 0.5rem;
			align-items: flex-start;
		}
	}
</style>
