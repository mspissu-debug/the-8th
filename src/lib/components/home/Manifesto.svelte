<script lang="ts">
	import { reveal } from '$lib/reveal';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	let inView = $state(false);

	const line1 = ['Otto', 'persone.'];
	const line2 = ['Quattro', 'incontri.'];
	const line3 = ['Una', 'sola', 'forma.'];
</script>

<section
	id="manifesto"
	class="manifesto"
	use:reveal={{ threshold: 0.12, variant: 'fade', onInView: () => (inView = true) }}
	class:in-view={inView}
>
	<div class="manifesto__wm" aria-hidden="true">MNFST</div>

	<div class="container manifesto__layout">
		<aside class="manifesto__sticky" use:reveal={{ variant: 'clip-left' }}>
			<SectionHeader index="02" eyebrow="Manifesto" title="Il programma in una frase." large />
			<p class="manifesto__aside-text">
				Non è un concorso tradizionale: è un atelier aperto dove tecnica e visione si
				incontrano per dodici mesi.
			</p>
		</aside>

		<div class="manifesto__main">
			<h2 class="manifesto__title" aria-label="Otto persone. Quattro incontri. Una sola forma.">
				<span class="manifesto__line">
					{#each line1 as w, i (i)}
						<span class="manifesto__word" style="--d: {0.1 + i * 0.1}s">{w}</span>
					{/each}
				</span>
				<span class="manifesto__line">
					{#each line2 as w, i (i)}
						<span class="manifesto__word" style="--d: {0.4 + i * 0.1}s">{w}</span>
					{/each}
				</span>
				<span class="manifesto__line manifesto__line--accent">
					{#each line3 as w, i (i)}
						<span class="manifesto__word" style="--d: {0.7 + i * 0.1}s">{w}</span>
					{/each}
				</span>
			</h2>

			<div class="manifesto__cards">
				<div class="manifesto__card manifesto__card--wide" use:reveal={{ variant: 'clip-up' }}>
					<span class="manifesto__key">↘ THE 8th</span>
					<p>
						[Un programma annuale che mette quattro studenti accanto a quattro mentori della
						gioielleria contemporanea, per dodici mesi di lavoro condiviso.]
					</p>
				</div>
				<div class="manifesto__card" use:reveal={{ variant: 'clip-right' }}>
					<span class="manifesto__key">↘ Anno</span>
					<p>2024 — oggi</p>
				</div>
				<div class="manifesto__card manifesto__card--accent" use:reveal={{ variant: 'clip-left' }}>
					<span class="manifesto__key">↘ Sede</span>
					<p>Italia, [città]</p>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.manifesto {
		position: relative;
		padding: var(--section-pad) 0;
		background: var(--cream);
		overflow: hidden;
	}

	.manifesto__wm {
		position: absolute;
		right: -5%;
		top: 50%;
		transform: translateY(-50%);
		font-family: var(--font-display);
		font-size: clamp(10rem, 38vw, 32rem);
		line-height: 0.85;
		color: rgba(10, 10, 10, 0.025);
		pointer-events: none;
	}

	.manifesto__layout {
		display: grid;
		grid-template-columns: minmax(220px, 320px) 1fr;
		gap: clamp(2rem, 6vw, 5rem);
		align-items: start;
		position: relative;
		z-index: 1;
	}

	.manifesto__sticky {
		position: sticky;
		top: 7rem;
	}

	.manifesto__aside-text {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.7;
		font-style: italic;
		text-transform: none;
		letter-spacing: 0;
		color: var(--ink-muted);
		margin-top: 1.5rem;
	}

	.manifesto__title {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 8vw, 6.5rem);
		line-height: 0.92;
		letter-spacing: -0.03em;
		text-transform: uppercase;
		margin-bottom: 3rem;
	}

	.manifesto__line {
		display: block;
	}

	.manifesto__line--accent {
		color: var(--magenta);
	}

	.manifesto__word {
		display: inline-block;
		margin-right: 0.18em;
		clip-path: inset(0 100% 0 0);
	}

	.in-view .manifesto__word {
		animation: manifesto-wipe 0.85s var(--ease-material) forwards;
		animation-delay: var(--d);
	}

	@keyframes manifesto-wipe {
		to {
			clip-path: inset(0 0 0 0);
		}
	}

	.manifesto__cards {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.manifesto__card {
		padding: 1.75rem;
		border: 1px solid var(--line-dark);
		background: var(--cream);
	}

	.manifesto__card--wide {
		grid-column: 1 / -1;
	}

	.manifesto__card--accent {
		background: var(--black);
		color: var(--cream);
		border-color: var(--black);
	}

	.manifesto__card--accent .manifesto__key {
		color: var(--acid);
	}

	.manifesto__card p {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.7;
		text-transform: none;
		letter-spacing: 0;
		margin-top: 0.75rem;
	}

	.manifesto__key {
		font-size: 0.5rem;
		letter-spacing: 0.38em;
		color: var(--ink-faint);
	}

	@media (max-width: 900px) {
		.manifesto__layout {
			grid-template-columns: 1fr;
		}
		.manifesto__sticky {
			position: static;
		}
		.manifesto__cards {
			grid-template-columns: 1fr;
		}
	}
</style>
