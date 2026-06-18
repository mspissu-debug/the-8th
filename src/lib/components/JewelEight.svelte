<!-- Anello decorativo attorno all'8 — niente glitch -->
<div class="jewel-eight" aria-hidden="true">
	<span class="jewel-eight__ring jewel-eight__ring--1"></span>
	<span class="jewel-eight__ring jewel-eight__ring--2"></span>
	<span class="jewel-eight__ring jewel-eight__ring--3"></span>
	<span class="jewel-eight__num">8</span>
</div>

<style>
	.jewel-eight {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.15em;
		height: 1.15em;
	}

	.jewel-eight__num {
		position: relative;
		z-index: 2;
		font: inherit;
		color: inherit;
		line-height: 0.85;
		animation: jewel-settle 1.4s var(--ease-material) 0.35s both;
	}

	.jewel-eight__ring {
		position: absolute;
		border-radius: 50%;
		border: 1px solid currentColor;
		opacity: 0.35;
		pointer-events: none;
	}

	.jewel-eight__ring--1 {
		inset: -8%;
		animation: jewel-orbit 28s linear infinite;
	}

	.jewel-eight__ring--2 {
		inset: -18%;
		border-style: dashed;
		opacity: 0.2;
		animation: jewel-orbit 42s linear infinite reverse;
	}

	.jewel-eight__ring--3 {
		inset: -28%;
		opacity: 0.12;
		animation: jewel-orbit 58s linear infinite;
	}

	@keyframes jewel-settle {
		from {
			opacity: 0;
			transform: rotate(-18deg) scale(0.72);
		}
		to {
			opacity: 1;
			transform: rotate(0deg) scale(1);
		}
	}

	@keyframes jewel-orbit {
		to {
			transform: rotate(360deg);
		}
	}
</style>
