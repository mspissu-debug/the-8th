<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { EDITIONS } from '$lib/content';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
</script>

<section id="edizioni" class="editions">
	<div class="container">
		<header class="editions__head" use:reveal={{ variant: 'clip-up' }}>
			<SectionHeader
				index="07"
				eyebrow="Edizioni"
				title="Due capitoli, una sola domanda."
				subtitle="[Ogni edizione di THE 8th esplora un tema diverso, ma porta avanti la stessa ricerca: cosa significa, oggi, fare gioielleria.]"
			/>
		</header>

		<div class="editions__stack">
			{#each EDITIONS as ed, i (ed.to)}
				<a
					href={ed.to}
					class="edition"
					use:reveal={{ variant: i === 0 ? 'clip-right' : 'clip-left' }}
				>
					<div class="edition__frame" aria-hidden="true"></div>
					<div class="edition__top">
						<span class="edition__tag">{ed.tag}</span>
						<span class="edition__year">{ed.year}</span>
					</div>
					<div class="edition__num">{String(i + 1).padStart(2, '0')}</div>
					<div class="edition__body">
						<h3>{ed.label}</h3>
						<p>{ed.desc}</p>
						<div class="edition__foot">
							<span>{ed.meta}</span>
							<span class="edition__arrow">→</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.editions {
		padding: var(--section-pad) 0;
		background: var(--cream);
	}

	.editions__head {
		margin-bottom: 3rem;
	}

	.editions__stack {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	.edition {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 420px;
		padding: 2rem;
		background: var(--black);
		color: var(--cream);
		overflow: hidden;
		isolation: isolate;
	}

	.edition__frame {
		position: absolute;
		inset: 12px;
		border: 1px solid var(--line-light);
		clip-path: inset(0 0 100% 0);
		transition: clip-path 0.65s var(--ease-material);
		pointer-events: none;
	}

	.edition:hover .edition__frame {
		clip-path: inset(0 0 0 0);
	}

	.edition__top {
		display: flex;
		justify-content: space-between;
		font-size: 0.5rem;
		letter-spacing: 0.35em;
		color: var(--cream-muted);
		position: relative;
		z-index: 1;
	}

	.edition__tag {
		border: 1px solid var(--line-light);
		padding: 0.4rem 0.75rem;
	}

	.edition__num {
		font-family: var(--font-display);
		font-size: clamp(5rem, 14vw, 10rem);
		line-height: 0.85;
		color: var(--acid);
		margin: 1rem 0;
		position: relative;
		z-index: 1;
		transition: letter-spacing 0.5s var(--ease-material);
	}

	.edition:hover .edition__num {
		letter-spacing: 0.02em;
	}

	.edition__body {
		margin-top: auto;
		position: relative;
		z-index: 1;
	}

	.edition__body h3 {
		font-family: var(--font-display);
		font-size: 1.35rem;
		text-transform: uppercase;
		margin-bottom: 0.75rem;
	}

	.edition__body p {
		font-family: var(--font-serif);
		font-size: 0.95rem;
		line-height: 1.7;
		text-transform: none;
		letter-spacing: 0;
		color: var(--cream-muted);
		max-width: 340px;
	}

	.edition__foot {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1.5rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--line-light);
		font-size: 0.48rem;
		letter-spacing: 0.3em;
		color: var(--cream-faint);
	}

	@media (max-width: 800px) {
		.editions__stack {
			grid-template-columns: 1fr;
		}
	}
</style>
