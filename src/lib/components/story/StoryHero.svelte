<script>
  import PageNav from '$lib/components/PageNav.svelte';
  import HeroCarousel from '$lib/components/HeroCarousel.svelte';
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';

  /** @type {string[]} */
  export let images = [];

  /** @type {{ href?: string, label: string }[]} */
  export let crumbs = [];

  /** @type {{ href: string, label: string, hint?: string } | null} */
  export let back = null;

  /** @type {string} */
  export let code = '';

  /** @type {string} */
  export let title = '';

  /** @type {string} */
  export let lede = '';

  /** @type {string} */
  export let minHeight = 'min(88svh, 52rem)';

  /** @type {number} */
  export let intervalMs = 5600;

  /** @type {string} */
  export let titleClass = 'story-hero__title';

  /** @type {'default' | 'story'} */
  export let navVariant = 'story';
</script>

<section class="story-hero" style="--story-hero-min: {minHeight}" aria-label={title || 'Intro'}>
  <div class="story-hero__media" aria-hidden="true">
    {#if images.length}
      <HeroCarousel {images} {intervalMs} />
    {/if}
    <div class="story-hero__veil"></div>
  </div>

  <div class="story-hero__ui">
    {#if crumbs.length || back}
      <MotionBlock delay={0}>
        <PageNav {crumbs} {back} variant={navVariant} />
      </MotionBlock>
    {/if}
    <div class="story-hero__copy">
      {#if code}
        <p class="story-hero__code">{code}</p>
      {/if}
      {#if title}
        <MotionWords as="h1" className={titleClass} text={title} />
      {/if}
      {#if lede}
        <MotionBlock delay={120}>
          <p class="story-hero__lede">{lede}</p>
        </MotionBlock>
      {/if}
      <slot name="hero-extra" />
    </div>
  </div>
</section>

<style>
  .story-hero {
    position: relative;
    min-height: var(--story-hero-min, min(88svh, 52rem));
    display: grid;
    align-items: end;
    color: var(--color-linen);
  }

  .story-hero__media {
    position: absolute;
    inset: 0;
  }

  .story-hero__media :global(.carousel),
  .story-hero__media :global(.carousel__slides),
  .story-hero__media :global(.carousel__img) {
    position: absolute;
    inset: 0;
  }

  .story-hero__veil {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        180deg,
        color-mix(in srgb, var(--story-bg) 65%, transparent) 0%,
        color-mix(in srgb, var(--story-bg) 45%, transparent) 50%,
        color-mix(in srgb, var(--story-bg) 94%, transparent) 100%
      ),
      radial-gradient(
        circle at 18% 12%,
        color-mix(in srgb, var(--accent-primary) 16%, transparent),
        transparent 42%
      );
  }

  .story-hero__ui {
    position: relative;
    z-index: 2;
    width: 100%;
  }

  .story-hero__ui :global(.page-nav) {
    max-width: none;
    padding: calc(4.25rem + 0.5rem) var(--editorial-pad) 0;
    color: color-mix(in srgb, var(--color-linen) 55%, transparent);
  }

  .story-hero__copy {
    padding: clamp(2rem, 8vh, 4rem) var(--editorial-pad) clamp(2.5rem, 8vh, 3.5rem);
    max-width: 46rem;
  }

  .story-hero__code {
    margin: 0 0 0.85rem;
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    text-transform: none;
    opacity: 0.55;
  }

  .story-hero :global(.story-hero__title) {
    margin: 0;
    font-family: var(--font-display);
    font-weight: var(--weight-black);
    font-size: var(--editorial-hero-title);
    line-height: 1.06;
    letter-spacing: -0.02em;
    text-transform: none;
    text-wrap: balance;
  }

  .story-hero__lede {
    margin: 1rem 0 0;
    max-width: 40rem;
    font-size: var(--editorial-body);
    line-height: 1.62;
    color: color-mix(in srgb, var(--color-linen) 76%, transparent);
  }
</style>
