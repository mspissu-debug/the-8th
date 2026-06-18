<script>
  import { onMount } from 'svelte';
  import MotionWords from '$lib/components/MotionWords.svelte';
  import { sectionProgress } from '$lib/utils/scroll-progress.js';

  /** @type {{ id: string, title: string, body: string, image?: string, images?: string[] }[]} */
  export let steps = [];

  /** @type {string} */
  export let bg = '#06060a';

  /** @type {number} */
  export let scrollVh = 4.5;

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
      <div class="story-path__veil"></div>
    </div>

    <div class="story-path__copy">
      <p class="story-path__code">{activeStep?.code ?? '// 05'}</p>
      {#key activeIndex}
        <MotionWords
          as="h2"
          className="story-path__title"
          text={activeStep?.title ?? ''}
          delay={40}
        />
      {/key}
      <p class="story-path__body">{activeStep?.body ?? ''}</p>
    </div>
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
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
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
    position: relative;
    min-height: 0;
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
  }

  .story-path__copy {
    position: relative;
    z-index: 3;
    padding: clamp(1.5rem, 4vh, 2.5rem) var(--editorial-pad) clamp(2rem, 6vh, 3rem);
    max-width: 40rem;
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

  .story-path__body {
    margin: 1rem 0 0;
    max-width: 38rem;
    font-size: var(--editorial-body);
    line-height: 1.62;
    color: color-mix(in srgb, var(--color-linen) 78%, transparent);
  }

  @media (min-width: 900px) {
    .story-path__copy {
      padding-left: calc(var(--editorial-pad) + 2rem);
    }
  }

  @media (max-width: 720px) {
    .story-path__rail {
      top: auto;
      bottom: 42%;
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
  }
</style>
