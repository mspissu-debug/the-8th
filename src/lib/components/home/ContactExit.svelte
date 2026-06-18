<script lang="ts">
	import GraphicMesh from '$lib/components/graphics/GraphicMesh.svelte';
	import GraphicRings from '$lib/components/graphics/GraphicRings.svelte';
	import { reveal } from '$lib/reveal';

	let exitSecs = $state(8);
	let atEnd = $state(false);
	let contactIn = $state(false);

	$effect(() => {
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			atEnd = max > 0 && window.scrollY >= max - 24;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	$effect(() => {
		if (!atEnd) {
			exitSecs = 8;
			return;
		}
		const id = setInterval(() => {
			if (exitSecs > 0) exitSecs -= 1;
		}, 1000);
		return () => clearInterval(id);
	});
</script>

<section id="contatti" class="contact">
	<div class="contact__graphics" aria-hidden="true">
		<GraphicMesh variant="dark" opacity={0.5} />
		<div class="contact__rings">
			<GraphicRings size={380} slow />
		</div>
	</div>
	<div class="contact__repeat" aria-hidden="true">
		{#each Array(16) as _}
			<span>contact</span>
		{/each}
	</div>

	<div
		class="container contact__main"
		use:reveal={{ variant: 'clip-up', threshold: 0.15, onInView: () => (contactIn = true) }}
	>
		<h2 class="contact__title home-stagger" class:in-view={contactIn}>Feel like<br />collaborating?</h2>
		<p class="contact__sub home-stagger" class:in-view={contactIn} style="--delay: 0.1s">
			Segui il processo. Scopri cosa nasce dall'incontro tra materia e visione.
		</p>
		<a href="mailto:info@the8.it" class="contact__email home-stagger" class:in-view={contactIn} style="--delay: 0.18s">
			info@the8.it
		</a>
		<div class="contact__links home-stagger" class:in-view={contactIn} style="--delay: 0.26s">
			<a href="/about">Manifesto</a>
			<a href="/#edizioni">Edizioni</a>
			<a href="/contact">Contact page</a>
		</div>
	</div>

	<div class="contact__exit">
		<span>Dramatic exit in</span>
		<strong>00:00:{String(exitSecs).padStart(2, '0')}</strong>
	</div>
</section>

<style>
	.contact {
		position: relative;
		min-height: 90vh;
		background: var(--black);
		color: var(--white);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.contact__graphics {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.contact__rings {
		position: absolute;
		top: 50%;
		left: -5%;
		transform: translateY(-50%);
		opacity: 0.4;
	}

	.contact__repeat {
		position: absolute;
		inset: 0;
		z-index: 0;
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		justify-content: center;
		gap: 1.5rem 2rem;
		padding: 2rem;
		opacity: 0.06;
		pointer-events: none;
	}

	.contact__repeat span {
		font-family: var(--font-display);
		font-size: clamp(2rem, 6vw, 4rem);
		font-weight: 700;
		text-transform: uppercase;
	}

	.contact__main {
		position: relative;
		z-index: 1;
	}

	.contact__title {
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 8vw, 6rem);
		font-weight: 700;
		line-height: 0.95;
		text-transform: uppercase;
		letter-spacing: -0.03em;
	}

	.contact__sub {
		margin-top: 1.5rem;
		font-size: 0.58rem;
		line-height: 1.9;
		letter-spacing: 0.12em;
		text-transform: none;
		max-width: 40ch;
		opacity: 0.7;
	}

	.contact__email {
		display: inline-block;
		margin-top: 2.5rem;
		font-family: var(--font-display);
		font-size: clamp(1.25rem, 3vw, 2rem);
		font-weight: 700;
		text-transform: lowercase;
		letter-spacing: -0.02em;
		text-decoration: underline;
		text-underline-offset: 0.2em;
		transition: opacity 0.25s var(--ease);
	}

	.contact__email:hover {
		opacity: 0.65;
	}

	.contact__links {
		display: flex;
		gap: 2rem;
		margin-top: 2rem;
		font-size: 0.52rem;
		letter-spacing: 0.32em;
		opacity: 0.55;
	}

	.contact__links a:hover {
		opacity: 1;
	}

	.contact__exit {
		position: absolute;
		bottom: 2rem;
		right: clamp(1.25rem, 4vw, 2.5rem);
		font-size: 0.52rem;
		letter-spacing: 0.28em;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 0.35rem;
		z-index: 1;
	}

	.contact__exit strong {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		font-variant-numeric: tabular-nums;
		color: var(--sky);
	}
</style>
