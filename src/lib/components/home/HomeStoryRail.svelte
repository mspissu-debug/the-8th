<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import { t } from '$lib/i18n';

  /** @type {{ index: string, image: string, href: string, name: string, project: string }[]} */
  export let items = [];

  /** @type {string} */
  export let title = '';

  /** @type {string} */
  export let ctaLabel = '';

  /** @type {string} */
  export let ctaHref = '/students';

  /** @type {string} */
  export let bg = '#0c0b10';

  /** @type {string} */
  export let sectionId = '';

  /** @type {string} */
  export let sectionCode = '';

  let index = 0;

  $: count = items.length;
  $: current = items[index] ?? items[0];
  $: hasNav = count > 1;

  function goTo(/** @type {number} */ i) {
    if (!count) return;
    index = ((i % count) + count) % count;
  }

  function prev() {
    goTo(index - 1);
  }

  function next() {
    goTo(index + 1);
  }

  /** @param {KeyboardEvent} e */
  function onKeydown(e) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

</script>

<svelte:window on:keydown={onKeydown} />

<section
  id={sectionId || undefined}
  class="story-rail"
  style="--story-bg: {bg}"
  aria-label="Progetti"
  aria-roledescription="carousel"
>
  <header class="story-rail__head">
    {#if sectionCode}
      <p class="story-rail__code">{sectionCode}</p>
    {/if}
    <div class="story-rail__head-main">
      <MotionWords as="h2" className="story-rail__title" text={title} />
      <a class="story-rail__cta" href={ctaHref}>{ctaLabel}</a>
    </div>
  </header>

  {#if current}
    <div class="story-rail__stage">
      <div class="story-rail__slide" aria-live="polite">
        {#key current.index}
          <a class="story-rail__slide-link" href={current.href}>
            <div class="story-rail__visual">
              {#if hasNav}
                <button
                  type="button"
                  class="story-rail__nav story-rail__nav--prev"
                  aria-label={$t('home.carouselPrev')}
                  on:click|preventDefault|stopPropagation={prev}
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
                  class="story-rail__nav story-rail__nav--next"
                  aria-label={$t('home.carouselNext')}
                  on:click|preventDefault|stopPropagation={next}
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
              <img src={current.image} alt="" loading="lazy" decoding="async" />
              <div class="story-rail__visual-veil" aria-hidden="true"></div>
              {#if count > 1}
                <p class="story-rail__counter" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                  <span>/</span>
                  {String(count).padStart(2, '0')}
                </p>
              {/if}
            </div>
            <div class="story-rail__meta">
              <p class="story-rail__label">
                <span class="story-rail__idx">[{current.index}]</span>
                <span class="story-rail__name">{current.name}</span>
                <span class="story-rail__sep" aria-hidden="true">//</span>
                <span class="story-rail__project">{current.project}</span>
              </p>
            </div>
          </a>
        {/key}
      </div>
    </div>
  {/if}
</section>

<style>
  .story-rail {
    position: relative;
    display: flex;
    flex-direction: column;
    background: var(--story-bg);
    color: var(--color-linen);
    padding-bottom: clamp(2.5rem, 6vh, 4rem);
  }

  .story-rail__head {
    flex-shrink: 0;
    padding: calc(4.5rem + var(--editorial-pad)) max(var(--editorial-pad), var(--chapter-index-safe, 3.75rem))
      1.25rem max(var(--editorial-pad), var(--chapter-index-safe, 3.75rem));
  }

  .story-rail__code {
    margin: 0 0 0.5rem;
    font-family: var(--font-body);
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    color: color-mix(in srgb, var(--accent-gold) 75%, var(--color-linen));
  }

  .story-rail__head-main {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 0.75rem 1.25rem;
  }

  .story-rail :global(.story-rail__title) {
    margin: 0;
    max-width: 22ch;
    font-family: var(--font-display);
    font-weight: var(--weight-black);
    font-size: var(--type-section-title);
    letter-spacing: -0.03em;
    text-transform: none;
    line-height: 1.06;
  }

  .story-rail__cta {
    flex-shrink: 0;
    border: 1px solid color-mix(in srgb, var(--color-linen) 28%, transparent);
    border-radius: 999px;
    padding: 0.55rem 1rem;
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    transition: background 0.25s ease, border-color 0.25s ease;
  }

  .story-rail__cta:hover {
    border-color: color-mix(in srgb, var(--color-linen) 50%, transparent);
    background: color-mix(in srgb, var(--color-linen) 8%, transparent);
  }

  .story-rail__stage {
    position: relative;
    flex-shrink: 0;
  }

  .story-rail__slide {
    min-width: 0;
    padding: 0 max(var(--editorial-pad), var(--chapter-index-safe, 3.75rem)) 0;
  }

  .story-rail__slide-link {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: inherit;
    text-decoration: none;
  }

  .story-rail__visual {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 0.65rem;
    overflow: hidden;
    background: #1a1820;
  }

  .story-rail__visual img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    filter: saturate(1.02) contrast(1.03);
  }

  .story-rail__visual-veil {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 55%,
      rgba(6, 6, 10, 0.55) 78%,
      rgba(6, 6, 10, 0.92) 100%
    );
    pointer-events: none;
  }

  .story-rail__meta {
    flex-shrink: 0;
  }

  .story-rail__label {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.35rem 0.5rem;
    font-family: var(--font-body);
    font-size: var(--editorial-body);
    letter-spacing: 0.02em;
    text-transform: none;
    line-height: 1.35;
    color: color-mix(in srgb, var(--color-linen) 90%, transparent);
  }

  .story-rail__idx {
    opacity: 0.55;
    font-size: var(--type-label);
  }

  .story-rail__sep {
    opacity: 0.4;
  }

  /* Frecce stile Apple */
  .story-rail__nav {
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
      background 0.2s ease,
      opacity 0.2s ease;
  }

  .story-rail__nav:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.24);
    transform: translateY(-50%) scale(1.04);
  }

  .story-rail__nav--prev {
    left: 0.85rem;
  }

  .story-rail__nav--next {
    right: 0.85rem;
  }

  .story-rail__counter {
    position: absolute;
    right: 1rem;
    bottom: 0.85rem;
    z-index: 3;
    margin: 0;
    font-family: var(--font-body);
    font-size: var(--type-label);
    letter-spacing: 0.12em;
    color: color-mix(in srgb, var(--color-linen) 72%, transparent);
    pointer-events: none;
  }

  .story-rail__counter span {
    opacity: 0.45;
    margin: 0 0.2em;
  }

  @media (max-width: 719px) {
    .story-rail__nav {
      width: 2.35rem;
      height: 2.35rem;
    }

    .story-rail__nav--prev {
      left: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .story-rail__nav {
      transition: none;
    }
  }
</style>
