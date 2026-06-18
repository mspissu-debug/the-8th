<script lang="ts">
	import { reveal, revealStagger } from '$lib/reveal';
	import { messages } from '$lib/i18n';
	import GraphicRings from '$lib/components/graphics/GraphicRings.svelte';

	let inView = $state(false);
</script>

<section id="progetto" class="project">
	<div
		class="container project__grid"
		use:reveal={{ variant: 'clip-up', threshold: 0.12, onInView: () => (inView = true) }}
	>
		<div class="project__copy">
			<p class="section-label home-stagger" class:in-view={inView}>00 · Programma</p>
			<h2 class="project__title home-stagger" class:in-view={inView} style="--delay: 0.08s">
				{$messages.home.projectTitle}
			</h2>
			<p class="project__lead home-stagger" class:in-view={inView} style="--delay: 0.16s">
				{$messages.home.projectLead}
			</p>
			<a href="#manifesto" class="project__cta home-stagger" class:in-view={inView} style="--delay: 0.24s">
				{$messages.home.projectCta} ↗
			</a>
		</div>
		<div class="project__visual home-stagger" class:in-view={inView} style="--delay: 0.12s" aria-hidden="true">
			<GraphicRings size={320} />
		</div>
	</div>

	<div class="project__facts" use:revealStagger={{ threshold: 0.15 }}>
		<div data-stagger data-variant="left" class="project__fact">
			<strong>4+4</strong>
			<span>Studenti e mentori</span>
		</div>
		<div data-stagger class="project__fact">
			<strong>12</strong>
			<span>Mesi di atelier</span>
		</div>
		<div data-stagger data-variant="right" class="project__fact">
			<strong>2</strong>
			<span>Edizioni</span>
		</div>
		<div data-stagger data-variant="scale" class="project__fact">
			<strong>8</strong>
			<span>Partecipanti per edizione</span>
		</div>
	</div>
</section>

<style>
	.project {
		padding: var(--pad-section) 0;
		border-bottom: 1px solid var(--line);
		background: linear-gradient(
			180deg,
			var(--white) 0%,
			color-mix(in srgb, var(--sky) 22%, var(--white)) 100%
		);
	}

	.project__grid {
		display: grid;
		grid-template-columns: 1fr minmax(200px, 360px);
		gap: 3rem;
		align-items: center;
		margin-bottom: 3rem;
	}

	.project__title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: -0.03em;
		line-height: 0.95;
		margin: 0.5rem 0 1.25rem;
	}

	.project__lead {
		font-size: 0.62rem;
		line-height: 2;
		text-transform: none;
		letter-spacing: 0.08em;
		color: var(--fg-muted);
		max-width: 48ch;
	}

	.project__cta {
		display: inline-block;
		margin-top: 2rem;
		font-size: 0.55rem;
		letter-spacing: 0.32em;
		color: var(--indigo);
		text-decoration: underline;
		text-underline-offset: 0.35em;
	}

	.project__visual {
		display: flex;
		justify-content: center;
		opacity: 0.9;
	}

	.project__facts {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1px;
		background: var(--line);
		border: 1px solid var(--line);
	}

	.project__fact {
		padding: 1.75rem 1.5rem;
		background: var(--white);
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.project__fact strong {
		font-family: var(--font-display);
		font-size: 2rem;
		font-weight: 700;
		color: var(--indigo);
		letter-spacing: -0.03em;
		line-height: 1;
	}

	.project__fact span {
		font-size: 0.5rem;
		letter-spacing: 0.28em;
		color: var(--fg-muted);
	}

	@media (max-width: 800px) {
		.project__grid {
			grid-template-columns: 1fr;
		}
		.project__facts {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
