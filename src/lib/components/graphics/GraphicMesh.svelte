<script lang="ts">
	let {
		variant = 'light',
		opacity = 0.4
	}: { variant?: 'light' | 'dark'; opacity?: number } = $props();

	const stroke = $derived(variant === 'dark' ? 'rgba(254,252,253,0.08)' : 'rgba(59,51,85,0.12)');
</script>

<svg
	class="graphic-mesh"
	style="opacity: {opacity}"
	viewBox="0 0 800 800"
	preserveAspectRatio="xMidYMid slice"
	aria-hidden="true"
>
	<defs>
		<pattern id="mesh-{variant}" width="40" height="40" patternUnits="userSpaceOnUse">
			<path d="M 40 0 L 0 0 0 40" fill="none" stroke={stroke} stroke-width="0.75" />
		</pattern>
		<pattern id="mesh-dots-{variant}" width="24" height="24" patternUnits="userSpaceOnUse">
			<circle cx="1" cy="1" r="0.8" fill={stroke} />
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#mesh-{variant})" />
	<rect width="100%" height="100%" fill="url(#mesh-dots-{variant})" opacity="0.6" />
	<circle
		cx="400"
		cy="400"
		r="280"
		fill="none"
		stroke={variant === 'dark' ? 'var(--sky)' : 'var(--sky)'}
		stroke-width="1"
		opacity="0.45"
	/>
	<circle
		cx="400"
		cy="400"
		r="180"
		fill="none"
		stroke={variant === 'dark' ? 'var(--grape)' : 'var(--indigo)'}
		stroke-width="0.75"
		opacity="0.35"
	/>
	<circle cx="120" cy="200" r="6" fill="var(--sky)" opacity="0.5" />
	<circle cx="680" cy="320" r="5" fill="var(--grape)" opacity="0.45" />
	<circle cx="520" cy="120" r="4" fill="var(--indigo)" opacity="0.4" />
	<circle cx="280" cy="620" r="7" fill="var(--sky)" opacity="0.35" />
</svg>

<style>
	.graphic-mesh {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
