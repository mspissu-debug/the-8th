<script>
  import NewsletterForm from '$lib/components/NewsletterForm.svelte';
  import MotionWords from '$lib/components/MotionWords.svelte';
  import { t } from '$lib/i18n';

  /** @type {string} */
  export let bg = '#0c0b10';

  /** @type {boolean} */
  export let showOpenCallLink = true;

  /** @type {string} */
  export let sectionCode = '// 14';

  /** Layout largo come profilo talento/mentor e footer story. */
  export let wide = false;
</script>

<section
  class="story-newsletter"
  class:story-newsletter--wide={wide}
  id="home-newsletter"
  style="--story-bg: {bg}"
  aria-labelledby="story-newsletter-title"
>
  <div class="story-newsletter__inner">
    <div class="story-newsletter__copy">
      <p class="story-newsletter__code">{sectionCode}</p>
      <MotionWords
        as="h2"
        id="story-newsletter-title"
        className="story-newsletter__title"
        text={$t('openCall.newsletterTitle')}
      />
      <p class="story-newsletter__text">{$t('openCall.newsletterText')}</p>
      {#if showOpenCallLink}
        <a class="story-newsletter__link" href="/open-call">{$t('home.storyOpenCallCta')}</a>
      {/if}
    </div>
    <NewsletterForm
      inputId="story-newsletter-email"
      emailLabel={$t('openCall.emailLabel')}
      submitLabel={$t('openCall.subscribe')}
    />
  </div>
</section>

<style>
  .story-newsletter {
    background: var(--story-bg);
    color: var(--color-linen);
    padding: clamp(5rem, 14vh, 7.5rem) var(--editorial-pad);
    scroll-margin-top: 5rem;
    --newsletter-placeholder: rgba(244, 243, 238, 0.35);
  }

  .story-newsletter__inner {
    max-width: var(--editorial-max);
    margin: 0 auto;
    display: grid;
    gap: 1.75rem;
  }

  .story-newsletter--wide .story-newsletter__inner {
    max-width: var(--max-width);
    width: 100%;
  }

  @media (min-width: 820px) {
    .story-newsletter__inner {
      grid-template-columns: 1.05fr 0.95fr;
      align-items: end;
      gap: 2.5rem;
    }

    .story-newsletter--wide .story-newsletter__inner {
      grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
      align-items: center;
      gap: clamp(2rem, 5vw, 4rem);
    }
  }

  .story-newsletter--wide .story-newsletter__text {
    max-width: none;
  }

  .story-newsletter__code {
    margin: 0 0 0.75rem;
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    text-transform: none;
    opacity: 0.55;
  }

  .story-newsletter :global(.story-newsletter__title) {
    margin: 0;
    font-family: var(--font-display);
    font-weight: var(--weight-black);
    font-size: var(--type-section-title);
    letter-spacing: -0.02em;
    text-transform: none;
    line-height: 1.08;
  }

  .story-newsletter__text {
    margin: 1rem 0 0;
    max-width: 38rem;
    font-size: var(--editorial-body);
    line-height: 1.62;
    color: color-mix(in srgb, var(--color-linen) 75%, transparent);
  }

  .story-newsletter__link {
    display: inline-block;
    margin-top: 1rem;
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    color: var(--accent-gold);
  }

  .story-newsletter :global(.newsletter-form__row input) {
    padding: 0.65rem 1rem;
    border: 1px solid color-mix(in srgb, var(--color-linen) 22%, transparent);
    border-radius: 0.35rem;
    background: color-mix(in srgb, var(--color-linen) 6%, transparent);
    color: var(--color-linen);
  }

  .story-newsletter :global(.newsletter-form__submit) {
    padding: 0.65rem 1.1rem;
    border: 1px solid color-mix(in srgb, var(--accent-gold) 50%, transparent);
    border-radius: 0.35rem;
    background: color-mix(in srgb, var(--accent-gold) 16%, transparent);
    color: var(--color-linen);
  }
</style>
