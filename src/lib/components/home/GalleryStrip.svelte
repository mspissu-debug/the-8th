<script lang="ts">
	import GraphicFacet from '$lib/components/graphics/GraphicFacet.svelte';
	import { reveal, revealStagger } from '$lib/reveal';

	let headIn = $state(false);
</script>

<section id="galleria" class="gallery">
	<div
		class="container gallery__head"
		use:reveal={{ variant: 'clip-up', threshold: 0.2, onInView: () => (headIn = true) }}
	>
		<p class="section-label home-stagger" class:in-view={headIn}>04 · Galleria</p>
		<h2 class="gallery__title home-stagger" class:in-view={headIn} style="--delay: 0.1s">Frammenti<br />di edizione</h2>
	</div>
	<div class="gallery__strip" use:revealStagger={{ threshold: 0.12, stepMs: 80 }}>
		{#each Array(6) as _, i (i)}
			<div
				class="gallery__item"
				class:gallery__item--alt={i % 2 === 1}
				data-stagger
				data-variant={i % 2 === 0 ? 'scale' : 'left'}
			>
				<GraphicFacet index={i} />
				<span class="gallery__num">{String(i + 1).padStart(2, '0')}</span>
				<span class="gallery__tag">[WIP]</span>
			</div>
		{/each}
	</div>
</section>

<style>
	.gallery {
		padding: var(--pad-section) 0;
		border-bottom: 1px solid var(--line);
		overflow: hidden;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--sky) 25%, var(--white)) 0%,
			var(--white) 35%
		);
	}

	.gallery__title {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 7vw, 5rem);
		font-weight: 700;
		line-height: 0.95;
		text-transform: uppercase;
	}

	.gallery__head {
		margin-bottom: 2rem;
	}

	.gallery__strip {
		display: flex;
		gap: 1px;
		background: var(--line);
	}

	.gallery__item {
		flex: 0 0 clamp(200px, 28vw, 320px);
		aspect-ratio: 4/5;
		background: var(--bg-soft);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		font-size: 0.5rem;
		letter-spacing: 0.3em;
		color: var(--fg-faint);
		position: relative;
		overflow: hidden;
		transition:
			background 0.35s var(--ease),
			color 0.35s var(--ease);
	}

	.gallery__item::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(160deg, transparent 40%, color-mix(in srgb, var(--indigo) 12%, transparent));
		opacity: 0;
		transition: opacity 0.4s var(--ease);
		pointer-events: none;
	}

	.gallery__item--alt {
		background: color-mix(in srgb, var(--grape) 12%, var(--sky));
	}

	.gallery__item:hover {
		background: var(--indigo);
		color: var(--white);
	}

	.gallery__item--alt:hover {
		background: var(--grape);
	}

	.gallery__item:hover::after {
		opacity: 1;
	}

	.gallery__num {
		font-family: var(--font-display);
		font-size: 2.5rem;
		font-weight: 700;
		opacity: 0.15;
		line-height: 1;
		transition: opacity 0.35s var(--ease);
		position: relative;
		z-index: 1;
	}

	.gallery__tag {
		position: relative;
		z-index: 1;
	}

	.gallery__item:hover .gallery__num {
		opacity: 0.45;
	}
</style>
