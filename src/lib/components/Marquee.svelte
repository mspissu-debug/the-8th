<script lang="ts">
	let {
		text,
		speed = 36,
		dark = false,
		accent = false,
		reverse = false
	}: {
		text: string;
		speed?: number;
		dark?: boolean;
		accent?: boolean;
		reverse?: boolean;
	} = $props();

	const track = $derived(`${text} · ${text} · `);
</script>

<div
	class="band"
	class:band--dark={dark}
	class:band--accent={accent}
	style="--dur: {speed}s"
	aria-hidden="true"
>
	<div class="band__track" class:band__track--reverse={reverse}>
		<span>{track}</span>
		<span>{track}</span>
	</div>
</div>

<style>
	.band {
		overflow: hidden;
		border-block: 1px solid var(--line);
		padding: 0.95rem 0;
		background: var(--bg);
	}

	.band--dark {
		background: var(--black);
		color: var(--white);
	}

	.band--accent {
		background: var(--indigo);
		color: var(--white);
	}

	.band__track {
		display: flex;
		width: max-content;
		animation: band-scroll var(--dur) linear infinite;
		font-size: 0.6rem;
		letter-spacing: 0.42em;
		white-space: nowrap;
		will-change: transform;
	}

	.band__track--reverse {
		animation-name: band-scroll-reverse;
	}

	.band__track span {
		padding-right: 3rem;
	}

	.band:hover .band__track {
		animation-play-state: paused;
	}

	@keyframes band-scroll {
		to {
			transform: translateX(-50%);
		}
	}

	@keyframes band-scroll-reverse {
		to {
			transform: translateX(50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.band__track {
			animation: none;
		}
	}
</style>
