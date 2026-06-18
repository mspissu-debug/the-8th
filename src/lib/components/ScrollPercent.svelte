<script lang="ts">
	import { page } from '$app/stores';

	const hidden = $derived(
		$page.url.pathname === '/' ||
			$page.url.pathname.startsWith('/students') ||
			$page.url.pathname.startsWith('/mentors') ||
			$page.url.pathname.startsWith('/editions') ||
			$page.url.pathname === '/contact' ||
			$page.url.pathname === '/open-call' ||
			$page.url.pathname === '/cookie-policy'
	);
</script>

{#if !hidden}
	<div class="scroll-pct" aria-live="polite">
		<span class="scroll-pct__num">scroll</span>
	</div>
{/if}

<style>
	.scroll-pct {
		position: fixed;
		right: clamp(1.1rem, 3vw, 2rem);
		bottom: clamp(1.1rem, 3vh, 1.75rem);
		z-index: 120;
		pointer-events: none;
		font-size: 0.48rem;
		letter-spacing: 0.32em;
		text-transform: uppercase;
		color: var(--grape);
		opacity: 0.85;
	}
</style>
