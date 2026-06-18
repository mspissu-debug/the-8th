<script lang="ts">
	let {
		index,
		total,
		eyebrow,
		accent = false,
		inView = false
	}: {
		index: string;
		total: string;
		eyebrow: string;
		accent?: boolean;
		inView?: boolean;
	} = $props();
</script>

<div class="page-meta" class:in-view={inView}>
	<span>↘</span>
	<span>{index} <span class="page-meta__slash">/</span> {total}</span>
	<span class="page-meta__bar"></span>
	<span class:page-meta__accent={accent}>{eyebrow}</span>
</div>

<style>
	.page-meta__accent {
		color: var(--indigo);
	}
</style>
