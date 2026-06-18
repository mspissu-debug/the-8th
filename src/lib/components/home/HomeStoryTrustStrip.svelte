<script>
  import { trustStripPartners } from '$lib/data/trust-strip.js';
  import { t } from '$lib/i18n';

  /** @type {string} */
  export let bg = '#0c0b10';
</script>

<section class="trust-strip" style="--story-bg: {bg}" aria-label={$t('home.trustStripAria')}>
  <div class="trust-strip__inner">
    <p class="trust-strip__label">{$t('home.trustStripLabel')}</p>
    <ul class="trust-strip__logos">
      {#each trustStripPartners as partner (partner.name)}
        <li>
          <a
            class="trust-strip__logo"
            href={partner.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {partner.name}
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .trust-strip {
    background: var(--story-bg);
    border-block: 1px solid color-mix(in srgb, var(--color-linen) 10%, transparent);
    padding: clamp(1.75rem, 4vh, 2.5rem) var(--editorial-pad);
  }

  .trust-strip__inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;
    text-align: center;
  }

  .trust-strip__label {
    margin: 0;
    font-size: var(--type-label);
    letter-spacing: 0.06em;
    text-transform: none;
    color: color-mix(in srgb, var(--color-linen) 48%, transparent);
  }

  .trust-strip__logos {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.65rem 1.35rem;
  }

  .trust-strip__logo {
    font-family: var(--font-display);
    font-size: clamp(0.82rem, 1.6vw, 0.98rem);
    font-weight: var(--weight-medium);
    letter-spacing: 0.04em;
    text-transform: none;
    color: color-mix(in srgb, var(--color-linen) 72%, transparent);
    transition: color 0.25s ease;
  }

  .trust-strip__logo:hover {
    color: var(--accent-gold);
  }
</style>
