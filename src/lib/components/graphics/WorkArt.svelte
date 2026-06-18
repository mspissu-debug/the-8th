<script lang="ts">
	let {
		variant = 'light',
		label = '[WIP]',
		index = 0
	}: {
		variant?: 'light' | 'dark';
		label?: string;
		index?: number;
	} = $props();

	const hues = ['var(--indigo)', 'var(--grape)', 'var(--sky)'];
	const accent = $derived(hues[index % hues.length]);
</script>

<div class="work-art" class:work-art--dark={variant === 'dark'}>
	<svg class="work-art__svg" viewBox="0 0 200 200" aria-hidden="true">
		<rect
			width="200"
			height="200"
			fill={variant === 'dark'
				? 'color-mix(in srgb, var(--white) 5%, transparent)'
				: 'color-mix(in srgb, var(--sky) 38%, transparent)'}
		/>
		<path
			d="M 20 180 L 60 40 L 100 120 L 140 60 L 180 160 Z"
			fill="none"
			stroke={accent}
			stroke-width="1"
			opacity="0.35"
		/>
		<circle cx="100" cy="95" r="42" fill="none" stroke={accent} stroke-width="0.75" opacity="0.25" />
		<line x1="0" y1="100" x2="200" y2="100" stroke={accent} stroke-width="0.5" opacity="0.15" />
		<line x1="100" y1="0" x2="100" y2="200" stroke={accent} stroke-width="0.5" opacity="0.15" />
		{#each Array(5) as _, i (i)}
			<circle
				cx={40 + i * 30}
				cy={150 - (i % 3) * 20}
				r="2"
				fill={accent}
				opacity={0.2 + i * 0.08}
			/>
		{/each}
	</svg>
	<span class="work-art__label">{label}</span>
</div>

<style>
	.work-art {
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 120px;
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		padding: 1rem;
	}

	.work-art__svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.work-art__label {
		position: relative;
		z-index: 1;
		font-size: 0.5rem;
		letter-spacing: 0.3em;
		color: var(--fg-faint);
	}

	.work-art--dark .work-art__label {
		color: color-mix(in srgb, var(--white) 40%, transparent);
	}
</style>
