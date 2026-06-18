<script lang="ts">
	import { EDITIONS } from '$lib/content';
	import GraphicFacet from '$lib/components/graphics/GraphicFacet.svelte';
	import { reveal } from '$lib/reveal';

	let headIn = $state(false);
	let listIn = $state(false);

	const projects = [
		...EDITIONS.map((ed) => ({
			title: ed.label,
			sub: ed.year,
			desc: ed.desc,
			href: ed.to,
			tag: ed.tag
		})),
		{
			title: 'I Mentori',
			sub: '04 maestri',
			desc: '[Brevissima nota su come sono stati scelti — la diversità di approcci come ricchezza del programma.]',
			href: '/#mentori',
			tag: 'People'
		},
		{
			title: 'Gli Studenti',
			sub: '04 ricerche',
			desc: '[Una riga sul lavoro in corso — gioco di luce, materia, processo.]',
			href: '/#studenti',
			tag: 'Work'
		}
	];
</script>

<section id="edizioni" class="projects">
	<div
		class="container projects__head"
		use:reveal={{ variant: 'clip-up', threshold: 0.2, onInView: () => (headIn = true) }}
	>
		<h2 class="projects__title home-stagger" class:in-view={headIn}>Selected<br />editions</h2>
		<a
			href="/#edizioni"
			class="link-chain home-stagger"
			class:in-view={headIn}
			style="--delay: 0.12s"
			aria-label="Vedi tutte le edizioni"
		>
			<span class="link-chain__track">
				<span>VIEW ALL · VIEW ALL · VIEW ALL · </span>
				<span>VIEW ALL · VIEW ALL · VIEW ALL · </span>
			</span>
		</a>
	</div>

	<div
		class="projects__list"
		use:reveal={{ variant: 'fade', threshold: 0.08, onInView: () => (listIn = true) }}
	>
		{#each projects as p, i (p.href)}
			<a
				href={p.href}
				class="project home-stagger"
				class:project--soft={i % 2 === 1}
				class:project--reveal-alt={i % 2 === 1}
				class:in-view={listIn}
				style="--delay: {0.06 + i * 0.08}s"
			>
				<div class="project__deco" aria-hidden="true">
					<GraphicFacet index={i} />
				</div>
				<div class="project__top">
					<span>{p.tag}</span>
					<span>{String(i + 1).padStart(2, '0')}</span>
				</div>
				<h3 class="project__name">{p.title}</h3>
				<p class="project__sub">{p.sub}</p>
				<p class="project__desc">{p.desc}</p>
				<span class="project__go link-chain">
					<span class="link-chain__track">
						<span>VIEW LIVE SITE · VIEW LIVE SITE · </span>
						<span>VIEW LIVE SITE · VIEW LIVE SITE · </span>
					</span>
				</span>
			</a>
		{/each}
	</div>
</section>

<style>
	.projects {
		padding: var(--pad-section) 0;
		background: var(--bg);
		border-bottom: 1px solid var(--line);
	}

	.projects__head {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 2rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}

	.projects__title {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 7vw, 5rem);
		font-weight: 700;
		line-height: 0.95;
		text-transform: uppercase;
		letter-spacing: -0.03em;
	}

	.projects__list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		border: 1px solid var(--line);
	}

	.project {
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 380px;
		padding: 2rem;
		border: 1px solid var(--line);
		margin: -1px 0 0 -1px;
		overflow: hidden;
		transition:
			background 0.35s var(--ease),
			color 0.35s var(--ease),
			opacity 0.75s var(--ease),
			transform 0.75s var(--ease);
	}

	.project--reveal-alt.home-stagger:not(.in-view) {
		transform: translateX(28px);
	}

	.project.home-stagger:not(.in-view):not(.project--reveal-alt) {
		transform: translateX(-28px);
	}

	.project__deco {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 72px;
		opacity: 0.5;
		pointer-events: none;
		transition: opacity 0.35s var(--ease), transform 0.45s var(--ease);
	}

	.project:hover .project__deco {
		opacity: 0.85;
		transform: scale(1.1) rotate(-8deg);
	}

	.project:hover {
		background: var(--black);
		color: var(--white);
	}

	.project--soft {
		background: var(--bg-soft);
	}

	.project:hover.project--soft {
		background: var(--black);
	}

	.project__top {
		display: flex;
		justify-content: space-between;
		font-size: 0.5rem;
		letter-spacing: 0.35em;
		opacity: 0.55;
		margin-bottom: 2rem;
	}

	.project__name {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 3vw, 2.25rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.project__sub {
		margin-top: 0.5rem;
		font-size: 0.52rem;
		letter-spacing: 0.3em;
		opacity: 0.6;
	}

	.project__desc {
		margin-top: 1.25rem;
		font-size: 0.58rem;
		line-height: 1.85;
		letter-spacing: 0.08em;
		text-transform: none;
		opacity: 0.7;
		flex: 1;
	}

	.project__go {
		margin-top: 2rem;
		opacity: 0.8;
	}

	@media (max-width: 800px) {
		.projects__list {
			grid-template-columns: 1fr;
		}
	}
</style>
