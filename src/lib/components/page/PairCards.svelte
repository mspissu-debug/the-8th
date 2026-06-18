<script lang="ts">
	import { reveal } from '$lib/reveal';
	import { EDITION_PAIRS } from '$lib/data/pairs';

	let gridIn = $state(false);
</script>

<div
	class="story-pairs"
	use:reveal={{ variant: 'fade', threshold: 0.1, onInView: () => (gridIn = true) }}
>
	{#each EDITION_PAIRS as pair, i (pair.studentSlug)}
		<a
			class="story-pairs__card home-stagger"
			class:in-view={gridIn}
			style="--delay: {0.05 + i * 0.08}s"
			data-variant={i % 2 === 0 ? 'scale' : 'left'}
			href="/students/{pair.studentSlug}"
		>
			<div class="story-pairs__visual">
				{#if pair.studentPortrait}
					<img src={pair.studentPortrait} alt="" loading="lazy" />
				{/if}
				{#if pair.mentorImage}
					<div class="story-pairs__mentor">
						<img src={pair.mentorImage} alt="" loading="lazy" />
					</div>
				{/if}
			</div>
			<div class="story-pairs__meta">
				<p class="story-pairs__code">// 0{i + 1} · Coppia</p>
				<p class="story-pairs__names">
					<span>{pair.studentName}</span>
					<span class="story-pairs__dash">×</span>
					<span>{pair.mentorName}</span>
				</p>
				<p class="story-pairs__project">{pair.studentProject}</p>
			</div>
		</a>
	{/each}
</div>

<style>
	.story-pairs {
		display: grid;
		gap: clamp(1.25rem, 3vw, 2rem);
		grid-template-columns: repeat(2, minmax(0, 1fr));
		max-width: var(--max-width);
		margin: 0 auto;
	}

	@media (min-width: 900px) {
		.story-pairs {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.story-pairs__card {
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
		color: var(--color-linen);
		transition: transform 0.35s var(--ease-ribbit);
	}

	.story-pairs__card:hover {
		transform: translateY(-4px);
	}

	.story-pairs__visual {
		position: relative;
		aspect-ratio: 3 / 4;
		background: #0a0a0e;
		overflow: hidden;
	}

	.story-pairs__visual > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.story-pairs__mentor {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: 50%;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-linen) 35%, transparent);
	}

	.story-pairs__mentor img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 15%;
	}

	.story-pairs__code {
		margin: 0;
		font-size: 0.6rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		opacity: 0.5;
	}

	.story-pairs__names {
		margin: 0;
		font-family: var(--font-display);
		font-size: 0.85rem;
		font-weight: var(--weight-black);
		letter-spacing: 0.02em;
		line-height: 1.25;
	}

	.story-pairs__dash {
		opacity: 0.45;
		margin: 0 0.25rem;
	}

	.story-pairs__project {
		margin: 0.2rem 0 0;
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.55;
	}
</style>
