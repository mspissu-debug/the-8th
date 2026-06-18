<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { t } from '$lib/i18n';

  const STORAGE_KEY = 'the8th-cookie-consent';

  let visible = false;

  onMount(() => {
    if (!browser) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) visible = true;
  });

  /** @param {'all' | 'essential'} choice */
  function choose(choice) {
    localStorage.setItem(STORAGE_KEY, choice);
    visible = false;
  }
</script>

{#if visible}
  <div class="cookie-consent" role="dialog" aria-labelledby="cookie-consent-title" aria-modal="true">
    <div class="cookie-consent__panel">
      <p class="cookie-consent__code">// Legal</p>
      <h2 id="cookie-consent-title" class="cookie-consent__title">{$t('cookies.title')}</h2>
      <p class="cookie-consent__text">{$t('cookies.text')}</p>
      <div class="cookie-consent__actions">
        <button type="button" class="cookie-consent__btn cookie-consent__btn--primary" on:click={() => choose('all')}>
          {$t('cookies.accept')}
        </button>
        <button type="button" class="cookie-consent__btn" on:click={() => choose('essential')}>
          {$t('cookies.essential')}
        </button>
        <a class="cookie-consent__link" href="/cookie-policy">{$t('cookies.policy')}</a>
      </div>
    </div>
  </div>
{/if}

<style>
  .cookie-consent {
    position: fixed;
    inset: 0;
    z-index: 400;
    display: grid;
    place-items: end center;
    padding: clamp(0.75rem, 3vw, 1.25rem);
    background: rgba(6, 6, 10, 0.42);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }

  .cookie-consent__panel {
    width: min(32rem, 100%);
    padding: 1.25rem 1.35rem 1.35rem;
    border-radius: 0.85rem;
    border: 1px solid color-mix(in srgb, var(--color-linen) 16%, transparent);
    background: rgba(10, 10, 14, 0.94);
    color: var(--color-linen);
    box-shadow: 0 18px 48px rgba(0, 0, 0, 0.35);
  }

  .cookie-consent__code {
    margin: 0 0 0.35rem;
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    color: color-mix(in srgb, var(--accent-gold) 75%, transparent);
  }

  .cookie-consent__title {
    margin: 0 0 0.65rem;
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 2.4vw, 1.25rem);
    font-weight: var(--weight-medium);
    letter-spacing: -0.01em;
  }

  .cookie-consent__text {
    margin: 0 0 1.1rem;
    font-size: var(--editorial-body);
    line-height: 1.55;
    color: color-mix(in srgb, var(--color-linen) 78%, transparent);
  }

  .cookie-consent__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.55rem;
  }

  .cookie-consent__btn {
    border: 1px solid color-mix(in srgb, var(--color-linen) 22%, transparent);
    border-radius: 999px;
    padding: 0.52rem 1rem;
    background: transparent;
    color: var(--color-linen);
    font-family: var(--font-body);
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease;
  }

  .cookie-consent__btn:hover {
    border-color: color-mix(in srgb, var(--color-linen) 38%, transparent);
    background: color-mix(in srgb, var(--color-linen) 8%, transparent);
  }

  .cookie-consent__btn--primary {
    border-color: color-mix(in srgb, var(--accent-gold) 55%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 14%, transparent);
  }

  .cookie-consent__btn--primary:hover {
    border-color: var(--accent-gold);
    background: color-mix(in srgb, var(--accent-gold) 22%, transparent);
  }

  .cookie-consent__link {
    margin-left: auto;
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    color: color-mix(in srgb, var(--color-linen) 62%, transparent);
  }

  .cookie-consent__link:hover {
    color: var(--accent-gold);
  }
</style>
