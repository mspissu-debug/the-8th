<script>
  import { onMount, onDestroy } from 'svelte';

  /** @type {string[]} */
  export let images = [];

  /** @type {string} */
  export let label = '';

  /** @type {string} */
  export let bg = '#06060a';

  /** @type {number} */
  export let intervalMs = 2200;

  /** @type {string} */
  export let sectionId = '';

  /** @type {string} */
  export let sectionCode = '';

  let index = 0;
  /** @type {ReturnType<typeof setInterval> | undefined} */
  let timer;

  function next() {
    if (!images.length) return;
    index = (index + 1) % images.length;
  }

  onMount(() => {
    if (images.length > 1) timer = setInterval(next, intervalMs);
  });

  onDestroy(() => clearInterval(timer));
</script>

<section
  id={sectionId || undefined}
  class="story-film"
  style="--story-bg: {bg}"
  aria-label={label || 'Galleria'}
>
  {#if sectionCode || label}
    <p class="story-film__label">
      {#if sectionCode}<span class="story-film__code">{sectionCode}</span>{/if}
      {#if label}<span class="story-film__label-text">{label}</span>{/if}
    </p>
  {/if}
  <div class="story-film__stage" aria-hidden="true">
    {#each images as src, i}
      <img
        class="story-film__img"
        class:story-film__img--active={i === index}
        src={src}
        alt=""
        loading={i < 2 ? 'eager' : 'lazy'}
      />
    {/each}
    <div class="story-film__veil"></div>
  </div>
  {#if images.length > 1}
    <div class="story-film__index" aria-hidden="true">
      <span>{String(index + 1).padStart(2, '0')}</span>
      <span class="story-film__sep">/</span>
      <span>{String(images.length).padStart(2, '0')}</span>
    </div>
  {/if}
</section>

<style>
  .story-film {
    position: relative;
    background: var(--story-bg);
    padding: 0;
  }

  .story-film__label {
    position: absolute;
    z-index: 3;
    top: 1rem;
    left: var(--editorial-pad);
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 0.75rem;
    align-items: baseline;
    font-family: var(--font-body);
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    text-transform: none;
    color: color-mix(in srgb, var(--color-linen) 55%, transparent);
  }

  .story-film__code {
    color: color-mix(in srgb, var(--accent-gold) 80%, var(--color-linen));
  }

  .story-film__label-text {
    color: color-mix(in srgb, var(--color-linen) 72%, transparent);
  }

  .story-film__stage {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    max-height: 72svh;
    overflow: hidden;
  }

  @media (min-width: 900px) {
    .story-film__stage {
      aspect-ratio: 21 / 9;
    }
  }

  .story-film__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.05);
    transition:
      opacity 1.1s var(--ease-ribbit),
      transform 7s linear;
  }

  .story-film__img--active {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
  }

  .story-film__veil {
    position: absolute;
    inset: 0;
    z-index: 2;
    background: linear-gradient(
      90deg,
      rgba(6, 6, 10, 0.55) 0%,
      transparent 22%,
      transparent 78%,
      rgba(6, 6, 10, 0.55) 100%
    );
    pointer-events: none;
  }

  .story-film__index {
    position: absolute;
    z-index: 3;
    bottom: 1rem;
    right: var(--editorial-pad);
    font-family: 'Space Grotesk', var(--font-body);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    color: color-mix(in srgb, var(--color-linen) 55%, transparent);
  }

  .story-film__sep {
    opacity: 0.4;
    margin: 0 0.2em;
  }

  @media (prefers-reduced-motion: reduce) {
    .story-film__img {
      transform: none;
      transition: opacity 0.35s ease;
    }
  }
</style>
