<script lang="ts">
	import { reveal } from '$lib/reveal';

	let {
		index,
		label,
		variant = 'clip-left' as const
	}: {
		index: string;
		label: string;
		variant?: 'clip-left' | 'clip-right' | 'fade' | 'scale';
	} = $props();

	let inView = $state(false);
</script>

<div
	class="bridge"
	use:reveal={{ variant, threshold: 0.35, onInView: () => (inView = true) }}
>
	<span class="bridge__idx" class:bridge__idx--in={inView}>{index}</span>
	<span class="bridge__line" class:bridge__line--in={inView} aria-hidden="true"></span>
	<span class="bridge__label" class:bridge__label--in={inView}>{label}</span>
	<span class="bridge__dots" class:bridge__dots--in={inView} aria-hidden="true">
		{#each Array(8) as _, i (i)}
			<span style="--i: {i}"></span>
		{/each}
	</span>
</div>

<style>
	.bridge {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: clamp(1rem, 3vw, 2rem);
		padding: clamp(2.5rem, 6vw, 4rem) clamp(1.25rem, 4vw, 2.5rem);
		border-bottom: 1px solid var(--line);
		overflow: hidden;
	}

	.bridge__idx {
		font-size: 0.52rem;
		letter-spacing: 0.42em;
		color: var(--grape);
		opacity: 0;
		transform: translateX(-12px);
		transition:
			opacity 0.7s var(--ease),
			transform 0.7s var(--ease);
	}

	.bridge__idx--in {
		opacity: 1;
		transform: translateX(0);
	}

	.bridge__line {
		height: 1px;
		background: linear-gradient(90deg, var(--indigo), var(--sky), transparent);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 1.1s var(--ease) 0.15s;
	}

	.bridge__line--in {
		transform: scaleX(1);
	}

	.bridge__label {
		font-family: var(--font-display);
		font-size: clamp(0.75rem, 2vw, 1rem);
		font-weight: 700;
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: var(--indigo);
		opacity: 0;
		transform: translateX(16px);
		transition:
			opacity 0.75s var(--ease) 0.35s,
			transform 0.75s var(--ease) 0.35s;
	}

	.bridge__label--in {
		opacity: 1;
		transform: translateX(0);
	}

	.bridge__dots {
		grid-column: 1 / -1;
		display: flex;
		justify-content: center;
		gap: 0.65rem;
		margin-top: 0.5rem;
	}

	.bridge__dots span {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: var(--grape);
		opacity: 0;
		transform: scale(0);
		transition:
			opacity 0.4s var(--ease),
			transform 0.45s var(--ease);
		transition-delay: calc(0.5s + var(--i) * 0.06s);
	}

	.bridge__dots--in span {
		opacity: 0.55;
		transform: scale(1);
	}

	.bridge__dots span:nth-child(odd) {
		background: var(--sky);
	}
</style>
