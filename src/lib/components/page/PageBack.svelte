<script lang="ts">
	let {
		href,
		label,
		inView = false
	}: {
		href: string;
		label: string;
		inView?: boolean;
	} = $props();
</script>

<a {href} class="page-back" class:in-view={inView}>{label}</a>
