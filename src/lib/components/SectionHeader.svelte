<script lang="ts">
	let {
		index,
		total = '07',
		eyebrow,
		title,
		subtitle = '',
		light = false,
		large = false
	}: {
		index: string;
		total?: string;
		eyebrow: string;
		title: string;
		subtitle?: string;
		light?: boolean;
		large?: boolean;
	} = $props();
</script>

<header class="sh" class:sh--light={light} class:sh--large={large}>
	<div class="sh__meta">
		<span class="sh__arrow">↘</span>
		<span class="sh__index">{index}</span>
		<span class="sh__slash">/</span>
		<span class="sh__total">{total}</span>
		<span class="sh__rule"></span>
		<span class="sh__eyebrow">{eyebrow}</span>
	</div>
	<h2 class="sh__title">{title}</h2>
	{#if subtitle}
		<p class="sh__sub">{subtitle}</p>
	{/if}
</header>

<style>
	.sh {
		margin-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.sh__meta {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.65rem 1rem;
		font-size: 0.55rem;
		letter-spacing: 0.38em;
		color: var(--ink-faint);
		margin-bottom: 1.75rem;
	}

	.sh--light .sh__meta {
		color: var(--cream-faint);
	}

	.sh__arrow {
		color: var(--magenta);
	}

	.sh--light .sh__arrow {
		color: var(--acid);
	}

	.sh__index {
		color: var(--black);
		font-variant-numeric: tabular-nums;
	}

	.sh--light .sh__index,
	.sh--light .sh__eyebrow {
		color: var(--cream);
	}

	.sh__slash {
		opacity: 0.35;
	}

	.sh__rule {
		flex: 1;
		min-width: 60px;
		max-width: 200px;
		height: 1px;
		background: currentColor;
		opacity: 0.25;
	}

	.sh__eyebrow {
		color: var(--black);
		margin-left: auto;
	}

	.sh__title {
		font-family: var(--font-display);
		font-size: clamp(2.4rem, 6.5vw, 5rem);
		line-height: 0.9;
		letter-spacing: -0.035em;
		text-transform: uppercase;
		max-width: 14ch;
	}

	.sh--large .sh__title {
		font-size: clamp(2.8rem, 8vw, 6.5rem);
		max-width: 12ch;
	}

	.sh__sub {
		font-family: var(--font-serif);
		font-size: clamp(1rem, 2vw, 1.25rem);
		line-height: 1.65;
		font-style: italic;
		text-transform: none;
		letter-spacing: 0;
		color: var(--ink-muted);
		margin-top: 1.25rem;
		max-width: 42ch;
	}

	.sh--light .sh__sub {
		color: var(--cream-muted);
	}
</style>
