<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		children,
		external = false
	}: {
		href: string;
		children: Snippet;
		external?: boolean;
	} = $props();
</script>

<a {href} class="hlink" target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
	<span class="hlink__text">{@render children()}</span>
	<span class="hlink__line" aria-hidden="true"></span>
</a>

<style>
	.hlink {
		position: relative;
		display: inline-block;
	}

	.hlink__line {
		position: absolute;
		left: 0;
		bottom: -0.2em;
		width: 100%;
		height: 1px;
		background: currentColor;
		transform: scaleX(0);
		transform-origin: right;
		transition: transform 0.45s var(--ease-out);
	}

	.hlink:hover .hlink__line {
		transform: scaleX(1);
		transform-origin: left;
	}
</style>
