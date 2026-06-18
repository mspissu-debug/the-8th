<script lang="ts">
	import { MENTOR_NOTES, STUDENT_COLORS } from '$lib/theme';
	import GraphicRings from '$lib/components/graphics/GraphicRings.svelte';
	import { reveal } from '$lib/reveal';

	let studentIdx = $state(0);
	let mentorsHeadIn = $state(false);
	let mentorsIn = $state(false);
	let studentsHeadIn = $state(false);
	let studentsPanelIn = $state(false);
</script>

<section class="people">
	<div id="mentori" class="people__block">
		<div
			class="container"
			use:reveal={{ variant: 'clip-up', threshold: 0.15, onInView: () => (mentorsHeadIn = true) }}
		>
			<p class="section-label home-stagger" class:in-view={mentorsHeadIn}>05 · Mentori</p>
			<h2 class="people__title home-stagger" class:in-view={mentorsHeadIn} style="--delay: 0.1s">
				Quattro voci della gioielleria contemporanea.
			</h2>
		</div>
		<div
			class="people__row"
			use:reveal={{ variant: 'fade', threshold: 0.08, onInView: () => (mentorsIn = true) }}
		>
			{#each MENTOR_NOTES as note, i (note)}
				<a
					href="/mentors/{i + 1}"
					class="people__card home-stagger"
					class:in-view={mentorsIn}
					style="--delay: {0.06 + i * 0.1}s"
				>
					<span class="people__idx">{String(i + 1).padStart(2, '0')}</span>
					<span class="people__role">{note}</span>
					<span class="people__name">Mentore {i + 1}</span>
					<span class="people__ph">[Specialità]</span>
				</a>
			{/each}
		</div>
	</div>

	<div id="studenti" class="people__block people__block--invert">
		<div class="people__block-graphic" aria-hidden="true">
			<GraphicRings size={280} slow />
		</div>
		<div
			class="container people__student-head"
			use:reveal={{ variant: 'clip-up', threshold: 0.15, onInView: () => (studentsHeadIn = true) }}
		>
			<div class="home-stagger" class:in-view={studentsHeadIn}>
				<p class="section-label">06 · Studenti</p>
				<h2 class="people__title">Il lavoro in corso.</h2>
			</div>
			<div class="people__tabs home-stagger" class:in-view={studentsHeadIn} style="--delay: 0.12s">
				{#each [0, 1, 2, 3] as i (i)}
					<button
						type="button"
						class="people__tab"
						class:people__tab--on={studentIdx === i}
						style="--c: {STUDENT_COLORS[i]}"
						onclick={() => (studentIdx = i)}
					>
						0{i + 1}
					</button>
				{/each}
			</div>
		</div>
		<div
			class="container people__student-panel"
			use:reveal={{ variant: 'clip-left', threshold: 0.12, onInView: () => (studentsPanelIn = true) }}
		>
			<p class="people__student-kicker home-stagger" class:in-view={studentsPanelIn}>[Focus del progetto]</p>
			{#key studentIdx}
				<h3 class="people__student-name home-stagger" class:in-view={studentsPanelIn} style="--delay: 0.08s">
					Studente {studentIdx + 1}
				</h3>
			{/key}
			<p class="people__student-desc home-stagger" class:in-view={studentsPanelIn} style="--delay: 0.16s">
				[Una riga di descrizione del progetto, gioco di luce e materia.]
			</p>
			<a
				href="/students/{studentIdx + 1}"
				class="people__student-link home-stagger"
				class:in-view={studentsPanelIn}
				style="--delay: 0.24s"
			>
				Apri portfolio →
			</a>
		</div>
	</div>
</section>

<style>
	.people__block {
		padding: var(--pad-section) 0;
		border-bottom: 1px solid var(--line);
	}

	.people__block--invert {
		position: relative;
		background: var(--black);
		color: var(--white);
		overflow: hidden;
	}

	.people__block-graphic {
		position: absolute;
		top: 10%;
		right: -8%;
		opacity: 0.25;
		pointer-events: none;
	}

	.people__block--invert .section-label {
		color: color-mix(in srgb, var(--white) 50%, transparent);
	}

	.people__title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: -0.03em;
		line-height: 0.95;
		max-width: 14ch;
		margin-bottom: 2.5rem;
	}

	.people__row {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-top: 1px solid var(--line);
	}

	.people__card {
		padding: 2rem 1.5rem;
		border-right: 1px solid var(--line);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		min-height: 220px;
		transition: background 0.35s var(--ease);
	}

	.people__card:last-child {
		border-right: none;
	}

	.people__card:hover {
		background: var(--bg-soft);
	}

	.people__card:hover .people__idx {
		color: var(--indigo);
		opacity: 0.6;
	}

	.people__idx {
		font-family: var(--font-display);
		font-size: 2rem;
		font-weight: 700;
		opacity: 0.2;
		transition:
			opacity 0.35s var(--ease),
			color 0.35s var(--ease);
	}

	.people__role {
		font-size: 0.5rem;
		letter-spacing: 0.35em;
		margin-top: auto;
	}

	.people__name {
		font-family: var(--font-display);
		font-size: 1.1rem;
		font-weight: 700;
		text-transform: uppercase;
	}

	.people__ph {
		font-size: 0.5rem;
		opacity: 0.45;
		text-transform: none;
		letter-spacing: 0.1em;
	}

	.people__student-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.people__tabs {
		display: flex;
		gap: 0.5rem;
	}

	.people__tab {
		padding: 0.5rem 0.85rem;
		font-size: 0.52rem;
		letter-spacing: 0.2em;
		border: 1px solid color-mix(in srgb, var(--white) 25%, transparent);
		color: color-mix(in srgb, var(--white) 50%, transparent);
		transition:
			color 0.25s var(--ease),
			border-color 0.25s var(--ease);
	}

	.people__tab--on {
		color: var(--white);
		border-color: var(--c, var(--sky));
	}

	.people__student-panel {
		margin-top: 3rem;
		padding-top: 2rem;
		border-top: 1px solid color-mix(in srgb, var(--white) 15%, transparent);
	}

	.people__student-name {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 4rem);
		font-weight: 700;
		text-transform: uppercase;
		line-height: 1;
	}

	.people__student-kicker {
		font-size: 0.52rem;
		letter-spacing: 0.38em;
		opacity: 0.5;
		margin-bottom: 1rem;
	}

	.people__student-desc {
		margin-top: 1rem;
		max-width: 40ch;
		font-size: 0.6rem;
		line-height: 1.9;
		text-transform: none;
		letter-spacing: 0.08em;
		opacity: 0.65;
	}

	.people__student-link {
		display: inline-block;
		margin-top: 2rem;
		font-size: 0.55rem;
		letter-spacing: 0.32em;
		text-decoration: underline;
	}

	.people__student-link:hover {
		color: var(--sky);
	}

	@media (max-width: 900px) {
		.people__row {
			grid-template-columns: 1fr 1fr;
		}
		.people__card {
			border-bottom: 1px solid var(--line);
		}
	}
</style>
