<script lang="ts">
	import GraphicMesh from '$lib/components/graphics/GraphicMesh.svelte';
	import GraphicRings from '$lib/components/graphics/GraphicRings.svelte';
	import GraphicOrbit from '$lib/components/graphics/GraphicOrbit.svelte';
	import { reveal } from '$lib/reveal';
	import { scrollScene } from '$lib/scroll-scene';
	import { messages } from '$lib/i18n';

	let infoInView = $state(false);
</script>

<section class="hero" id="hero">
	<div class="hero__tint hero__tint--a" aria-hidden="true"></div>
	<div class="hero__tint hero__tint--b" aria-hidden="true"></div>
	<div class="hero__tint hero__tint--c" aria-hidden="true"></div>
	<div class="hero__tint hero__tint--d" aria-hidden="true"></div>

	<div class="hero__graphics" aria-hidden="true">
		<GraphicMesh />
		<div
			class="hero__rings-parallax"
			use:scrollScene={{ parallaxY: 48, scale: [0.92, 1], opacity: [0.65, 1] }}
		>
			<div class="hero__rings-wrap" use:reveal={{ variant: 'scale', threshold: 0.08 }}>
				<GraphicRings size={520} />
			</div>
		</div>
		<div
			class="hero__orbit-parallax"
			use:scrollScene={{ parallaxY: -32, rotate: [-6, 8] }}
		>
			<div class="hero__orbit-wrap" use:reveal={{ variant: 'fade', threshold: 0.1 }}>
				<GraphicOrbit size={140} />
			</div>
		</div>
	</div>

	<h1 class="hero__title" use:scrollScene={{ opacity: [1, 0.35], scale: [1, 0.94] }}>
		<span class="hero__line hero__line--the">The</span>
		<span class="hero__line hero__line--eight">8</span>
	</h1>

	<p class="hero__sub" use:reveal={{ variant: 'clip-up', threshold: 0.35 }}>{$messages.home.heroSub}</p>

	<div
		class="hero__meta"
		use:reveal={{ variant: 'fade', threshold: 0.4, onInView: () => (infoInView = true) }}
	>
		<div class="hero__stat hero__stat--a home-stagger" class:in-view={infoInView} style="--delay: 0s">
			<span class="hero__num">04</span>
			<span class="hero__label">{$messages.home.students}</span>
		</div>
		<div class="hero__stat hero__stat--b home-stagger" class:in-view={infoInView} style="--delay: 0.12s">
			<span class="hero__num">04</span>
			<span class="hero__label">{$messages.home.mentors}</span>
		</div>
		<div class="hero__stat hero__stat--c home-stagger" class:in-view={infoInView} style="--delay: 0.24s">
			<span class="hero__num">12</span>
			<span class="hero__label">{$messages.home.months}</span>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		min-height: min(92dvh, 860px);
		padding: clamp(5rem, 9vh, 6rem) clamp(1.25rem, 4vw, 2.5rem) clamp(2rem, 4vh, 2.5rem);
		padding-left: clamp(6.5rem, 14vw, 10rem);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 0;
		border-bottom: 1px solid var(--line);
		overflow: hidden;
		background: linear-gradient(
				165deg,
				var(--white) 0%,
				color-mix(in srgb, var(--sky) 42%, var(--white)) 38%,
				color-mix(in srgb, var(--grape) 8%, var(--white)) 62%,
				var(--white) 100%
			),
			linear-gradient(90deg, color-mix(in srgb, var(--indigo) 6%, transparent) 0%, transparent 40%);
	}

	.hero__tint {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		pointer-events: none;
	}

	.hero__tint--a {
		width: min(45vw, 360px);
		height: min(45vw, 360px);
		top: 5%;
		right: 10%;
		background: var(--sky);
		opacity: 0.45;
	}

	.hero__tint--b {
		width: min(35vw, 280px);
		height: min(35vw, 280px);
		bottom: 20%;
		left: 0;
		background: var(--grape);
		opacity: 0.28;
	}

	.hero__tint--c {
		width: min(28vw, 220px);
		height: min(28vw, 220px);
		top: 42%;
		left: 35%;
		background: var(--indigo);
		opacity: 0.14;
	}

	.hero__tint--d {
		width: min(22vw, 180px);
		height: min(22vw, 180px);
		bottom: 8%;
		right: 28%;
		background: var(--sky);
		opacity: 0.55;
	}

	.hero__graphics {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.hero__rings-parallax {
		position: absolute;
		top: clamp(38%, 42vh, 48%);
		right: clamp(-2%, 2vw, 6%);
		transform: translateY(-50%);
		will-change: transform, opacity;
	}

	.hero__rings-wrap {
		opacity: 0.95;
		animation: hero-float 18s ease-in-out infinite;
	}

	.hero__orbit-parallax {
		position: absolute;
		top: clamp(36%, 40vh, 46%);
		left: clamp(5rem, 12vw, 9rem);
		transform: translateY(-50%);
		will-change: transform;
	}

	.hero__orbit-wrap {
		opacity: 0.85;
		animation: hero-float 14s ease-in-out infinite reverse;
	}

	@keyframes hero-float {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(-12px, 14px);
		}
	}

	.hero__orbit-wrap {
		animation-name: hero-float-orbit;
	}

	@keyframes hero-float-orbit {
		0%,
		100% {
			transform: translate(0, 0);
		}
		50% {
			transform: translate(10px, -12px);
		}
	}

	.hero__title {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		line-height: 0.88;
		letter-spacing: -0.04em;
		max-width: min(90vw, 900px);
		margin-top: clamp(0.5rem, 3vh, 1.5rem);
	}

	.hero__line {
		font-family: var(--font-display);
		font-weight: 700;
		text-transform: uppercase;
		display: block;
		animation: reveal-up 1s var(--ease) both;
	}

	.hero__line--the {
		font-size: clamp(3rem, 10vw, 8rem);
		color: var(--black);
		animation-delay: 0.15s;
	}

	.hero__line--eight {
		font-size: clamp(4.5rem, 16vw, 13rem);
		padding-left: clamp(0.5rem, 8vw, 6rem);
		background: linear-gradient(135deg, var(--indigo) 0%, var(--grape) 55%, var(--sky) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		animation-delay: 0.3s;
	}

	.hero__sub {
		position: relative;
		z-index: 1;
		margin-top: clamp(1.25rem, 3vh, 2rem);
		font-size: 0.52rem;
		letter-spacing: 0.4em;
		color: var(--grape);
	}

	.hero__sub::before {
		content: '◆';
		color: var(--sky);
		margin-right: 0.6em;
		font-size: 0.65em;
	}

	.hero__meta {
		position: relative;
		z-index: 1;
		display: flex;
		align-items: flex-end;
		gap: clamp(2rem, 6vw, 5rem);
		margin-top: auto;
		padding-top: clamp(1.25rem, 3vh, 2rem);
		border-top: 1px solid color-mix(in srgb, var(--indigo) 25%, transparent);
	}

	.hero__stat {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		min-width: 4.5rem;
	}

	.hero__num {
		font-family: var(--font-display);
		font-size: 1.75rem;
		font-weight: 700;
		line-height: 1;
		letter-spacing: -0.03em;
	}

	.hero__label {
		font-size: 0.52rem;
		letter-spacing: 0.32em;
		color: var(--fg-muted);
	}

	.hero__stat--a .hero__num {
		color: var(--indigo);
	}
	.hero__stat--b .hero__num {
		color: var(--grape);
	}
	.hero__stat--c .hero__num {
		color: var(--sky);
		text-shadow: 0 0 24px color-mix(in srgb, var(--sky) 80%, transparent);
	}

	@media (max-width: 800px) {
		.hero {
			padding-left: clamp(1.25rem, 4vw, 2.5rem);
		}

		.hero {
			min-height: min(88dvh, 780px);
			padding-top: clamp(4.5rem, 8vh, 5.5rem);
		}

		.hero__rings-parallax {
			right: -12%;
			top: 40%;
		}

		.hero__orbit-parallax {
			left: 8%;
			top: 38%;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero__rings-wrap,
		.hero__orbit-wrap {
			animation: none;
		}
	}
</style>
