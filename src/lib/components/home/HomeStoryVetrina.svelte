<script>
  import HeroCarousel from '$lib/components/HeroCarousel.svelte';
  import MotionIgniteWords from '$lib/components/MotionIgniteWords.svelte';
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
  export let sectionCode = '// 13';

  /** @type {string} */
  export let badge = '';

  /** @type {string} */
  export let titleText = '';

  /** @type {string} */
  export let bodyText = '';

  /** @type {string} */
  export let sectionDomId = 'home-vetrina';

  $: title = titleText || $t('home.vetrinaTitle');
  $: body = bodyText || $t('home.storyVetrinaBody');
</script>

<section
  class="story-vetrina"
  class:story-vetrina--stage={!showHead}
  id={sectionDomId}
  style="--story-bg: {bg}"
  aria-labelledby={showHead ? `${sectionDomId}-title` : undefined}
>
  <div class="story-vetrina__media">
    <HeroCarousel
      images={images.slice(0, 8)}
      intervalMs={4200}
      showDots={true}
      dotStyle="progress"
    />
    <div class="story-vetrina__grain" aria-hidden="true"></div>
    <div class="story-vetrina__veil" aria-hidden="true"></div>
  </div>
  {#if showHead}
    <div class="story-vetrina__copy story-editorial-head">
      <p class="story-vetrina__code story-editorial-head__code">
        {sectionCode}{#if badge} · {badge}{/if}
      </p>
      <MotionIgniteWords
        as="h2"
        id={`${sectionDomId}-title`}
        className="story-vetrina__title story-editorial-head__title"
        text={title}
      />
      <MotionBlock delay={120}>
        <p class="story-vetrina__body story-editorial-head__lede">{body}</p>
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
    grid-template-rows: minmax(58svh, 1fr) auto;
    width: 100%;
    background: var(--story-bg);
    color: var(--color-linen);
    min-height: min(100svh, 920px);
    scroll-margin-top: 5rem;
  }

  .story-vetrina__media {
    position: relative;
    min-height: 58svh;
    overflow: hidden;
    isolation: isolate;
  }

  .story-vetrina__media :global(.carousel) {
    position: absolute;
    inset: 0;
  }

  .story-vetrina__grain {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    opacity: 0.06;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    mix-blend-mode: soft-light;
  }

  .story-vetrina__veil {
    position: absolute;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(6, 6, 10, 0.15) 0%,
      rgba(6, 6, 10, 0.35) 50%,
      rgba(6, 6, 10, 0.96) 100%
    );
  }

  .story-vetrina__copy {
    padding: clamp(1.5rem, 4vh, 2.5rem) var(--editorial-pad) clamp(3rem, 8vh, 4.5rem);
    width: 100%;
    max-width: none;
  }

  .story-vetrina__cta {
    display: inline-block;
    margin-top: 1.25rem;
    border: 1px solid color-mix(in srgb, var(--accent-gold) 50%, transparent);
    border-radius: 999px;
    padding: 0.62rem 1.15rem;
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    color: var(--color-linen);
    background: color-mix(in srgb, var(--accent-gold) 10%, transparent);
    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      transform 0.3s var(--ease-ribbit);
  }

  .story-vetrina__cta:hover {
    border-color: var(--accent-gold);
    background: color-mix(in srgb, var(--accent-gold) 18%, transparent);
    transform: translateY(-2px);
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
      grid-template-rows: minmax(62svh, 1fr) auto;
      min-height: 88svh;
    }

    .story-vetrina__copy {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: clamp(2rem, 4vh, 2.75rem);
    }
  }
</style>
