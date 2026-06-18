<script>
  import { onMount, onDestroy } from 'svelte';

  /** @type {string[]} */
  export let images = [];

  /** @type {number} */
  export let intervalMs = 5000;

  /** @type {'slow' | 'medium'} */
  export let speed = 'medium';

  /** Ken-burns zoom — disabilitare in sezioni pesanti (es. vetrina) */
  export let kenBurns = true;

  /** @type {number} */
  export let index = 0;

  /** @type {ReturnType<typeof setInterval> | undefined} */
  let timer;
  let autoplayKey = '';

  function next() {
    if (!images.length) return;
    index = (index + 1) % images.length;
  }

  $: if (images.length && index >= images.length) index = 0;

  function startAutoplay() {
    clearInterval(timer);
    if (images.length > 1) timer = setInterval(next, intervalMs);
  }

  $: {
    const nextKey = `${images.join('|')}::${intervalMs}`;
    if (nextKey !== autoplayKey) {
      autoplayKey = nextKey;
      index = 0;
      startAutoplay();
    }
  }

  onMount(() => startAutoplay());

  onDestroy(() => clearInterval(timer));
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="img-carousel img-carousel--{speed}"
  class:img-carousel--placeholder={!images.length}
  class:img-carousel--lite={!kenBurns}
  on:mouseenter={() => clearInterval(timer)}
  on:mouseleave={startAutoplay}
>
  <div class="img-carousel__track">
    {#if images.length}
      {#each images as src, i}
        <img
          class="img-carousel__slide"
          class:img-carousel__slide--active={i === index}
          class:img-carousel__slide--ph={src.includes('/placeholders/')}
          src={src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      {/each}
    {:else}
      <div class="img-carousel__empty" aria-hidden="true"></div>
    {/if}
  </div>
</div>

<style>
  .img-carousel {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-xl);
  }

  .img-carousel__track {
    position: relative;
    width: 100%;
    height: min(100svh, 900px);
    min-height: min(100svh, 900px);
    aspect-ratio: unset;
  }

  .img-carousel__slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.1);
    transition:
      opacity 1.35s cubic-bezier(0.45, 0, 0.15, 1),
      transform 7.5s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity;
  }

  .img-carousel--lite .img-carousel__slide {
    transform: none;
    transition: opacity 0.65s ease;
    will-change: auto;
  }

  .img-carousel__slide--active {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
  }

  .img-carousel--lite .img-carousel__slide--active {
    transform: none;
  }

  .img-carousel__slide--ph {
    object-fit: contain;
    padding: 12%;
    background: rgba(0, 0, 0, 0.35);
  }

  .img-carousel__empty,
  .img-carousel--placeholder .img-carousel__track {
    background: repeating-linear-gradient(
      -12deg,
      rgba(255, 255, 255, 0.04),
      rgba(255, 255, 255, 0.04) 12px,
      rgba(255, 255, 255, 0.08) 12px,
      rgba(255, 255, 255, 0.08) 24px
    );
  }

  .img-carousel__empty {
    position: absolute;
    inset: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .img-carousel__slide {
      transform: none;
      transition: opacity 0.4s ease;
    }
  }
</style>
