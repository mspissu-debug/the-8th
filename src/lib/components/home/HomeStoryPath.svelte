<script>
  import { onMount } from 'svelte';
  import MotionWords from '$lib/components/MotionWords.svelte';
  import { sectionProgress } from '$lib/utils/scroll-progress.js';

  /** @type {{ id: string, title: string, body: string, image?: string, images?: string[], layout?: string }[]} */
  export let steps = [];

  /** @type {string} */
  export let bg = '#06060a';

  /** @type {number} */
  export let scrollVh = 2.2;

  /** @type {string} */
  export let sectionId = 'home-path';

  /** @type {HTMLElement | null} */
  export let sectionEl = null;

  let progress = 0;

  $: stepCount = steps.length;
  $: segment = stepCount > 0 ? 1 / stepCount : 1;
  $: activeIndex = Math.min(stepCount - 1, Math.max(0, Math.floor(progress / segment)));
  $: activeStep = steps[activeIndex] ?? steps[0];
  $: heroImage = activeStep?.image ?? activeStep?.images?.[0] ?? '';
  $: copyLayout = activeStep?.layout ?? 'bottom-left';

  onMount(() => {
    const onScroll = () => {
      if (!sectionEl) return;
      progress = sectionProgress(sectionEl.getBoundingClientRect(), scrollVh);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });
</script>

<section
  id={sectionId}
  class="story-path"
  bind:this={sectionEl}
  style="--story-bg: {bg}; --story-scroll: {scrollVh}"
  aria-label="Percorso THE 8th"
>
  <div class="story-path__sticky">
    <div class="story-path__rail" aria-hidden="true">
      {#each steps as step, i}
        <span
          class="story-path__tick"
          class:story-path__tick--on={i <= activeIndex}
          style="--tick-i: {i}"
        ></span>
      {/each}
    </div>

    <div class="story-path__media" aria-hidden="true">
      {#key activeIndex}
        {#if heroImage}
          <img class="story-path__img" src={heroImage} alt="" loading="lazy" decoding="async" />
        {/if}
      {/key}
      <div class="story-path__veil" class:story-path__veil--center={copyLayout === 'center'}></div>
    </div>

    {#key activeIndex}
      <div class="story-path__copy story-path__copy--{copyLayout}">
        <p class="story-path__code">{activeStep?.code ?? '// 05'}</p>
        <MotionWords
          as="h2"
          className="story-path__title"
          text={activeStep?.title ?? ''}
          delay={40}
        />
        <p class="story-path__body">{activeStep?.body ?? ''}</p>
      </div>
    {/key}
  </div>
</section>

<style>
  .story-path {
    position: relative;
    height: calc(var(--story-scroll) * 100svh);
    background: var(--story-bg);
    color: var(--color-linen);
  }

  .story-path__sticky {
    position: sticky;
    top: 0;
    height: 100svh;
    overflow: hidden;
  }

  .story-path__rail {
    position: absolute;
    z-index: 4;
    left: var(--editorial-pad);
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .story-path__tick {
    width: 1px;
    height: 1.4rem;
    background: color-mix(in srgb, var(--color-linen) 18%, transparent);
    transition: background 0.5s var(--ease-ribbit), height 0.5s var(--ease-ribbit);
  }

  .story-path__tick--on {
    height: 2rem;
    background: color-mix(in srgb, var(--accent-gold) 85%, transparent);
  }

  .story-path__media {
    position: absolute;
    inset: 0;
  }

  .story-path__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transition: opacity 0.45s var(--ease-ribbit-out);
  }

  .story-path__veil {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(6, 6, 10, 0.2) 0%,
      rgba(6, 6, 10, 0.35) 45%,
      rgba(6, 6, 10, 0.92) 100%
    );
    transition: background 0.55s var(--ease-ribbit);
  }

  .story-path__veil--center {
    background:
      radial-gradient(
        ellipse 70% 55% at 50% 50%,
        rgba(6, 6, 10, 0.55) 0%,
        rgba(6, 6, 10, 0.82) 100%
      ),
      linear-gradient(180deg, rgba(6, 6, 10, 0.35) 0%, rgba(6, 6, 10, 0.65) 100%);
  }

  .story-path__copy {
    position: absolute;
    z-index: 3;
    padding: clamp(1.25rem, 3.5vh, 2rem) max(var(--editorial-pad), var(--chapter-index-safe, 3.75rem));
    max-width: min(38rem, 90vw);
    transition:
      opacity 0.45s var(--ease-ribbit),
      transform 0.55s var(--ease-ribbit);
  }

  .story-path__copy--bottom-left {
    left: 0;
    bottom: 0;
    text-align: left;
  }

  .story-path__copy--bottom-right {
    right: 0;
    bottom: 0;
    text-align: right;
  }

  .story-path__copy--top-right {
    right: 0;
    top: calc(var(--site-header-offset, 5.75rem) + 0.75rem);
    text-align: right;
    max-width: min(34rem, 82vw);
  }

  .story-path__copy--top-left {
    left: 0;
    top: calc(var(--site-header-offset, 5.75rem) + 0.75rem);
    text-align: left;
    max-width: min(34rem, 82vw);
  }

  .story-path__copy--center {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    max-width: min(36rem, 88vw);
  }

  .story-path__code {
    margin: 0 0 0.75rem;
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    text-transform: none;
    opacity: 0.55;
  }

  .story-path :global(.story-path__title) {
    margin: 0;
    font-family: var(--font-display);
    font-weight: var(--weight-black);
    font-size: var(--type-section-title);
    line-height: 1.08;
    letter-spacing: -0.02em;
    text-transform: none;
    text-wrap: balance;
  }

  .story-path :global(.story-path__title .motion-words__word) {
    overflow: visible;
    padding-bottom: 0.05em;
  }

  .story-path__body {
    margin: 1rem 0 0;
    max-width: 38rem;
    font-size: var(--editorial-body);
    line-height: 1.62;
    color: color-mix(in srgb, var(--color-linen) 78%, transparent);
  }

  .story-path__copy--center .story-path__body,
  .story-path__copy--top-right .story-path__body,
  .story-path__copy--bottom-right .story-path__body {
    margin-left: auto;
    margin-right: auto;
  }

  .story-path__copy--top-right .story-path__body,
  .story-path__copy--bottom-right .story-path__body {
    margin-left: auto;
  }

  @media (max-width: 720px) {
    .story-path__rail {
      top: auto;
      bottom: 38%;
      transform: none;
      flex-direction: row;
      left: var(--editorial-pad);
      right: var(--editorial-pad);
      justify-content: center;
    }

    .story-path__tick {
      width: 1.4rem;
      height: 1px;
    }

    .story-path__tick--on {
      width: 2rem;
      height: 1px;
    }

    .story-path__copy--top-right,
    .story-path__copy--top-left {
      top: calc(var(--site-header-offset, 5.75rem) + 0.35rem);
      max-width: 92vw;
    }

    .story-path__copy--bottom-right {
      text-align: left;
      left: 0;
      right: auto;
    }

    .story-path__copy--center {
      top: auto;
      bottom: 28%;
      left: var(--editorial-pad);
      right: var(--editorial-pad);
      transform: none;
      text-align: left;
    }
  }
</style>
