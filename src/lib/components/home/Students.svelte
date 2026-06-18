<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { STUDENT_COLORS } from '$lib/theme';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	const names = ['Studente 1', 'Studente 2', 'Studente 3', 'Studente 4'];
	const N = 4;
	let active = $state(0);
	let visible = $state(true);

	const go = (d: 1 | -1) => {
		visible = false;
		setTimeout(() => {
			active = (active + d + N) % N;
			visible = true;
		}, 280);
	};

	const pick = (i: number) => {
		if (i === active) return;
		visible = false;
		setTimeout(() => {
			active = i;
			visible = true;
		}, 280);
	};

	let color = $derived(STUDENT_COLORS[active]);
</script>

<section id="studenti" class="students">
	<div class="students__rail" aria-hidden="true">
		{#each names as name, i (name)}
			<button
				type="button"
				class="students__name-btn"
				class:students__name-btn--active={i === active}
				style="--c: {STUDENT_COLORS[i]}"
				onclick={() => pick(i)}
			>
				{name}
			</button>
		{/each}
	</div>

	<div class="students__main">
		<header class="container students__head" use:reveal={{ variant: 'fade' }}>
			<SectionHeader index="06" eyebrow="Gli Studenti" title="Il lavoro in corso." light />
			<a href="/students/1" class="students__all">Tutti →</a>
		</header>

		<div class="students__stage">
			<div class="students__wm" aria-hidden="true">{String(active + 1).padStart(2, '0')}</div>

			<article
				class="students__card"
				class:students__card--visible={visible}
				style="--accent: {color}"
			>
				<div class="students__preview">
					<span class="students__preview-label">[Lavoro Studente {active + 1}]</span>
				</div>
				<div class="students__panel">
					<p class="students__kicker">[Focus del progetto]</p>
					<h3>{names[active]}</h3>
					<p class="students__desc">
						[Una riga di descrizione del progetto, gioco di luce e materia.]
					</p>
					<div class="students__actions">
						<a href="/students/{active + 1}" class="btn-primary">
							<span>Apri portfolio →</span>
						</a>
						<div class="students__nav">
							<button type="button" onclick={() => go(-1)} aria-label="Precedente">←</button>
							<span>{String(active + 1).padStart(2, '0')} / 04</span>
							<button type="button" onclick={() => go(1)} aria-label="Successivo">→</button>
						</div>
					</div>
				</div>
			</article>
		</div>
	</div>
</section>

<style>
	.students {
		display: grid;
		grid-template-columns: minmax(140px, 200px) 1fr;
		background: var(--black);
		color: var(--cream);
		min-height: 85vh;
	}

	.students__rail {
		border-right: 1px solid var(--line-light);
		padding: 6rem 0 2rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.students__name-btn {
		background: none;
		border: none;
		color: var(--cream-faint);
		text-align: left;
		padding: 1rem 1.25rem;
		font-family: var(--font-serif);
		font-size: clamp(0.9rem, 1.5vw, 1.15rem);
		font-style: italic;
		text-transform: none;
		letter-spacing: 0;
		border-left: 2px solid transparent;
		transition:
			color 0.35s,
			border-color 0.35s;
	}

	.students__name-btn--active {
		color: var(--cream);
		border-left-color: var(--c, var(--acid));
	}

	.students__main {
		display: flex;
		flex-direction: column;
	}

	.students__head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 2.5rem 0 1rem;
		border-bottom: 1px solid var(--line-light);
	}

	.students__head :global(.sh) {
		margin-bottom: 0;
	}

	.students__all {
		font-size: 0.52rem;
		letter-spacing: 0.35em;
		color: var(--cream-faint);
	}

	.students__stage {
		position: relative;
		flex: 1;
		min-height: 480px;
		margin: 1.5rem clamp(1rem, 3vw, 2rem) 2rem;
	}

	.students__wm {
		position: absolute;
		right: 0;
		bottom: 0;
		font-family: var(--font-display);
		font-size: clamp(8rem, 20vw, 16rem);
		line-height: 0.8;
		color: rgba(244, 240, 232, 0.04);
		pointer-events: none;
	}

	.students__card {
		position: absolute;
		inset: 0;
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		border: 1px solid var(--line-light);
		opacity: 0;
		filter: blur(10px);
		transition:
			opacity 0.45s var(--ease-material),
			filter 0.45s var(--ease-material);
	}

	.students__card--visible {
		opacity: 1;
		filter: blur(0);
	}

	.students__preview {
		background: var(--black-soft);
		border-right: 1px solid var(--line-light);
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.students__preview::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
		background: var(--accent);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.5s var(--ease-material);
	}

	.students__card--visible .students__preview::before {
		transform: scaleX(1);
	}

	.students__preview-label {
		font-size: 0.55rem;
		letter-spacing: 0.35em;
		color: var(--cream-faint);
	}

	.students__panel {
		padding: clamp(1.5rem, 4vw, 2.5rem);
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.students__kicker {
		font-size: 0.52rem;
		letter-spacing: 0.38em;
		color: var(--accent);
		margin-bottom: 0.75rem;
	}

	.students__panel h3 {
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		text-transform: uppercase;
		line-height: 0.95;
		margin-bottom: 1rem;
	}

	.students__desc {
		font-family: var(--font-serif);
		font-size: 1rem;
		line-height: 1.65;
		text-transform: none;
		letter-spacing: 0;
		color: var(--cream-muted);
		margin-bottom: 2rem;
	}

	.students__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.5rem;
	}

	.students__nav {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.52rem;
		margin-left: auto;
		color: var(--cream-muted);
	}

	.students__nav button {
		width: 42px;
		height: 42px;
		border: 1px solid var(--line-light);
		background: transparent;
		color: var(--cream);
		transition: background 0.3s;
	}

	.students__nav button:hover {
		background: var(--accent);
		color: var(--black);
	}

	@media (max-width: 900px) {
		.students {
			grid-template-columns: 1fr;
		}
		.students__rail {
			flex-direction: row;
			overflow-x: auto;
			border-right: none;
			border-bottom: 1px solid var(--line-light);
			padding: 1rem;
		}
		.students__name-btn {
			white-space: nowrap;
			border-left: none;
			border-bottom: 2px solid transparent;
		}
		.students__card {
			grid-template-columns: 1fr;
		}
	}
</style>
