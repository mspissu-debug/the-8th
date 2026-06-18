<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { page } from '$app/stores';
  import { t } from '$lib/i18n';

  const STORAGE_KEY = 'the8th-newsletter-dismissed';

  let visible = false;

  onMount(() => {
    if (!browser) return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => {
      if ($page.url.pathname.startsWith('/admin')) return;
      visible = true;
    }, 4200);
    return () => clearTimeout(timer);
  });

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
    visible = false;
  }

  function goToNewsletter() {
    dismiss();
    if ($page.url.pathname === '/') {
      document.getElementById('home-newsletter')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.location.href = '/#home-newsletter';
  }
</script>

{#if visible}
  <div class="newsletter-popup" role="dialog" aria-labelledby="newsletter-popup-title" aria-modal="true">
    <button type="button" class="newsletter-popup__backdrop" aria-label={$t('nav.close')} on:click={dismiss}></button>
    <div class="newsletter-popup__panel">
      <p class="newsletter-popup__code">// Newsletter</p>
      <h2 id="newsletter-popup-title" class="newsletter-popup__title">{$t('popup.title')}</h2>
      <p class="newsletter-popup__text">{$t('popup.text')}</p>
      <div class="newsletter-popup__actions">
        <button type="button" class="newsletter-popup__btn newsletter-popup__btn--primary" on:click={goToNewsletter}>
          {$t('popup.goto')}
        </button>
        <button type="button" class="newsletter-popup__btn" on:click={dismiss}>
          {$t('popup.later')}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .newsletter-popup {
    position: fixed;
    inset: 0;
    z-index: 390;
    display: grid;
    place-items: center;
    padding: 1rem;
  }

  .newsletter-popup__backdrop {
    position: absolute;
    inset: 0;
    border: none;
    background: rgba(6, 6, 10, 0.5);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    cursor: pointer;
  }

  .newsletter-popup__panel {
    position: relative;
    z-index: 1;
    width: min(26rem, 100%);
    padding: 1.35rem 1.4rem 1.45rem;
    border-radius: 0.85rem;
    border: 1px solid color-mix(in srgb, var(--color-linen) 16%, transparent);
    background: rgba(10, 10, 14, 0.96);
    color: var(--color-linen);
    box-shadow: 0 20px 52px rgba(0, 0, 0, 0.38);
  }

  .newsletter-popup__code {
    margin: 0 0 0.35rem;
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    color: color-mix(in srgb, var(--accent-gold) 75%, transparent);
  }

  .newsletter-popup__title {
    margin: 0 0 0.65rem;
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2.6vw, 1.35rem);
    font-weight: var(--weight-medium);
  }

  .newsletter-popup__text {
    margin: 0 0 1.15rem;
    font-size: var(--editorial-body);
    line-height: 1.55;
    color: color-mix(in srgb, var(--color-linen) 78%, transparent);
  }

  .newsletter-popup__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
  }

  .newsletter-popup__btn {
    border: 1px solid color-mix(in srgb, var(--color-linen) 22%, transparent);
    border-radius: 999px;
    padding: 0.52rem 1rem;
    background: transparent;
    color: var(--color-linen);
    font-family: var(--font-body);
    font-size: var(--type-link);
    cursor: pointer;
  }

  .newsletter-popup__btn--primary {
    border-color: color-mix(in srgb, var(--accent-gold) 55%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 14%, transparent);
  }
</style>
