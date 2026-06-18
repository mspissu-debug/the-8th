<script lang="ts">
	let {
		index,
		total,
		eyebrow,
		title,
		dark = false,
		accent,
		inView = false,
		delay = '0s'
	}: {
		index: string;
		total: string;
		eyebrow: string;
		title: string;
		dark?: boolean;
		accent?: string;
		inView?: boolean;
		delay?: string;
	} = $props();
</script>

<header class="page-head" class:page-head--in={inView} style="--delay: {delay}">
	<div class="page-head__meta">
		<span>↘</span>
		<span>{index} <span class="page-meta__slash">/</span> {total}</span>
		<span style={accent ? `color: ${accent}` : ''} class="page-head__accent">{eyebrow}</span>
	</div>
	<h2 class="page-head__title" class:page-head__title--on-dark={dark}>{title}</h2>
</header>

<style>
	.page-head__title--on-dark {
		color: var(--white);
	}

	.page-head__meta {
		transition-delay: var(--delay, 0s);
	}

	.page-head__title {
		transition-delay: calc(var(--delay, 0s) + 0.08s);
	}
</style>
