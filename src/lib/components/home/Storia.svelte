<script lang="ts">
	import { MILESTONES } from '$lib/content';
	import { reveal } from '$lib/reveal';

	let headIn = $state(false);
	let listIn = $state(false);
</script>

<section id="storia" class="storia">
	<div
		class="container"
		use:reveal={{ variant: 'clip-up', threshold: 0.15, onInView: () => (headIn = true) }}
	>
		<p class="section-label home-stagger" class:in-view={headIn}>03 · La storia</p>
		<h2 class="storia__title home-stagger" class:in-view={headIn} style="--delay: 0.08s">Come è nato <em>THE 8th</em>.</h2>
		<p class="storia__intro home-stagger" class:in-view={headIn} style="--delay: 0.16s">
			[Un paragrafo breve sulla genesi del contest — l'idea, il perché del numero 8, la missione di
			connettere talento emergente e maestria consolidata nella gioielleria.]
		</p>
	</div>
	<ol
		class="storia__list"
		use:reveal={{ variant: 'fade', threshold: 0.08, onInView: () => (listIn = true) }}
	>
		{#each MILESTONES as m, i (i)}
			<li
				class="storia__item home-stagger"
				class:in-view={listIn}
				class:storia__item--alt={i % 2 === 1}
				style="--delay: {0.06 + i * 0.1}s"
			>
				<span class="storia__roman">{m.tag}</span>
				<div>
					<span class="storia__year">{m.year}</span>
					<h3>{m.label}</h3>
					<p>{m.desc}</p>
				</div>
			</li>
		{/each}
	</ol>
</section>

<style>
	.storia {
		padding: var(--pad-section) 0;
		background: var(--bg-soft);
		border-bottom: 1px solid var(--line);
	}

	.storia__title {
		font-family: var(--font-display);
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: -0.03em;
		margin-bottom: 1rem;
	}

	.storia__title em {
		font-style: normal;
		color: var(--indigo);
	}

	.storia__intro {
		font-size: 0.6rem;
		line-height: 2;
		text-transform: none;
		letter-spacing: 0.08em;
		color: var(--fg-muted);
		max-width: 50ch;
		margin-bottom: 3rem;
	}

	.storia__list {
		list-style: none;
		border-top: 1px solid var(--line);
		position: relative;
	}

	.storia__list::before {
		content: '';
		position: absolute;
		left: clamp(1.25rem, 4vw, 2.5rem);
		top: 0;
		bottom: 0;
		width: 1px;
		background: linear-gradient(var(--indigo), var(--sky), transparent);
		opacity: 0.35;
		margin-left: 39px;
	}

	.storia__item {
		display: grid;
		grid-template-columns: 80px 1fr;
		gap: 2rem;
		padding: 2rem clamp(1.25rem, 4vw, 2.5rem);
		border-bottom: 1px solid var(--line);
		transition: padding-left 0.4s var(--ease);
	}

	.storia__item:hover {
		padding-left: calc(clamp(1.25rem, 4vw, 2.5rem) + 8px);
	}

	.storia__item--alt {
		background: color-mix(in srgb, var(--indigo) 4%, transparent);
	}

	.storia__item--alt .storia__roman {
		color: var(--indigo);
	}

	.storia__roman {
		font-family: var(--font-display);
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--grape);
		opacity: 0.35;
	}

	.storia__year {
		font-size: 0.5rem;
		letter-spacing: 0.35em;
		color: var(--fg-faint);
	}

	.storia__item h3 {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 700;
		text-transform: uppercase;
		margin: 0.5rem 0;
	}

	.storia__item p {
		font-size: 0.58rem;
		line-height: 1.85;
		text-transform: none;
		letter-spacing: 0.06em;
		color: var(--fg-muted);
		max-width: 55ch;
	}
</style>
