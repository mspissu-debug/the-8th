<script lang="ts">
	import GraphicOrbit from '$lib/components/graphics/GraphicOrbit.svelte';
	import { reveal, revealStagger } from '$lib/reveal';

	let gridIn = $state(false);
	let quoteIn = $state(false);
</script>

<section id="manifesto" class="about">
	<div
		class="container about__grid"
		use:reveal={{ variant: 'clip-up', threshold: 0.15, onInView: () => (gridIn = true) }}
	>
		<a href="#manifesto" class="about__link home-stagger" class:in-view={gridIn}>About the program ↗</a>
		<div class="about__text home-stagger" class:in-view={gridIn} style="--delay: 0.1s">
			<h2 class="about__title">
				Hey. This is <em>THE 8th</em> — an annual jewelry design contest. Four students, four
				mentors, twelve months of shared atelier work.
			</h2>
			<p class="about__body">
				[Un programma annuale che mette quattro studenti accanto a quattro mentori della
				gioielleria contemporanea. Non è un concorso tradizionale: è un laboratorio aperto
				dove la tecnica incontra la visione.]
			</p>
			<div class="about__facts" use:revealStagger={{ stepMs: 120 }}>
				<div data-stagger data-variant="left"><span>↘ Anno</span><p>2024 — oggi</p></div>
				<div data-stagger data-variant="right"><span>↘ Sede</span><p>Italia, [città]</p></div>
			</div>
		</div>
	</div>

	<blockquote
		class="about__quote container"
		use:reveal={{ variant: 'rotate-in', threshold: 0.2, onInView: () => (quoteIn = true) }}
	>
		<div class="about__quote-graphic" aria-hidden="true">
			<GraphicOrbit size={200} />
		</div>
		<p class="home-stagger" class:in-view={quoteIn}>
			Otto persone. Quattro incontri. <strong>Una sola forma.</strong>
		</p>
	</blockquote>
</section>

<style>
	.about {
		padding: var(--pad-section) 0;
		border-bottom: 1px solid var(--line);
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--indigo) 5%, var(--white)) 0%,
			var(--white) 50%,
			color-mix(in srgb, var(--sky) 30%, var(--white)) 100%
		);
	}

	.about__grid {
		display: grid;
		grid-template-columns: minmax(140px, 200px) 1fr;
		gap: 3rem;
		align-items: start;
	}

	.about__link {
		font-size: 0.58rem;
		letter-spacing: 0.35em;
		text-decoration: underline;
		text-underline-offset: 0.35em;
		transition: color 0.25s var(--ease);
	}

	.about__link:hover {
		color: var(--indigo);
	}

	.about__title {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 4vw, 2.75rem);
		font-weight: 700;
		line-height: 1.15;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		max-width: 28ch;
	}

	.about__title em {
		font-style: normal;
		color: var(--indigo);
		text-decoration: underline;
		text-decoration-color: var(--sky);
		text-decoration-thickness: 2px;
	}

	.about__body {
		margin-top: 1.5rem;
		font-size: 0.62rem;
		line-height: 2;
		letter-spacing: 0.1em;
		color: var(--fg-muted);
		text-transform: none;
		max-width: 52ch;
	}

	.about__facts {
		display: flex;
		gap: 3rem;
		margin-top: 2.5rem;
		font-size: 0.52rem;
	}

	.about__facts span {
		display: block;
		color: var(--fg-faint);
		margin-bottom: 0.5rem;
	}

	.about__facts p {
		text-transform: none;
		letter-spacing: 0.08em;
	}

	.about__quote {
		position: relative;
		margin-top: 4rem;
		padding-top: 3rem;
		border-top: 1px solid var(--line);
		overflow: hidden;
	}

	.about__quote-graphic {
		position: absolute;
		right: -2rem;
		top: 50%;
		transform: translateY(-50%);
		opacity: 0.35;
		pointer-events: none;
	}

	.about__quote p {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 4rem);
		font-weight: 700;
		line-height: 1.1;
		text-transform: uppercase;
		letter-spacing: -0.03em;
		max-width: 16ch;
	}

	.about__quote strong {
		display: block;
		margin-top: 0.25em;
		color: var(--indigo);
	}

	@media (max-width: 700px) {
		.about__grid {
			grid-template-columns: 1fr;
		}
	}
</style>
