<script>
  import { onMount, tick } from 'svelte';
  import { browser } from '$app/environment';
  import { scrollToHomeChapter } from '$lib/utils/scroll-chapter.js';
  import { sectionProgress } from '$lib/utils/scroll-progress.js';
  import { t } from '$lib/i18n';

  /**
   * @typedef {Object} HomeChapter
   * @property {string} id
   * @property {string} code
   * @property {string} title
   * @property {'section' | 'path'} type
   * @property {string} [sectionId]
   * @property {number} [stepIndex]
   */

  /** @type {HomeChapter[]} */
  export let chapters = [];

  /** @type {HTMLElement | null} */
  export let pathSection = null;

  /** @type {number} */
  export let pathScrollVh = 3.4;

  /** @type {number} */
  export let pathStepCount = 8;

  let activeId = '';
  let hiddenNearFooter = false;
  /** @type {(() => void) | undefined} */
  let onScroll;
  /** @type {number | undefined} */
  let rafId;

  $: if (chapters.length && !activeId) activeId = chapters[0].id;

  $: if (browser && activeId) {
    tick().then(() => {
      const btn = document.querySelector('.chapter-index__btn--active');
      btn?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  }

  function navigate(/** @type {HomeChapter} */ chapter) {
    activeId = chapter.id;
    if (chapter.type === 'path' && pathSection != null && chapter.stepIndex != null) {
      scrollToHomeChapter({
        type: 'path',
        pathEl: pathSection,
        stepIndex: chapter.stepIndex,
        stepCount: pathStepCount,
        pathScrollVh
      });
      return;
    }
    if (chapter.sectionId) {
      scrollToHomeChapter({ type: 'section', sectionId: chapter.sectionId });
    }
  }

  function syncActiveFromScroll() {
    if (!browser) return;
    const header =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--site-header-offset')
      ) || 84;
    const trigger = header + window.innerHeight * 0.28;

    if (window.scrollY < 100) {
      activeId = 'intro';
      return;
    }

    if (pathSection) {
      const rect = pathSection.getBoundingClientRect();
      if (rect.top < trigger && rect.bottom > header) {
        const p = sectionProgress(rect, pathScrollVh);
        const idx = Math.min(
          pathStepCount - 1,
          Math.max(0, Math.floor(p * pathStepCount))
        );
        const pathCh = chapters.find((c) => c.type === 'path' && c.stepIndex === idx);
        if (pathCh) {
          activeId = pathCh.id;
          return;
        }
      }
    }

    /** @type {HomeChapter | null} */
    let current = null;
    for (const chapter of chapters) {
      if (chapter.type !== 'section' || !chapter.sectionId) continue;
      const el = document.getElementById(chapter.sectionId);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= trigger) current = chapter;
    }
    if (current) activeId = current.id;
  }

  onMount(() => {
    if (!browser) return;
    syncActiveFromScroll();
    onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(syncActiveFromScroll);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const footer = document.getElementById('home-footer');
    /** @type {IntersectionObserver | undefined} */
    let footerObserver;
    if (footer) {
      footerObserver = new IntersectionObserver(
        ([entry]) => {
          hiddenNearFooter = entry.isIntersecting;
        },
        { threshold: 0, rootMargin: '0px 0px -20% 0px' }
      );
      footerObserver.observe(footer);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (!onScroll) return;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      footerObserver?.disconnect();
    };
  });
</script>

