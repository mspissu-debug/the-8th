<script lang="ts">
	import { reveal } from '$lib/reveal';

	const items = [
		{ target: 4, label: 'Studenti', note: 'per edizione' },
		{ target: 4, label: 'Mentori', note: 'maestri del mestiere' },
		{ target: 12, label: 'Mesi', note: 'di atelier condiviso' }
	];

	let counts = $state([0, 0, 0]);
	let inView = $state(false);

	$effect(() => {
		if (!inView) return;
		const t0 = performance.now();
		const dur = 2000;
		let raf = 0;
		const tick = (now: number) => {
			const p = Math.min((now - t0) / dur, 1);
			const ease = p * p * (3 - 2 * p);
			counts = items.map((it) => Math.round(ease * it.target));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});
</script>

<div class="stats" use:reveal={{ variant: 'fade', onInView: () => (inView = true) }}>
	{#each items as item, i (item.label)}
		<div
			class="stats__cell"
			class:stats__cell--featured={i === 2}
			use:reveal={{ variant: 'scale', threshold: 0.3 }}
			style="transition-delay: {i * 0.15}s"
		>
			<span class="stats__index">0{i + 1}</span>
			<div class="stats__num">{String(counts[i]).padStart(2, '0')}</div>
			<div class="stats__label">{item.label}</div>
			<p class="stats__note">{item.note}</p>
		</div>
	{/each}
</div>

<style>
	.stats {
		display: grid;
		grid-template-columns: 1fr 1fr 1.35fr;
		gap: 1px;
		background: var(--line-dark);
	}

	.stats__cell {
		background: var(--cream);
		padding: clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem);
	}

	.stats__cell--featured {
		background: var(--black);
		color: var(--cream);
	}

	.stats__index {
		font-size: 0.48rem;
		letter-spacing: 0.35em;
		color: var(--ink-faint);
	}

	.stats__cell--featured .stats__index {
		color: var(--cream-faint);
	}

	.stats__num {
		font-family: var(--font-display);
		font-size: clamp(4rem, 10vw, 7.5rem);
		line-height: 1;
		letter-spacing: -0.04em;
		margin: 1rem 0 0.5rem;
		font-variant-numeric: tabular-nums;
	}

	.stats__cell--featured .stats__num {
		color: var(--acid);
	}

	.stats__label {
		font-size: 0.58rem;
		letter-spacing: 0.38em;
	}

	.stats__note {
		font-family: var(--font-serif);
		font-size: 0.9rem;
		font-style: italic;
		text-transform: none;
		letter-spacing: 0;
		margin-top: 0.75rem;
		opacity: 0.55;
	}

	@media (max-width: 720px) {
		.stats {
			grid-template-columns: 1fr;
		}
	}
</style>
