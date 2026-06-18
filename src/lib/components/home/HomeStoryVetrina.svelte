<script>
  import HeroCarousel from '$lib/components/HeroCarousel.svelte';
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { t } from '$lib/i18n';

  /** @type {string[]} */
  export let images = [];

  /** @type {string} */
  export let bg = '#06060a';

  /** @type {boolean} */
  export let showHead = true;

  /** @type {boolean} */
  export let showCta = true;

  /** @type {string} */
  export let sectionCode = '// 06';

  /** @type {string} */
  export let badge = '';

  /** @type {string} */
  export let titleText = '';

  /** @type {string} */
  export let bodyText = '';

  $: title = titleText || $t('home.vetrinaTitle');
  $: body = bodyText || $t('home.storyVetrinaBody');
</script>

<section
  class="story-vetrina"
  class:story-vetrina--stage={!showHead}
  id="home-vetrina"
  style="--story-bg: {bg}"
  aria-labelledby={showHead ? 'story-vetrina-title' : undefined}
>
  <div class="story-vetrina__media">
    <HeroCarousel
      images={images.slice(0, 8)}
      intervalMs={4200}
      showDots={true}
      dotStyle="progress"
    />
    <div class="story-vetrina__veil" aria-hidden="true"></div>
  </div>
  {#if showHead}
    <div class="story-vetrina__copy">
      <p class="story-vetrina__code">{sectionCode}{#if badge} · {badge}{/if}</p>
      <MotionWords
        as="h2"
        id="story-vetrina-title"
        className="story-vetrina__title"
        text={title}
      />
      <MotionBlock delay={140}>
        <p class="story-vetrina__body">{body}</p>
      </MotionBlock>
      {#if showCta}
        <a class="story-vetrina__cta" href="/editions/september">{$t('home.vetrinaCta')}</a>
      {/if}
    </div>
  {/if}
</section>

<style>
  .story-vetrina {
    display: grid;
    grid-template-rows: minmax(52svh, 1fr) auto;
    background: var(--story-bg);
    color: var(--color-linen);
    min-height: min(100svh, 920px);
    scroll-margin-top: 5rem;
  }

  .story-vetrina__media {
    position: relative;
    min-height: 52svh;
    overflow: hidden;
  }

  .story-vetrina__media :global(.carousel) {
    position: absolute;
    inset: 0;
  }

  .story-vetrina__veil {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background: linear-gradient(180deg, transparent 45%, rgba(6, 6, 10, 0.95) 100%);
  }

  .story-vetrina__copy {
    padding: clamp(1.5rem, 4vh, 2.5rem) var(--editorial-pad) clamp(3rem, 8vh, 4.5rem);
    max-width: 42rem;
  }

  .story-vetrina__code {
    margin: 0 0 0.65rem;
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    text-transform: none;
    opacity: 0.55;
  }

  .story-vetrina :global(.story-vetrina__title) {
    margin: 0;
    font-family: var(--font-display);
    font-weight: var(--weight-black);
    font-size: var(--type-section-title);
    letter-spacing: -0.02em;
    text-transform: none;
    line-height: 1.08;
  }

  .story-vetrina__body {
    margin: 1rem 0 0;
    font-size: var(--editorial-body);
    line-height: 1.62;
    color: color-mix(in srgb, var(--color-linen) 78%, transparent);
  }

  .story-vetrina__cta {
    display: inline-block;
    margin-top: 1.15rem;
    border: 1px solid color-mix(in srgb, var(--color-linen) 30%, transparent);
    border-radius: 999px;
    padding: 0.55rem 1rem;
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    transition: background 0.25s ease, border-color 0.25s ease;
  }

  .story-vetrina__cta:hover {
    border-color: color-mix(in srgb, var(--accent-gold) 55%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 12%, transparent);
  }

  .story-vetrina--stage {
    grid-template-rows: minmax(72svh, 1fr);
    min-height: min(100svh, 960px);
  }

  .story-vetrina--stage .story-vetrina__media {
    min-height: min(100svh, 960px);
  }

  @media (min-width: 960px) {
    .story-vetrina:not(.story-vetrina--stage) {
      grid-template-columns: 1.1fr 0.9fr;
      grid-template-rows: 1fr;
      min-height: 88svh;
    }

    .story-vetrina__copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 2rem;
    }

    .story-vetrina__veil {
      background: linear-gradient(90deg, transparent 55%, rgba(6, 6, 10, 0.88) 100%);
    }
  }
</style>
