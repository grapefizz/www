<script>
	// Simple static logo - no animations
</script>

<svg 
	width="160" height="120" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg"
>
	<!-- Y-axis -->
	<line 
		x1="100" y1="25" x2="100" y2="125" 
		stroke="#bd63ee" stroke-width="5" stroke-linecap="round"
		class="logo-axis-y"
	/>
	
	<!-- X-axis -->
	<line 
		x1="50" y1="75" x2="150" y2="75" 
		stroke="#6363ee" stroke-width="5" stroke-linecap="round"
		class="logo-axis-x"
	/>
	
	<!-- Parabola -->
	<path 
		d="M 65 60 Q 100 90 135 60" 
		stroke="#26bbd9" stroke-width="7" fill="none" stroke-linecap="round"
		class="logo-parabola"
	/>
</svg>

<style>
	svg {
		width: var(--width);
		height: var(--height);
	}
</style>
