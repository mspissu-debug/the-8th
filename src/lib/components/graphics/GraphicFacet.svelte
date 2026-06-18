<script lang="ts">
	let { index = 0 }: { index?: number } = $props();

	const palettes = [
		['var(--indigo)', 'var(--grape)', 'var(--sky)'],
		['var(--grape)', 'var(--sky)', 'var(--indigo)'],
		['var(--sky)', 'var(--indigo)', 'var(--grape)'],
		['var(--indigo)', 'var(--sky)', 'var(--grape)'],
		['var(--grape)', 'var(--indigo)', 'var(--sky)'],
		['var(--sky)', 'var(--grape)', 'var(--indigo)']
	];

	const colors = $derived(palettes[index % palettes.length]);
</script>

<svg class="graphic-facet" viewBox="0 0 120 140" aria-hidden="true">
	<polygon points="60,8 108,45 88,132 32,132 12,45" fill={colors[0]} opacity="0.18" />
	<polygon points="60,28 92,52 78,118 42,118 28,52" fill={colors[1]} opacity="0.26" />
	<polygon points="60,48 76,58 68,98 52,98 44,58" fill={colors[2]} opacity="0.38" />
	<line x1="60" y1="8" x2="60" y2="132" stroke={colors[0]} stroke-width="0.75" opacity="0.35" />
	<line x1="12" y1="45" x2="108" y2="45" stroke={colors[1]} stroke-width="0.75" opacity="0.25" />
	<line x1="28" y1="52" x2="92" y2="118" stroke={colors[2]} stroke-width="0.5" opacity="0.2" />
	<line x1="92" y1="52" x2="28" y2="118" stroke={colors[2]} stroke-width="0.5" opacity="0.2" />
</svg>

<style>
	.graphic-facet {
		width: min(70%, 140px);
		height: auto;
		transition: transform 0.5s var(--ease);
	}

	:global(.gallery__item:hover) .graphic-facet,
	:global(.work-cell:hover) .graphic-facet {
		transform: rotate(12deg) scale(1.08);
	}
</style>
