<script lang="ts">
	import { reveal } from '$lib/reveal';

	let shown = $state(false);
</script>

<section
	class="quote"
	class:quote--shown={shown}
	use:reveal={{ variant: 'skew-in', threshold: 0.2, onInView: () => (shown = true) }}
>
	<div class="quote__inner">
		<span class="quote__mark" class:quote__mark--in={shown}>"</span>
		<blockquote class="quote__text" class:quote__text--in={shown}>
			[Una o due frasi — audaci, poetiche, memorabili. Cosa può dire la gioielleria che le
			parole non possono.]
		</blockquote>
		<footer class="quote__foot">
			<span class="quote__line"></span>
			<cite class:quote__cite--in={shown}>THE 8th · 2026</cite>
			<span class="quote__line"></span>
		</footer>
	</div>
</section>

<style>
	.quote {
		padding: clamp(6rem, 14vw, 12rem) 1.5rem;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--sky) 35%, var(--white)) 0%,
			var(--white) 100%
		);
		overflow: hidden;
	}

	.quote__inner {
		max-width: 920px;
		margin-inline: auto;
		text-align: center;
	}

	.quote__mark {
		font-family: var(--font-display);
		font-size: clamp(4rem, 12vw, 8rem);
		line-height: 0.5;
		color: var(--grape);
		opacity: 0;
		display: block;
		margin-bottom: 1.5rem;
		transform: scale(0.6) rotate(-12deg);
		transition:
			opacity 0.8s var(--ease),
			transform 0.9s var(--ease);
	}

	.quote__mark--in {
		opacity: 0.35;
		transform: scale(1) rotate(0deg);
	}

	.quote__text {
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 4vw, 2.75rem);
		line-height: 1.25;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: -0.02em;
		color: var(--indigo);
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.85s var(--ease) 0.15s,
			transform 0.85s var(--ease) 0.15s;
	}

	.quote__text--in {
		opacity: 1;
		transform: translateY(0);
	}

	.quote__foot {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		margin-top: 3rem;
		font-size: 0.52rem;
		letter-spacing: 0.42em;
		color: var(--fg-muted);
	}

	.quote__foot cite {
		font-style: normal;
		opacity: 0;
		transition: opacity 0.7s var(--ease) 0.55s;
	}

	.quote__cite--in {
		opacity: 1;
	}

	.quote__line {
		width: 56px;
		height: 1px;
		background: var(--grape);
		transform: scaleX(0);
		transform-origin: center;
		transition: transform 1s var(--ease) 0.45s;
	}

	.quote--shown .quote__line {
		transform: scaleX(1);
	}
</style>
