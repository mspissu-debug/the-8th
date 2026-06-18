<script lang="ts">
	let {
		size = 420,
		slow = false
	}: { size?: number; slow?: boolean } = $props();

	const uid = $derived(`gr-${size}`);
</script>

<svg
	class="graphic-rings"
	class:graphic-rings--slow={slow}
	width={size}
	height={size}
	viewBox="0 0 400 400"
	aria-hidden="true"
>
	<defs>
		<linearGradient id="{uid}-a" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" stop-color="var(--sky)" />
			<stop offset="35%" stop-color="var(--grape)" />
			<stop offset="70%" stop-color="var(--indigo)" />
			<stop offset="100%" stop-color="var(--black)" />
		</linearGradient>
		<linearGradient id="{uid}-eight" x1="0%" y1="0%" x2="0%" y2="100%">
			<stop offset="0%" stop-color="var(--sky)" />
			<stop offset="45%" stop-color="var(--grape)" />
			<stop offset="100%" stop-color="var(--indigo)" />
		</linearGradient>
		<linearGradient id="{uid}-text" x1="0%" y1="0%" x2="100%" y2="100%">
			<stop offset="0%" stop-color="var(--indigo)" />
			<stop offset="50%" stop-color="var(--grape)" />
			<stop offset="100%" stop-color="var(--sky)" />
		</linearGradient>
	</defs>

	<g class="graphic-rings__spin">
		<circle
			cx="200"
			cy="200"
			r="175"
			fill="none"
			stroke="url(#{uid}-a)"
			stroke-width="1.5"
			opacity="0.62"
		/>
		<circle
			cx="200"
			cy="200"
			r="138"
			fill="none"
			stroke="var(--sky)"
			stroke-width="1"
			opacity="0.68"
			stroke-dasharray="4 10"
		/>
		<circle
			cx="200"
			cy="200"
			r="100"
			fill="none"
			stroke="var(--grape)"
			stroke-width="1.75"
			opacity="0.78"
		/>
		<circle
			cx="200"
			cy="200"
			r="62"
			fill="none"
			stroke="var(--indigo)"
			stroke-width="1"
			opacity="0.52"
			stroke-dasharray="2 6"
		/>

		{#each Array(8) as _, i (i)}
			{@const a = (i / 8) * Math.PI * 2 - Math.PI / 2}
			{@const x = 200 + Math.cos(a) * 118}
			{@const y = 200 + Math.sin(a) * 118}
			{@const fills = [
				'var(--indigo)',
				'var(--grape)',
				'var(--sky)',
				'var(--black)',
				'var(--grape)',
				'var(--sky)',
				'var(--indigo)',
				'var(--grape)'
			]}
			<circle
				cx={x}
				cy={y}
				r="3.5"
				fill={fills[i]}
				opacity="0.7"
				class="graphic-rings__orbit-dot"
				style="--i: {i}"
			/>
		{/each}
	</g>

	<g class="graphic-rings__eight">
		<path
			class="graphic-rings__eight-ring"
			d="M 158 200 C 158 152 242 152 242 200 C 242 248 158 248 158 200"
			fill="none"
			stroke="url(#{uid}-eight)"
			stroke-width="4"
			stroke-linecap="round"
			opacity="0.9"
		/>
		<text
			class="graphic-rings__eight-num"
			x="200"
			y="200"
			text-anchor="middle"
			dominant-baseline="central"
			font-family="'Space Grotesk', system-ui, sans-serif"
			font-size="92"
			font-weight="700"
			fill="url(#{uid}-text)"
		>
			8
		</text>
	</g>
</svg>

<style>
	.graphic-rings {
		display: block;
	}

	.graphic-rings__spin {
		transform-origin: 200px 200px;
		animation: rings-spin 64s linear infinite;
	}

	.graphic-rings--slow .graphic-rings__spin {
		animation-duration: 96s;
	}

	.graphic-rings__eight {
		transform-origin: 200px 200px;
		animation: eight-float 5s ease-in-out infinite;
	}

	.graphic-rings__eight-num {
		transform-origin: 200px 200px;
		animation: eight-breathe 3.2s ease-in-out infinite;
	}

	.graphic-rings__eight-ring {
		transform-origin: 200px 200px;
		stroke-dasharray: 300;
		animation: eight-ring-draw 4s ease-in-out infinite alternate;
	}

	.graphic-rings__orbit-dot {
		animation: orbit-pulse 3s ease-in-out infinite;
		animation-delay: calc(var(--i) * 0.25s);
	}

	@keyframes rings-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes eight-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(5px);
		}
	}

	@keyframes eight-breathe {
		0%,
		100% {
			opacity: 0.9;
		}
		50% {
			opacity: 1;
		}
	}

	@keyframes eight-ring-draw {
		from {
			stroke-dashoffset: 60;
			opacity: 0.65;
		}
		to {
			stroke-dashoffset: 0;
			opacity: 0.95;
		}
	}

	@keyframes orbit-pulse {
		0%,
		100% {
			opacity: 0.45;
		}
		50% {
			opacity: 0.95;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.graphic-rings__spin,
		.graphic-rings__eight,
		.graphic-rings__eight-num,
		.graphic-rings__eight-ring,
		.graphic-rings__orbit-dot {
			animation: none;
		}
	}
</style>
