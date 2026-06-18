<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { MENTOR_NOTES } from '$lib/theme';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	const romans = ['I', 'II', 'III', 'IV'];
</script>

<section id="mentori" class="mentors">
	<div class="container">
		<header class="mentors__head" use:reveal={{ variant: 'clip-up' }}>
			<SectionHeader
				index="05"
				eyebrow="I Mentori"
				title="Quattro voci della gioielleria contemporanea."
				subtitle="[Brevissima nota su come sono stati scelti — la diversità di approcci come ricchezza del programma.]"
			/>
		</header>

		<div class="mentors__bento">
			{#each MENTOR_NOTES as note, i (note)}
				<a
					href="/mentors/{i + 1}"
					class="mentor"
					use:reveal={{ variant: i % 2 === 0 ? 'clip-left' : 'clip-right' }}
					style="transition-delay: {i * 0.1}s"
				>
					<div class="mentor__top">
						<span class="mentor__roman">{romans[i]}</span>
						<span class="mentor__id">M.{String(i + 1).padStart(2, '0')}</span>
					</div>
					<div class="mentor__visual">
						<span class="mentor__wm">{note}</span>
						<span class="mentor__ph">[Mentore {i + 1}]</span>
					</div>
					<div class="mentor__bottom">
						<h3>Mentore {i + 1}</h3>
						<p>[Specialità]</p>
						<span class="mentor__link">Profilo →</span>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.mentors {
		padding: var(--section-pad) 0;
		background: linear-gradient(180deg, var(--sky) 0%, var(--grape) 100%);
		color: var(--black);
	}

	.mentors__head {
		margin-bottom: 3rem;
	}

	.mentors__head :global(.sh__sub) {
		color: rgba(10, 10, 10, 0.65);
	}

	.mentors__bento {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1rem;
	}

	.mentor {
		display: flex;
		flex-direction: column;
		background: var(--cream);
		border: 1px solid rgba(10, 10, 10, 0.15);
		padding: 1.25rem;
		min-height: 300px;
	}

	.mentor__top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.mentor__roman {
		font-family: var(--font-serif);
		font-size: 2rem;
		line-height: 1;
		text-transform: none;
		letter-spacing: 0;
		opacity: 0.4;
	}

	.mentor__id {
		font-size: 0.48rem;
		letter-spacing: 0.3em;
	}

	.mentor__visual {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--black);
		color: var(--cream);
		margin-bottom: 1rem;
		min-height: 140px;
		position: relative;
		overflow: hidden;
	}

	.mentor__visual::after {
		content: '';
		position: absolute;
		inset: 0;
		border: 1px solid var(--cream);
		clip-path: polygon(0 0, 0 0, 0 0);
		transition: clip-path 0.55s var(--ease-material);
	}

	.mentor:hover .mentor__visual::after {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
	}

	.mentor:hover .mentor__visual {
		background: var(--magenta);
	}

	.mentor__wm {
		position: absolute;
		font-size: 0.6rem;
		letter-spacing: 0.3em;
		opacity: 0.2;
		writing-mode: vertical-rl;
		right: 0.5rem;
	}

	.mentor__ph {
		font-size: 0.48rem;
		letter-spacing: 0.3em;
		opacity: 0.5;
		z-index: 1;
	}

	.mentor__bottom h3 {
		font-family: var(--font-display);
		font-size: 1.15rem;
		text-transform: uppercase;
	}

	.mentor__bottom p {
		font-family: var(--font-serif);
		font-size: 0.88rem;
		font-style: italic;
		text-transform: none;
		letter-spacing: 0;
		color: var(--ink-muted);
		margin-top: 0.25rem;
	}

	.mentor__link {
		display: inline-block;
		margin-top: 0.75rem;
		font-size: 0.48rem;
		letter-spacing: 0.32em;
	}

	@media (max-width: 640px) {
		.mentors__bento {
			grid-template-columns: 1fr;
		}
	}
</style>
