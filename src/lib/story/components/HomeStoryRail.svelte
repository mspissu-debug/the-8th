<script>
  import { onMount } from 'svelte';
  import MotionWords from '$lib/components/MotionWords.svelte';
  import { sectionProgress } from '$lib/utils/scroll-progress.js';

  /** @type {{ index: string, image: string, href: string, name: string, project: string }[]} */
  export let items = [];

  /** @type {string} */
  export let title = '';

  /** @type {string} */
  export let ctaLabel = '';

  /** @type {string} */
  export let ctaHref = '/talenti';

  /** @type {string} */
  export let bg = '#0c0b10';

  let root;
  let track;
  let progress = 0;
  let offsetPx = 0;

  const scrollVh = 3.2;

  $: if (track && progress >= 0) {
    const max = Math.max(0, track.scrollWidth - window.innerWidth + 80);
    offsetPx = progress * max;
  }

  onMount(() => {
    const onScroll = () => {
      if (!root) return;
      progress = sectionProgress(root.getBoundingClientRect(), scrollVh);
    };
    const onResize = () => onScroll();
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  });
</script>

<section
  class="story-rail"
  bind:this={root}
  style="--story-bg: {bg}; --story-scroll: {scrollVh}"
  aria-label="Progetti"
>
  <div class="story-rail__sticky">
    <header class="story-rail__head">
      <MotionWords as="h2" className="story-rail__title" text={title} />
      <a class="story-rail__cta" href={ctaHref}>{ctaLabel}</a>
    </header>
    <div
      class="story-rail__track-wrap"
      style="--rail-offset: {-offsetPx}px"
    >
      <div class="story-rail__track" bind:this={track}>
        {#each items as item}
          <a class="story-rail__card" href={item.href}>
            <div class="story-rail__frame">
              <img src={item.image} alt="" loading="lazy" />
            </div>
            <p class="story-rail__label">
              <span>[{item.index}]</span> {item.name}
              <span class="story-rail__sep">//</span> {item.project}
            </p>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .story-rail {
    position: relative;
    height: calc(var(--story-scroll) * 100svh);
    background: var(--story-bg);
    color: var(--color-linen);
  }

  .story-rail__sticky {
    position: sticky;
    top: 0;
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    padding: calc(4.5rem + var(--editorial-pad)) 0 clamp(2rem, 5vh, 3rem);
    overflow: hidden;
  }

  .story-rail__head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    padding: 0 var(--editorial-pad);
  }

  .story-rail :global(.story-rail__title) {
    margin: 0;
    max-width: 16ch;
    font-family: var(--font-display);
    font-weight: var(--weight-black);
    font-size: clamp(1.1rem, 2.8vw, 1.85rem);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1.05;
  }

  .story-rail__cta {
    flex-shrink: 0;
    border: 1px solid color-mix(in srgb, var(--color-linen) 28%, transparent);
    border-radius: 999px;
    padding: 0.5rem 0.9rem;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: background 0.25s ease, border-color 0.25s ease;
  }

  .story-rail__cta:hover {
    border-color: color-mix(in srgb, var(--color-linen) 50%, transparent);
    background: color-mix(in srgb, var(--color-linen) 8%, transparent);
  }

  .story-rail__track-wrap {
    overflow: visible;
  }

  .story-rail__track {
    display: flex;
    gap: clamp(0.85rem, 2vw, 1.25rem);
    padding: 0 var(--editorial-pad);
    transform: translate3d(var(--rail-offset), 0, 0);
    will-change: transform;
  }

  .story-rail__card {
    flex: 0 0 clamp(16rem, 28vw, 22rem);
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    transition: transform 0.35s var(--ease-ribbit);
  }

  .story-rail__card:hover {
    transform: translateY(-4px);
  }

  .story-rail__frame {
    aspect-ratio: 3 / 4;
    border-radius: 0.35rem;
    overflow: hidden;
    background: #1a1820;
  }

  .story-rail__frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(1.02) contrast(1.03);
  }

  .story-rail__label {
    margin: 0;
    font-family: 'Space Grotesk', var(--font-body);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    line-height: 1.4;
    color: color-mix(in srgb, var(--color-linen) 88%, transparent);
  }

  .story-rail__label span:first-child {
    opacity: 0.5;
  }

  .story-rail__sep {
    opacity: 0.35;
    margin: 0 0.15em;
  }

  @media (prefers-reduced-motion: reduce) {
    .story-rail__track {
      transform: none;
      flex-wrap: wrap;
      overflow-x: auto;
    }

    .story-rail {
      height: auto;
    }

    .story-rail__sticky {
      position: relative;
      height: auto;
    }
  }
</style>
