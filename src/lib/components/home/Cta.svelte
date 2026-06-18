<script lang="ts">
	import { reveal } from '$lib/reveal';
</script>

<section id="contatti" class="cta">
	<div class="cta__inner" use:reveal={{ variant: 'scale', threshold: 0.2 }}>
		<p class="cta__eyebrow" use:reveal={{ variant: 'clip-left', threshold: 0.3 }}>not for everyone, clearly.</p>
		<h2 class="cta__title">
			<span use:reveal={{ variant: 'clip-up', threshold: 0.3 }}>Segui</span>
			<span class="cta__title-accent" use:reveal={{ variant: 'clip-up', threshold: 0.35 }}>il processo.</span>
		</h2>
		<p class="cta__sub" use:reveal={{ variant: 'fade', threshold: 0.3 }}>Scopri cosa nasce dall'incontro tra materia e visione.</p>
		<div class="cta__actions" use:reveal={{ variant: 'blur', threshold: 0.25 }}>
			<a href="mailto:info@the8.it" class="btn-primary">
				<span>Scrivici →</span>
			</a>
			<a href="#hero" class="cta__secondary">Torna su ↑</a>
		</div>
	</div>
</section>

<style>
	.cta {
		min-height: 88vh;
		min-height: 88dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4rem 1.5rem;
		background: var(--black);
		color: var(--cream);
		position: relative;
		overflow: hidden;
	}

	.cta::before {
		content: '';
		position: absolute;
		inset: -50%;
		background: conic-gradient(from 0deg, transparent, var(--magenta-dim), transparent, var(--acid-dim), transparent);
		animation: orbit-slow 48s linear infinite;
		opacity: 0.5;
	}

	.cta__inner {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 900px;
	}

	.cta__eyebrow {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2.5vw, 1.4rem);
		font-style: italic;
		text-transform: none;
		letter-spacing: 0;
		margin-bottom: 2rem;
	}

	.cta__title {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 9vw, 6rem);
		line-height: 0.95;
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
		gap: 0.05em;
	}

	.cta__title-accent {
		color: var(--acid);
	}

	.cta__sub {
		margin-top: 1.5rem;
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2vw, 1.2rem);
		font-style: italic;
		text-transform: none;
		letter-spacing: 0;
		color: var(--cream-muted);
	}

	.cta__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		justify-content: center;
		align-items: center;
		margin-top: 2.5rem;
	}

	.cta__secondary {
		font-size: 0.52rem;
		letter-spacing: 0.35em;
		color: var(--cream-faint);
		transition: color 0.25s;
	}

	.cta__secondary:hover {
		color: var(--acid);
	}
</style>
