<script lang="ts">
	import { reveal } from '$lib/reveal';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	const items = Array.from({ length: 8 }, (_, i) => ({
		id: i + 1,
		label: `Frame ${String(i + 1).padStart(2, '0')}`
	}));
</script>

<section id="galleria" class="gallery">
	<div class="container gallery__head" use:reveal={{ variant: 'clip-up' }}>
		<SectionHeader
			index="04"
			eyebrow="Galleria"
			title="Frammenti di Edizione"
			subtitle="[Una sequenza di immagini del work-in-progress: appunti, materia, gesti. Niente è ancora finito.]"
		/>
	</div>

	<div class="gallery__track">
		{#each items as item, i (item.id)}
			<figure
				class="gallery__item"
				use:reveal={{ variant: 'blur', threshold: 0.15 }}
				style="transition-delay: {i * 0.07}s"
			>
				<div class="gallery__frame">
					<span class="gallery__index">{String(item.id).padStart(2, '0')}</span>
					<span class="gallery__ph">[Immagine WIP]</span>
					<span class="gallery__veil" aria-hidden="true"></span>
				</div>
				<figcaption>
					<span>{item.label}</span>
					<span class="gallery__arrow">↗</span>
				</figcaption>
			</figure>
		{/each}
	</div>
</section>

<style>
	.gallery {
		padding: var(--section-pad) 0 4rem;
		background: var(--cream);
		overflow: hidden;
	}

	.gallery__head {
		margin-bottom: 2.5rem;
	}

	.gallery__track {
		display: flex;
		gap: 1.5rem;
		padding: 0 clamp(1.5rem, 4vw, 3rem) 2rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}

	.gallery__track::-webkit-scrollbar {
		display: none;
	}

	.gallery__item {
		flex: 0 0 clamp(260px, 38vw, 400px);
		scroll-snap-align: center;
	}

	.gallery__frame {
		aspect-ratio: 3/4;
		background: var(--black);
		color: var(--cream-faint);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	.gallery__veil {
		position: absolute;
		inset: 0;
		background: var(--acid);
		clip-path: circle(0% at 50% 100%);
		transition: clip-path 0.6s var(--ease-material);
		mix-blend-mode: multiply;
		opacity: 0.35;
	}

	.gallery__item:hover .gallery__veil {
		clip-path: circle(140% at 50% 100%);
	}

	.gallery__index {
		position: absolute;
		top: 1rem;
		left: 1rem;
		font-family: var(--font-display);
		font-size: 3rem;
		line-height: 1;
		color: rgba(244, 240, 232, 0.1);
		z-index: 1;
	}

	.gallery__ph {
		position: relative;
		z-index: 2;
		font-size: 0.5rem;
		letter-spacing: 0.35em;
	}

	.gallery__item figcaption {
		display: flex;
		justify-content: space-between;
		margin-top: 0.85rem;
		font-size: 0.52rem;
		letter-spacing: 0.3em;
	}

	.gallery__arrow {
		opacity: 0;
		transition: opacity 0.35s;
	}

	.gallery__item:hover .gallery__arrow {
		opacity: 1;
	}
</style>
