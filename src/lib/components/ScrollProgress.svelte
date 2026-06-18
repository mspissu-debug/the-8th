<script lang="ts">
	let progress = $state(0);

	$effect(() => {
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 0 ? window.scrollY / max : 0;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div class="scroll-meter" aria-hidden="true">
	<div class="scroll-meter__fill" style="transform: scaleY({progress})"></div>
</div>

<style>
	.scroll-meter {
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		width: 3px;
		z-index: 200;
		background: rgba(10, 10, 10, 0.06);
		pointer-events: none;
	}

	.scroll-meter__fill {
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, var(--magenta), var(--acid));
		transform-origin: top center;
		will-change: transform;
	}
</style>
