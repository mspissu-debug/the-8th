<script lang="ts">
	let { to = 'dark' }: { to?: 'dark' | 'light' | 'soft' } = $props();
</script>

<div class="band-fade band-fade--to-{to}" aria-hidden="true"></div>
