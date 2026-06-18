<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';

  /** @type {string} */
  export let code = '';

  /** @type {string} */
  export let title = '';

  /** @type {string} */
  export let body = '';

  /** @type {string} */
  export let bg = '#06060a';

  /** @type {'dark' | 'light'} */
  export let tone = 'dark';

  /** @type {number} */
  export let minVh = 1;

  /** @type {string} */
  export let sectionId = '';
</script>

<section
  id={sectionId || undefined}
  class="story-statement story-statement--{tone}"
  style="--story-bg: {bg}; min-height: {minVh}svh"
>
  <div class="story-statement__inner">
    {#if code}
      <p class="story-statement__code">{code}</p>
    {/if}
    <MotionWords as="h2" className="story-statement__title" text={title} delay={40} />
    {#if body}
      <MotionBlock delay={220}>
        <p class="story-statement__body">{body}</p>
      </MotionBlock>
    {/if}
    <slot />
  </div>
</section>

<style>
  .story-statement {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(5rem, 14vh, 8rem) var(--editorial-pad);
    background: var(--story-bg);
  }

  .story-statement--dark {
    color: var(--color-linen);
  }

  .story-statement--light {
    color: var(--color-amethyst);
  }

  .story-statement__inner {
    width: min(46rem, 100%);
    text-align: center;
  }

  .story-statement__code {
    margin: 0 0 1.25rem;
    font-family: var(--font-body);
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    text-transform: none;
    opacity: 0.55;
  }

  .story-statement :global(.story-statement__title) {
    margin: 0;
    font-family: var(--font-display);
    font-weight: var(--weight-black);
    font-size: var(--type-section-title);
    line-height: 1.08;
    letter-spacing: -0.02em;
    text-transform: none;
    text-wrap: balance;
  }

  .story-statement__body {
    margin: 1.35rem auto 0;
    max-width: 40rem;
    font-size: var(--editorial-body);
    line-height: 1.62;
    opacity: 0.78;
  }

  .story-statement--light .story-statement__body {
    opacity: 0.72;
  }
</style>
