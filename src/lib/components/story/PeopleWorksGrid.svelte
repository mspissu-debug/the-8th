<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import { reveal } from '$lib/reveal';

  /** @type {string} */
  export let sectionCode = '';

  /** @type {string} */
  export let title = '';

  /** @type {string[]} */
  export let images = [];

  let gridIn = false;
</script>

<section class="people-works" aria-labelledby="people-works-title">
  <div class="people-works__inner">
    <header
      class="people-works__head"
      use:reveal={{ variant: 'clip-up', threshold: 0.1, onInView: () => (gridIn = true) }}
    >
      {#if sectionCode}
        <p class="people-works__code">{sectionCode}</p>
      {/if}
      <MotionWords as="h2" id="people-works-title" className="people-works__title" text={title} />
    </header>

    <div class="people-works__grid" role="list">
      {#each images.slice(0, 6) as src, i (src)}
        <div
          class="people-works__cell home-stagger"
          class:in-view={gridIn}
          style="--delay: {0.04 + i * 0.07}s"
          role="listitem"
        >
          <img src={src} alt="" loading="lazy" />
          <span class="people-works__cell-num">{String(i + 1).padStart(2, '0')}</span>
        </div>
      {/each}
    </div>
  </div>
</section>
