<script lang="ts">
	import { NARRATIVE_PHRASES } from '$lib/content';
	import { reveal } from '$lib/reveal';

	const beats = [
		{ id: 'panel-left', align: 'left' as const },
		{ id: 'rings', align: 'center' as const },
		{ id: 'vision', align: 'center' as const },
		{ id: 'duo', align: 'split' as const },
		{ id: 'digits', align: 'center' as const },
		{ id: 'finale', align: 'center' as const }
	] as const;
</script>

<section id="narrativa" class="sequence">
	{#each NARRATIVE_PHRASES as phrase, i (i)}
		{@const beat = beats[i]}
		<article class="beat beat--{beat.id}" use:reveal={{ threshold: 0.32 }}>
			<span class="beat__index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>

			{#if beat.id === 'rings'}
				<div class="beat__rings" aria-hidden="true">
					{#each Array(4) as _, r (r)}
						<svg viewBox="0 0 80 80" class="beat__ring-svg">
							<circle cx="40" cy="40" r="36" class="beat__ring-track" />
							<circle cx="40" cy="40" r="36" class="beat__ring-draw" style="--r: {r}" />
						</svg>
					{/each}
				</div>
			{/if}

			{#if beat.id === 'duo'}
				<div class="beat__duo-bar beat__duo-bar--top" aria-hidden="true"></div>
				<div class="beat__duo-bar beat__duo-bar--bottom" aria-hidden="true"></div>
			{/if}

			{#if beat.id === 'digits' && phrase.label}
				<div class="beat__digit" aria-hidden="true">{phrase.label}</div>
			{/if}

			{#if beat.id === 'vision' && phrase.label}
				<span class="beat__vision-tag">{phrase.label}</span>
				<div class="beat__vision-sweep" aria-hidden="true"></div>
			{/if}

			<div class="beat__content">
				{#if phrase.label && beat.id !== 'vision' && beat.id !== 'digits'}
					<span class="beat__label">{phrase.label}</span>
				{/if}
				<h2 class="beat__text">{phrase.text}</h2>
			</div>

			{#if beat.id === 'finale'}
				<div class="beat__finale-mark" aria-hidden="true">8</div>
			{/if}
		</article>
	{/each}
</section>

<style>
	.sequence {
		background: var(--black);
		color: var(--white);
		scroll-snap-type: y proximity;
	}

	.beat {
		position: relative;
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(4rem, 10vw, 7rem) clamp(1.5rem, 5vw, 4rem);
		overflow: hidden;
		scroll-snap-align: start;
		border-bottom: 1px solid color-mix(in srgb, var(--white) 10%, transparent);
	}

	.beat__index {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		left: clamp(1.5rem, 4vw, 3rem);
		font-size: 0.52rem;
		letter-spacing: 0.4em;
		color: color-mix(in srgb, var(--white) 40%, transparent);
	}

	.beat__content {
		position: relative;
		z-index: 2;
		max-width: 900px;
		width: 100%;
	}

	.beat__label {
		display: block;
		font-size: 0.55rem;
		letter-spacing: 0.5em;
		color: var(--sky);
		margin-bottom: 1.5rem;
	}

	.beat__text {
		font-family: var(--font-display);
		font-size: clamp(2.2rem, 7vw, 5.5rem);
		line-height: 1.05;
		letter-spacing: -0.03em;
		text-transform: uppercase;
		white-space: pre-line;
	}

	.beat--panel-left {
		justify-content: flex-start;
	}

	.beat--panel-left::before {
		content: '';
		position: absolute;
		left: 0;
		top: 20%;
		bottom: 20%;
		width: 4px;
		background: linear-gradient(var(--sky), var(--grape));
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 1.1s var(--ease) 0.2s;
	}

	.beat--panel-left.motion-done::before {
		transform: scaleY(1);
	}

	.beat--panel-left .beat__content {
		transform: translateX(-105%);
		transition: transform 1s var(--ease) 0.05s;
	}

	.beat--panel-left.motion-done .beat__content {
		transform: translateX(0);
	}

	.beat--rings {
		flex-direction: column;
		gap: 3rem;
	}

	.beat__rings {
		display: flex;
		gap: 1.25rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.beat__ring-svg {
		width: 72px;
		height: 72px;
	}

	.beat__ring-track {
		fill: none;
		stroke: color-mix(in srgb, var(--white) 15%, transparent);
		stroke-width: 1;
	}

	.beat__ring-draw {
		fill: none;
		stroke: var(--sky);
		stroke-width: 2;
		stroke-dasharray: 226;
		stroke-dashoffset: 226;
		transform: rotate(-90deg);
		transform-origin: center;
		transition: stroke-dashoffset 1.2s var(--ease);
		transition-delay: calc(var(--r) * 0.15s + 0.2s);
	}

	.beat--rings.motion-done .beat__ring-draw {
		stroke-dashoffset: 0;
	}

	.beat--rings .beat__content {
		opacity: 0;
		transition: opacity 0.8s ease 0.7s;
	}

	.beat--rings.motion-done .beat__content {
		opacity: 1;
	}

	.beat--vision {
		text-align: center;
	}

	.beat__vision-tag {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: var(--font-display);
		font-size: clamp(8rem, 25vw, 18rem);
		color: color-mix(in srgb, var(--white) 5%, transparent);
		line-height: 1;
		pointer-events: none;
	}

	.beat__vision-sweep {
		position: absolute;
		inset: 0;
		background: linear-gradient(90deg, transparent, var(--sky), transparent);
		transform: translateX(-101%);
		transition: transform 0.85s var(--ease);
		opacity: 0.35;
		z-index: 1;
	}

	.beat--vision.motion-done .beat__vision-sweep {
		transform: translateX(101%);
	}

	.beat--vision .beat__text {
		letter-spacing: 0.35em;
		opacity: 0;
		transition:
			opacity 0.5s ease 0.45s,
			letter-spacing 1.2s var(--ease) 0.5s;
	}

	.beat--vision.motion-done .beat__text {
		opacity: 1;
		letter-spacing: -0.03em;
	}

	.beat--duo .beat__content {
		text-align: center;
		z-index: 3;
	}

	.beat__duo-bar {
		position: absolute;
		left: 10%;
		right: 10%;
		height: 50%;
		background: color-mix(in srgb, var(--indigo) 40%, var(--black));
		border: 1px solid color-mix(in srgb, var(--white) 12%, transparent);
		z-index: 1;
		transition: transform 0.9s var(--ease);
	}

	.beat__duo-bar--top {
		top: 0;
		transform: translateY(-100%);
	}

	.beat__duo-bar--bottom {
		bottom: 0;
		transform: translateY(100%);
	}

	.beat--duo.motion-done .beat__duo-bar--top,
	.beat--duo.motion-done .beat__duo-bar--bottom {
		transform: translateY(0);
	}

	.beat--duo .beat__text {
		opacity: 0;
		transform: rotateX(90deg);
		transform-origin: center bottom;
		transition:
			opacity 0.6s ease 0.75s,
			transform 0.8s var(--ease) 0.7s;
	}

	.beat--duo.motion-done .beat__text {
		opacity: 1;
		transform: rotateX(0deg);
	}

	.beat--digits {
		flex-direction: column;
		gap: 2rem;
	}

	.beat__digit {
		font-family: var(--font-display);
		font-size: clamp(10rem, 28vw, 20rem);
		line-height: 0.85;
		color: var(--sky);
		display: block;
		transform: translateY(100%);
		transition: transform 0.95s var(--ease) 0.1s;
	}

	.beat--digits.motion-done .beat__digit {
		transform: translateY(0);
	}

	.beat--digits .beat__text {
		opacity: 0;
		transition: opacity 0.7s ease 0.55s;
	}

	.beat--digits.motion-done .beat__text {
		opacity: 1;
	}

	.beat--finale {
		background: linear-gradient(135deg, var(--indigo) 0%, var(--grape) 50%, var(--black) 100%);
		color: var(--white);
	}

	.beat--finale .beat__index {
		color: color-mix(in srgb, var(--white) 35%, transparent);
	}

	.beat--finale .beat__text {
		font-size: clamp(4rem, 14vw, 10rem);
		transform: perspective(800px) rotateY(90deg);
		opacity: 0;
		transition:
			transform 1s var(--ease),
			opacity 0.6s ease;
	}

	.beat--finale.motion-done .beat__text {
		transform: perspective(800px) rotateY(0deg);
		opacity: 1;
	}

	.beat__finale-mark {
		position: absolute;
		right: 8%;
		bottom: 15%;
		font-family: var(--font-display);
		font-size: clamp(4rem, 12vw, 8rem);
		font-weight: 700;
		opacity: 0;
		transform: scale(0.5) rotate(-20deg);
		transition:
			opacity 0.8s ease 0.5s,
			transform 0.9s var(--ease) 0.5s;
		color: var(--sky);
	}

	.beat--finale.motion-done .beat__finale-mark {
		opacity: 0.35;
		transform: scale(1) rotate(0deg);
	}

	@media (max-width: 640px) {
		.beat__rings {
			gap: 0.75rem;
		}
		.beat__ring-svg {
			width: 56px;
			height: 56px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sequence {
			scroll-snap-type: none;
		}
		.beat--panel-left .beat__content,
		.beat--panel-left::before,
		.beat__ring-draw,
		.beat--duo .beat__duo-bar,
		.beat__digit,
		.beat--finale .beat__text {
			transform: none;
			opacity: 1;
			transition: none;
		}
	}
</style>
