<script>
  import NewsletterForm from '$lib/components/NewsletterForm.svelte';
  import MotionIgniteWords from '$lib/components/MotionIgniteWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { t } from '$lib/i18n';

  /** @type {string} */
  export let bg = '#0c0b10';

  /** @type {boolean} */
  export let showOpenCallLink = true;

  /** @type {string} */
  export let sectionCode = '// 14';

  /** @deprecated Ignored — newsletter is always full viewport width. */
  export let wide = false;
</script>

<section
  class="story-newsletter"
  id="home-newsletter"
  style="--story-bg: {bg}"
  aria-labelledby="story-newsletter-title"
>
  <div class="story-newsletter__inner">
    <div class="story-newsletter__copy story-editorial-head">
      <p class="story-newsletter__code story-editorial-head__code">{sectionCode}</p>
      <MotionIgniteWords
        as="h2"
        id="story-newsletter-title"
        className="story-newsletter__title story-editorial-head__title"
        text={$t('openCall.newsletterTitle')}
      />
      <MotionBlock delay={100}>
        <p class="story-newsletter__text story-editorial-head__lede">{$t('openCall.newsletterText')}</p>
      </MotionBlock>
      {#if showOpenCallLink}
        <a class="story-newsletter__link" href="/open-call">{$t('home.storyOpenCallCta')}</a>
      {/if}
    </div>
    <div class="story-newsletter__form">
      <NewsletterForm
        inputId="story-newsletter-email"
        emailLabel={$t('openCall.emailLabel')}
        submitLabel={$t('openCall.subscribe')}
      />
    </div>
  </div>
</section>

<style>
  .story-newsletter {
    width: 100%;
    background: var(--story-bg);
    color: var(--color-linen);
    padding: clamp(5rem, 14vh, 7.5rem) var(--editorial-pad);
    scroll-margin-top: 5rem;
    --newsletter-placeholder: rgba(244, 243, 238, 0.35);
    border-top: 1px solid color-mix(in srgb, var(--color-linen) 8%, transparent);
  }

  .story-newsletter__inner {
    width: 100%;
    max-width: none;
    margin-inline: 0;
    display: grid;
    gap: clamp(1.75rem, 4vh, 2.5rem);
  }

  @media (min-width: 820px) {
    .story-newsletter__inner {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      align-items: end;
      gap: clamp(2rem, 5vw, 4.5rem);
    }
  }

  .story-newsletter__link {
    display: inline-block;
    margin-top: 1.15rem;
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    color: var(--accent-gold);
    border-bottom: 1px solid color-mix(in srgb, var(--accent-gold) 45%, transparent);
    padding-bottom: 0.1rem;
    transition: border-color 0.2s ease, color 0.2s ease;
  }

  .story-newsletter__link:hover {
    border-color: var(--accent-gold);
    color: var(--color-linen);
  }

  .story-newsletter__form {
    width: 100%;
    padding: clamp(1.25rem, 3vh, 1.75rem);
    border: 1px solid color-mix(in srgb, var(--color-linen) 12%, transparent);
    background: color-mix(in srgb, var(--color-linen) 4%, transparent);
  }

  .story-newsletter :global(.newsletter-form__row input) {
    padding: 0.7rem 1rem;
    border: 1px solid color-mix(in srgb, var(--color-linen) 22%, transparent);
    border-radius: 0;
    background: color-mix(in srgb, var(--color-linen) 6%, transparent);
    color: var(--color-linen);
  }

  .story-newsletter :global(.newsletter-form__submit) {
    padding: 0.7rem 1.15rem;
    border: 1px solid color-mix(in srgb, var(--accent-gold) 55%, transparent);
    border-radius: 0;
    background: color-mix(in srgb, var(--accent-gold) 14%, transparent);
    color: var(--color-linen);
    letter-spacing: 0.02em;
    text-transform: none;
    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      transform 0.25s var(--ease-ribbit);
  }

  .story-newsletter :global(.newsletter-form__submit:hover) {
    background: color-mix(in srgb, var(--accent-gold) 22%, transparent);
    border-color: var(--accent-gold);
    transform: translateY(-2px);
  }
</style>
