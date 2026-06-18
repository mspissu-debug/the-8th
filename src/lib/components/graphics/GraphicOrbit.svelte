<!-- 8 punti su orbita — marchio THE 8th -->
<script lang="ts">
	let { size = 120 }: { size?: number } = $props();

	const colors = ['var(--indigo)', 'var(--grape)', 'var(--sky)', 'var(--black)'];

	const dots = Array.from({ length: 8 }, (_, i) => {
		const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
		return {
			x: 50 + Math.cos(a) * 38,
			y: 50 + Math.sin(a) * 38,
			i,
			fill: colors[i % colors.length]
		};
	});
</script>

<svg
	class="graphic-orbit"
	width={size}
	height={size}
	viewBox="0 0 100 100"
	aria-hidden="true"
>
	<circle cx="50" cy="50" r="38" fill="none" stroke="var(--grape)" stroke-width="0.85" opacity="0.55" />
	{#each dots as d (d.i)}
		<circle
			cx={d.x}
			cy={d.y}
			r="4"
			fill={d.fill}
			opacity={0.5 + (d.i % 2) * 0.2}
			class="graphic-orbit__dot"
			style="--i: {d.i}"
		/>
	{/each}
	<circle cx="50" cy="50" r="3" fill="var(--grape)" opacity="0.5" />
</svg>

<style>
	.graphic-orbit {
		display: block;
	}

	.graphic-orbit__dot {
		animation: orbit-pulse 3s ease-in-out infinite;
		animation-delay: calc(var(--i) * 0.2s);
	}

	@keyframes orbit-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.4;
		}
		50% {
			transform: scale(1.35);
			opacity: 0.9;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.graphic-orbit__dot {
			animation: none;
		}
	}
</style>
