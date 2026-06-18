<script lang="ts">
	import { locale, LOCALE_LABELS, setLocale, type Locale } from '$lib/i18n';
</script>

<div class="locale" role="group" aria-label="Lingua">
	{#each Object.entries(LOCALE_LABELS) as [code, label] (code)}
		<button
			type="button"
			class="locale__btn"
			class:locale__btn--on={$locale === code}
			onclick={() => setLocale(code as Locale)}
		>
			{label}
		</button>
	{/each}
</div>

<style>
	.locale {
		display: flex;
		gap: 0;
		border: 1px solid var(--line);
	}

	.locale__btn {
		padding: 0.4rem 0.65rem;
		font-size: 0.48rem;
		letter-spacing: 0.28em;
		color: var(--fg-muted);
		transition:
			background 0.25s var(--ease),
			color 0.25s var(--ease);
	}

	.locale__btn--on {
		background: var(--indigo);
		color: var(--white);
	}

	.locale__btn:hover:not(.locale__btn--on) {
		color: var(--indigo);
	}
</style>
