<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  /** @type {string[]} */
  export let images = [];

  /** @type {number} */
  export let intervalMs = 5500;

  /** @type {boolean} */
  export let showArrows = false;

  /** @type {boolean} */
  export let showDots = false;

  /** @type {'dots' | 'progress'} */
  export let dotStyle = 'dots';

  /** @type {boolean} */
  export let autoplay = true;

  /** @type {'default' | 'lightbox'} */
  export let variant = 'default';

  let index = 0;
  /** @type {ReturnType<typeof setInterval> | undefined} */
  let timer;
  let autoplayKey = '';
  let reducedMotion = false;

  function goTo(i) {
    if (!images.length) return;
    index = ((i % images.length) + images.length) % images.length;
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  function startAutoplay() {
    clearInterval(timer);
    if (browser && autoplay && !reducedMotion && images.length > 1 && intervalMs < 600000) {
      timer = setInterval(next, intervalMs);
    }
  }

  function pause() {
    clearInterval(timer);
  }

  function resume() {
    startAutoplay();
  }

  $: if (images.length && index >= images.length) index = 0;

  $: progressPct = images.length ? ((index + 1) / images.length) * 100 : 0;

  $: {
    const nextKey = `${images.join('|')}::${intervalMs}`;
    if (nextKey !== autoplayKey) {
      autoplayKey = nextKey;
      index = 0;
      startAutoplay();
    }
  }

  onMount(() => {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    startAutoplay();
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="carousel"
  class:carousel--progress={showDots && dotStyle === 'progress'}
  class:carousel--lightbox={variant === 'lightbox'}
  on:mouseenter={pause}
  on:mouseleave={resume}
>
  <div class="carousel__slides">
    {#each images as src, i (src)}
      <img
        class="carousel__img"
        class:carousel__img--active={i === index}
        {src}
        alt=""
        loading={i === 0 ? 'eager' : 'lazy'}
        decoding="async"
      />
    {/each}
  </div>

  {#if showArrows && images.length > 1}
    <button
      type="button"
      class="carousel__arrow carousel__arrow--prev"
      aria-label="Precedente"
      on:click|stopPropagation={prev}
    >
      ←
    </button>
    <button
      type="button"
      class="carousel__arrow carousel__arrow--next"
      aria-label="Successiva"
      on:click|stopPropagation={next}
    >
      →
    </button>
  {/if}

  {#if showDots && images.length > 1}
    {#if dotStyle === 'progress'}
      <div class="carousel__progress" aria-hidden="true">
        <div class="carousel__progress-fill" style="width: {progressPct}%"></div>
      </div>
      <p class="carousel__index" aria-live="polite">
        <span class="visually-hidden">Slide </span>
        {String(index + 1).padStart(2, '0')}
        <span class="carousel__index-sep" aria-hidden="true">/</span>
        {String(images.length).padStart(2, '0')}
      </p>
    {:else}
      <div class="carousel__dots">
        {#each images as _, i}
          <button
            type="button"
            class="carousel__dot"
            class:carousel__dot--active={i === index}
            aria-label="Slide {i + 1}"
            aria-current={i === index ? 'true' : undefined}
            on:click|stopPropagation={() => goTo(i)}
          ></button>
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .carousel {
    position: absolute;
    inset: 0;
    isolation: isolate;
  }

  .carousel__slides {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .carousel__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.08);
    transition:
      opacity 1.2s cubic-bezier(0.45, 0, 0.15, 1),
      transform 7s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
    will-change: opacity, transform;
  }

  .carousel__img--active {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
  }

  .carousel--lightbox .carousel__img {
    transform: none;
    transition: opacity 0.35s ease;
  }

  .carousel--lightbox .carousel__img--active {
    transform: none;
  }

  .carousel__arrow {
    position: absolute;
    top: 50%;
    z-index: 5;
    transform: translateY(-50%);
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: rgba(0, 0, 0, 0.35);
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s ease;
    pointer-events: auto;
  }

  .carousel__arrow:hover {
    background: rgba(0, 0, 0, 0.55);
  }

  .carousel__arrow--prev {
    left: 1rem;
  }

  .carousel__arrow--next {
    right: 1rem;
  }

  .carousel__dots {
    position: absolute;
    bottom: clamp(1.25rem, 4vh, 2rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.4rem;
    max-width: min(92vw, 20rem);
    pointer-events: auto;
  }

  .carousel__dot {
    width: 7px;
    height: 7px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.38);
    cursor: pointer;
    transition:
      transform 0.25s var(--ease-ribbit, ease),
      background 0.25s ease;
  }

  .carousel__dot--active {
    background: var(--accent-gold, #fff);
    transform: scale(1.25);
  }

  .carousel__dot:hover {
    background: rgba(255, 255, 255, 0.75);
  }

  .carousel__progress {
    position: absolute;
    bottom: clamp(5.75rem, 15vh, 7.5rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    width: min(9rem, 34vw);
    height: 2px;
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-linen, #f4f3ee) 22%, transparent);
    overflow: hidden;
    pointer-events: none;
  }

  .carousel__progress-fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(
      90deg,
      var(--accent-gold, #c9a227) 0%,
      color-mix(in srgb, var(--sky, #8ec5ff) 70%, var(--accent-gold, #c9a227)) 100%
    );
    transition: width 0.55s var(--ease-ribbit, cubic-bezier(0.34, 1.2, 0.64, 1));
  }

  .carousel__index {
    position: absolute;
    bottom: clamp(5.1rem, 13.5vh, 6.85rem);
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    margin: 0;
    font-size: 0.58rem;
    letter-spacing: 0.28em;
    font-variant-numeric: tabular-nums;
    color: color-mix(in srgb, var(--color-linen, #f4f3ee) 58%, transparent);
    pointer-events: none;
  }

  .carousel__index-sep {
    margin: 0 0.2em;
    opacity: 0.45;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .carousel__img {
      transform: none;
      transition: opacity 0.35s ease;
    }

    .carousel__progress-fill {
      transition: width 0.2s ease;
    }
  }
</style>
