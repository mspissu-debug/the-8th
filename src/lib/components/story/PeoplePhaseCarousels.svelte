<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import ImageLightbox from '$lib/components/ImageLightbox.svelte';
  import { reveal } from '$lib/reveal';
  import { t } from '$lib/i18n';

  /**
   * @typedef {{ id: string, labelKey: string, images: string[] }} Phase
   */

  /** @type {string} */
  export let sectionCode = '';

  /** @type {string} */
  export let title = '';

  /** @type {Phase[]} */
  export let phases = [];

  let headIn = false;
  let phaseIndex = 0;
  let imageIndex = 0;
  let lightboxOpen = false;
  /** @type {string[]} */
  let lightboxImages = [];
  let lightboxIndex = 0;
  /** @type {string} */
  let lightboxTitle = '';

  $: activePhases = phases.filter((p) => p.images.length > 0);
  $: if (phaseIndex >= activePhases.length) phaseIndex = 0;
  $: currentPhase = activePhases[phaseIndex];
  $: images = currentPhase?.images ?? [];
  $: if (imageIndex >= images.length) imageIndex = 0;
  $: currentSrc = images[imageIndex] ?? '';
  $: imageCount = images.length;
  $: hasImageNav = imageCount > 1;
  $: hasPhaseNav = activePhases.length > 1;
  $: totalSlides = activePhases.reduce((n, p) => n + p.images.length, 0);
  $: slideNumber =
    activePhases.slice(0, phaseIndex).reduce((n, p) => n + p.images.length, 0) + imageIndex + 1;

  /** @param {number} i */
  function selectPhase(i) {
    if (!activePhases.length) return;
    phaseIndex = Math.min(Math.max(0, i), activePhases.length - 1);
    imageIndex = 0;
  }

  /** @param {number} delta */
  function goImage(delta) {
    if (!imageCount) return;
    const next = imageIndex + delta;
    if (next >= 0 && next < imageCount) {
      imageIndex = next;
      return;
    }
    if (delta < 0 && phaseIndex > 0) {
      phaseIndex -= 1;
      imageIndex = activePhases[phaseIndex].images.length - 1;
      return;
    }
    if (delta > 0 && phaseIndex < activePhases.length - 1) {
      phaseIndex += 1;
      imageIndex = 0;
    }
  }

  function prev() {
    goImage(-1);
  }

  function next() {
    goImage(1);
  }

  /** @param {KeyboardEvent} e */
  function onKeydown(e) {
    if (lightboxOpen) return;
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  function openLightbox() {
    if (!currentPhase?.images.length) return;
    lightboxImages = currentPhase.images;
    lightboxIndex = imageIndex;
    lightboxTitle = $t(currentPhase.labelKey);
    lightboxOpen = true;
  }

  function closeLightbox() {
    imageIndex = lightboxIndex;
    lightboxOpen = false;
  }

  $: if (currentPhase && lightboxOpen) {
    lightboxImages = currentPhase.images;
    lightboxTitle = $t(currentPhase.labelKey);
  }
</script>

<svelte:window on:keydown={onKeydown} />

<section class="people-phases" aria-labelledby="people-phases-title">
  <div class="people-phases__inner">
    <header
      class="people-phases__head"
      use:reveal={{ variant: 'clip-up', threshold: 0.1, onInView: () => (headIn = true) }}
    >
      {#if sectionCode}
        <p class="people-phases__code">{sectionCode}</p>
      {/if}
      <MotionWords as="h2" id="people-phases-title" className="people-phases__title" text={title} />
    </header>

    {#if activePhases.length}
      <div
        class="people-phases__stage home-stagger"
        class:in-view={headIn}
        aria-roledescription="carousel"
        aria-label={title}
      >
        <nav class="people-phases__tabs" aria-label={$t('people.worksTitle')}>
          {#each activePhases as phase, i (phase.id)}
            <button
              type="button"
              class="people-phases__tab"
              class:people-phases__tab--active={i === phaseIndex}
              aria-current={i === phaseIndex ? 'true' : undefined}
              on:click={() => selectPhase(i)}
            >
              <span class="people-phases__tab-idx">{phase.id}</span>
              <span class="people-phases__tab-label">{$t(phase.labelKey)}</span>
            </button>
          {/each}
        </nav>

        <div class="people-phases__viewer">
          {#if hasImageNav || hasPhaseNav}
            <button
              type="button"
              class="people-phases__nav people-phases__nav--prev"
              aria-label={$t('people.carouselPrev')}
              on:click={prev}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M14.5 5.5L8 12l6.5 6.5"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              class="people-phases__nav people-phases__nav--next"
              aria-label={$t('people.carouselNext')}
              on:click={next}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M9.5 5.5L16 12l-6.5 6.5"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          {/if}

          {#if currentSrc}
            {#key `${phaseIndex}-${imageIndex}`}
              <button
                type="button"
                class="people-phases__visual"
                aria-label="{$t('people.expandPhase')} · {$t(currentPhase.labelKey)}"
                on:click={openLightbox}
              >
                <img src={currentSrc} alt="" loading="lazy" decoding="async" />
                <span class="people-phases__hint">{$t('people.expandPhase')}</span>
              </button>
            {/key}
          {/if}

          {#if totalSlides > 1}
            <p class="people-phases__counter" aria-hidden="true">
              {String(slideNumber).padStart(2, '0')}
              <span>/</span>
              {String(totalSlides).padStart(2, '0')}
            </p>
          {/if}
        </div>

        <p class="people-phases__caption" aria-live="polite">
          <span class="people-phases__caption-idx">{currentPhase?.id}</span>
          {$t(currentPhase?.labelKey ?? '')}
          {#if imageCount > 1}
            <span class="people-phases__caption-sub">
              · {String(imageIndex + 1).padStart(2, '0')} / {String(imageCount).padStart(2, '0')}
            </span>
          {/if}
        </p>
      </div>
    {:else}
      <p class="people-phases__empty-all">{$t('people.phaseEmpty')}</p>
    {/if}
  </div>
</section>

<ImageLightbox
  open={lightboxOpen}
  images={lightboxImages}
  bind:index={lightboxIndex}
  title={lightboxTitle}
  on:close={closeLightbox}
/>

<style>
  .people-phases {
    padding: clamp(2.5rem, 8vh, 4rem) var(--editorial-pad);
    border-top: 1px solid var(--story-border);
  }

  .people-phases__inner {
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .people-phases__head {
    margin-bottom: clamp(1.25rem, 3vh, 2rem);
  }

  .people-phases__code {
    margin: 0 0 0.5rem;
    font-family: var(--font-body);
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--accent-gold) 80%, var(--story-text));
  }

  .people-phases :global(.people-phases__title) {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 3.5vw, 2.1rem);
    font-weight: var(--weight-black, 700);
    letter-spacing: 0.03em;
    text-transform: uppercase;
    line-height: 1.05;
    color: var(--story-text);
  }

  .people-phases__stage {
    opacity: 0;
    transform: translateY(14px);
    transition:
      opacity 0.65s var(--ease-ribbit),
      transform 0.65s var(--ease-ribbit);
  }

  .people-phases__stage.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .people-phases__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.5rem;
    margin-bottom: 1rem;
  }

  .people-phases__tab {
    display: inline-flex;
    align-items: baseline;
    gap: 0.35rem;
    padding: 0.35rem 0.65rem;
    border: 1px solid var(--story-border);
    border-radius: 999px;
    background: transparent;
    color: var(--story-text-muted);
    font-family: var(--font-body);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      color 0.2s ease,
      background 0.2s ease;
  }

  .people-phases__tab:hover,
  .people-phases__tab:focus-visible {
    border-color: color-mix(in srgb, var(--accent-gold) 45%, var(--story-border));
    color: var(--story-text);
  }

  .people-phases__tab--active {
    border-color: color-mix(in srgb, var(--accent-gold) 65%, var(--story-border));
    background: color-mix(in srgb, var(--accent-gold) 10%, transparent);
    color: var(--story-text);
  }

  .people-phases__tab-idx {
    font-family: var(--font-display);
    font-size: 0.82rem;
    font-weight: 700;
    color: color-mix(in srgb, var(--accent-gold) 85%, var(--story-text));
  }

  .people-phases__viewer {
    position: relative;
    width: 100%;
  }

  .people-phases__visual {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    border: 1px solid var(--story-border);
    border-radius: 0.65rem;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: var(--story-surface);
    cursor: zoom-in;
    text-align: left;
  }

  .people-phases__visual img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    transition: transform 0.55s var(--ease-ribbit);
  }

  .people-phases__visual:hover img,
  .people-phases__visual:focus-visible img {
    transform: scale(1.03);
  }

  .people-phases__visual::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      color-mix(in srgb, var(--story-bg) 65%, transparent) 0%,
      transparent 45%
    );
    pointer-events: none;
  }

  .people-phases__hint {
    position: absolute;
    left: 0.75rem;
    bottom: 0.65rem;
    z-index: 1;
    font-family: var(--font-body);
    font-size: 0.52rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--story-text) 88%, transparent);
    pointer-events: none;
  }

  .people-phases__visual:focus-visible {
    outline: 2px solid var(--accent-gold, #c9a227);
    outline-offset: 3px;
  }

  .people-phases__nav {
    position: absolute;
    top: 50%;
    z-index: 4;
    transform: translateY(-50%);
    width: 2.75rem;
    height: 2.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.14);
    color: #fff;
    backdrop-filter: blur(16px) saturate(1.4);
    -webkit-backdrop-filter: blur(16px) saturate(1.4);
    box-shadow:
      0 2px 12px rgba(0, 0, 0, 0.18),
      inset 0 0 0 1px rgba(255, 255, 255, 0.22);
    cursor: pointer;
    transition:
      transform 0.25s var(--ease-ribbit, ease),
      background 0.2s ease;
  }

  .people-phases__nav:hover {
    background: rgba(255, 255, 255, 0.24);
    transform: translateY(-50%) scale(1.04);
  }

  .people-phases__nav--prev {
    left: 0.85rem;
  }

  .people-phases__nav--next {
    right: 0.85rem;
  }

  .people-phases__counter {
    position: absolute;
    right: 1rem;
    bottom: 0.85rem;
    z-index: 3;
    margin: 0;
    font-family: var(--font-body);
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    color: color-mix(in srgb, var(--story-text) 72%, transparent);
    pointer-events: none;
  }

  .people-phases__counter span {
    opacity: 0.45;
    margin: 0 0.2em;
  }

  .people-phases__caption {
    margin: 0.85rem 0 0;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.35rem 0.5rem;
    font-family: var(--font-body);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--story-text-muted);
  }

  .people-phases__caption-idx {
    font-family: var(--font-display);
    font-size: 0.95rem;
    font-weight: 700;
    color: color-mix(in srgb, var(--accent-gold) 85%, var(--story-text));
  }

  .people-phases__caption-sub {
    opacity: 0.7;
  }

  .people-phases__empty-all {
    margin: 0;
    padding: 2rem;
    text-align: center;
    font-family: var(--font-body);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--story-text-muted);
    border: 1px dashed var(--story-border);
    border-radius: 0.65rem;
  }

  @media (max-width: 719px) {
    .people-phases__nav {
      width: 2.35rem;
      height: 2.35rem;
    }

    .people-phases__nav--prev {
      left: 0.5rem;
    }

    .people-phases__nav--next {
      right: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .people-phases__stage,
    .people-phases__nav,
    .people-phases__visual img {
      transition: none;
    }
  }
</style>