<div class="chapter-index-rail" class:chapter-index-rail--hidden={hiddenNearFooter}>
  <nav class="chapter-index" aria-label={$t('home.chapterIndexAria')}>
    <p class="chapter-index__kicker">{$t('home.chapterIndexKicker')}</p>
    <ol class="chapter-index__list">
      {#each chapters as chapter (chapter.id)}
        <li class="chapter-index__item">
          <button
            type="button"
            class="chapter-index__btn"
            class:chapter-index__btn--active={activeId === chapter.id}
            aria-current={activeId === chapter.id ? 'true' : undefined}
            title={chapter.title}
            on:click={() => navigate(chapter)}
          >
            <span class="chapter-index__code">{chapter.code}</span>
            <span class="chapter-index__title">{chapter.title}</span>
          </button>
        </li>
      {/each}
    </ol>
  </nav>
</div>

<style>
  /* Fascia sottile a sinistra: al passaggio del mouse l’indice si apre */
  .chapter-index-rail {
    --index-width-collapsed: 2.65rem;
    --index-width-expanded: min(11.25rem, 25vw);
    position: fixed;
    left: 0;
    top: calc(var(--site-header-offset, 5.75rem) + 0.35rem);
    bottom: calc(0.5rem + var(--persistent-cta-safe, 0px));
    z-index: 120;
    width: calc(var(--index-width-collapsed) + 0.85rem);
    pointer-events: auto;
    transition:
      opacity 0.28s ease,
      transform 0.28s var(--ease-out);
  }

  .chapter-index-rail--hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateX(-0.75rem);
  }

  .chapter-index-rail:hover,
  .chapter-index-rail:focus-within {
    width: calc(var(--index-width-expanded) + 1.25rem);
  }

  .chapter-index {
    --glass-bg: rgba(14, 14, 20, 0.28);
    --glass-border: rgba(244, 243, 238, 0.12);
    position: absolute;
    left: 0.5rem;
    top: 0;
    bottom: 0;
    width: var(--index-width-collapsed);
    max-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.65rem 0.35rem 0.85rem;
    color: var(--color-linen);
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 0.85rem;
    backdrop-filter: blur(22px) saturate(1.25);
    -webkit-backdrop-filter: blur(22px) saturate(1.25);
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.12);
    pointer-events: auto;
    isolation: isolate;
    overflow: hidden;
    transition:
      width 0.38s cubic-bezier(0.33, 1, 0.68, 1),
      padding 0.38s cubic-bezier(0.33, 1, 0.68, 1),
      background 0.3s ease,
      box-shadow 0.35s ease;
  }

  .chapter-index-rail:hover .chapter-index,
  .chapter-index-rail:focus-within .chapter-index {
    width: var(--index-width-expanded);
    padding: 0.85rem 0.65rem 1rem 0.7rem;
    background: rgba(14, 14, 20, 0.42);
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 719px) {
    .chapter-index-rail {
      --index-width-collapsed: 2.35rem;
      --index-width-expanded: min(10.5rem, 72vw);
      width: calc(var(--index-width-collapsed) + 0.65rem);
      top: calc(var(--site-header-offset, 5.75rem) + 0.25rem);
      bottom: calc(var(--persistent-cta-safe, 5.5rem) + 0.75rem);
      max-height: calc(
        100svh - var(--site-header-offset, 5.75rem) - var(--persistent-cta-safe, 5.5rem) - 8rem
      );
    }

    .chapter-index {
      left: 0.35rem;
      border-radius: 0.65rem;
      max-height: 100%;
    }

    .chapter-index__list {
      max-height: 100%;
    }
  }

  .chapter-index__kicker {
    margin: 0 0 0.5rem;
    padding-left: 0.1rem;
    font-family: var(--font-body);
    font-size: 0.8rem;
    letter-spacing: 0.04em;
    color: color-mix(in srgb, var(--color-linen) 50%, transparent);
    flex-shrink: 0;
    white-space: nowrap;
    opacity: 0;
    max-height: 0;
    overflow: hidden;
    transition:
      opacity 0.28s ease,
      max-height 0.35s ease,
      margin 0.35s ease;
  }

  .chapter-index-rail:hover .chapter-index__kicker,
  .chapter-index-rail:focus-within .chapter-index__kicker {
    opacity: 1;
    max-height: 2rem;
    margin-bottom: 0.65rem;
  }

  .chapter-index__list {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: color-mix(in srgb, var(--accent-gold) 45%, transparent) transparent;
  }

  .chapter-index__item {
    margin: 0;
  }

  .chapter-index__btn {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    align-items: center;
    justify-items: center;
    text-align: center;
    padding: 0.32rem 0.1rem;
    border: none;
    border-radius: 0.4rem;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      grid-template-columns 0.35s ease,
      padding 0.35s ease;
  }

  .chapter-index-rail:hover .chapter-index__btn,
  .chapter-index-rail:focus-within .chapter-index__btn {
    grid-template-columns: 2.35rem 1fr;
    justify-items: stretch;
    text-align: left;
    padding: 0.4rem 0.15rem;
  }

  .chapter-index__btn:hover,
  .chapter-index__btn:focus-visible {
    background: color-mix(in srgb, var(--color-linen) 8%, transparent);
    outline: none;
  }

  .chapter-index__btn--active {
    background: color-mix(in srgb, var(--accent-gold) 18%, rgba(255, 255, 255, 0.06));
  }

  .chapter-index__btn--active .chapter-index__code {
    color: var(--accent-gold);
  }

  .chapter-index__btn--active .chapter-index__title {
    color: var(--color-linen);
  }

  .chapter-index__code {
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: color-mix(in srgb, var(--color-linen) 60%, transparent);
    white-space: nowrap;
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.35);
  }

  .chapter-index-rail:hover .chapter-index__code,
  .chapter-index-rail:focus-within .chapter-index__code {
    font-size: 0.75rem;
    font-weight: 400;
  }

  .chapter-index__title {
    font-family: var(--font-body);
    font-size: clamp(0.88rem, 1.1vw, 0.98rem);
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: color-mix(in srgb, var(--color-linen) 78%, transparent);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
    opacity: 0;
    max-width: 0;
    transition:
      opacity 0.28s ease 0.04s,
      max-width 0.35s ease;
  }

  .chapter-index-rail:hover .chapter-index__title,
  .chapter-index-rail:focus-within .chapter-index__title {
    opacity: 1;
    max-width: 10rem;
  }

  .chapter-index__btn:hover .chapter-index__title,
  .chapter-index__btn:focus-visible .chapter-index__title {
    color: var(--color-linen);
  }

  @media (prefers-reduced-motion: reduce) {
    .chapter-index,
    .chapter-index__kicker,
    .chapter-index__title,
    .chapter-index__btn {
      transition: none;
    }
  }
</style>
