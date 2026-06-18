<script>
  import { locale, setLocale } from '$lib/i18n';

  /** Callback opzionale (es. chiudi menu navbar). */
  export let onChange = undefined;

  /** @param {'it' | 'en'} next */
  function pick(next) {
    if (next === $locale) return;
    setLocale(next);
    onChange?.();
  }
</script>

<div class="locale-toggle" role="group" aria-label="Language">
  <button
    type="button"
    class="locale-toggle__btn"
    class:locale-toggle__btn--active={$locale === 'it'}
    on:click={() => pick('it')}
  >
    IT
  </button>
  <span class="locale-toggle__sep" aria-hidden="true">·</span>
  <button
    type="button"
    class="locale-toggle__btn"
    class:locale-toggle__btn--active={$locale === 'en'}
    on:click={() => pick('en')}
  >
    EN
  </button>
</div>

<style>
  .locale-toggle {
    --locale-border: rgba(236, 235, 228, 0.2);
    --locale-muted: rgba(236, 235, 228, 0.45);
    --locale-active: var(--color-linen);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.2rem 0.45rem;
    border: 1px solid var(--locale-border);
    border-radius: var(--radius-xl);
  }

  .locale-toggle__btn {
    padding: 0.15rem 0.35rem;
    border: none;
    background: transparent;
    color: var(--locale-muted);
    font-family: var(--font-body);
    font-size: var(--editorial-eyebrow);
    font-weight: var(--weight-medium);
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: color 0.2s ease;
  }

  .locale-toggle__btn--active {
    color: var(--locale-active);
  }

  .locale-toggle__btn:hover {
    color: var(--locale-active);
  }

  .locale-toggle__sep {
    color: var(--locale-muted);
    font-size: var(--editorial-eyebrow);
    opacity: 0.6;
  }
</style>
