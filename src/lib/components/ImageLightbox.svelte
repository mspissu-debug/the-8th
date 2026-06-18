<script>
  import { createEventDispatcher } from 'svelte';
  import { browser } from '$app/environment';
  import HeroCarousel from '$lib/components/HeroCarousel.svelte';
  import { portal } from '$lib/actions/portal.js';
  import { t } from '$lib/i18n';

  /** @type {boolean} */
  export let open = false;

  /** @type {string[]} */
  export let images = [];

  /** @type {number} */
  export let index = 0;

  /** @type {string} */
  export let title = '';

  const dispatch = createEventDispatcher();

  function close() {
    dispatch('close');
  }

  function go(delta) {
    if (!images.length) return;
    index = (index + delta + images.length) % images.length;
  }

  /** @param {KeyboardEvent} e */
  function onKeydown(e) {
    if (!open) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  }

  $: if (open && images.length && index >= images.length) index = 0;

  $: if (browser) {
    document.body.style.overflow = open ? 'hidden' : '';
  }
</script>

<svelte:window on:keydown={onKeydown} />

{#if open && images.length}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
  <div
    class="lightbox"
    use:portal
    role="dialog"
    aria-modal="true"
    aria-label={title || 'Galleria immagini'}
    tabindex="-1"
    on:click|self={close}
  >
      <header class="lightbox__head">
        {#if title}
          <p class="lightbox__title">{title}</p>
        {/if}
        <button type="button" class="lightbox__close" aria-label={$t('nav.close')} on:click|stopPropagation={close}>
          <span class="lightbox__close-icon" aria-hidden="true">×</span>
          <span class="lightbox__close-label">{$t('nav.close')}</span>
        </button>
      </header>

      <div class="lightbox__stage" on:click|stopPropagation>
        <HeroCarousel
          {images}
          bind:index
          intervalMs={999999}
          autoplay={false}
          showArrows={images.length > 1}
          showDots={images.length > 1}
          dotStyle="dots"
          variant="lightbox"
        />
      </div>
  </div>
{/if}

<style>
  .lightbox {
    --lightbox-top: calc(var(--site-header-offset, 4.75rem) + env(safe-area-inset-top, 0px) + 0.5rem);

    position: fixed;
    top: var(--lightbox-top);
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 180;
    display: flex;
    flex-direction: column;
    background: rgba(6, 6, 10, 0.97);
    backdrop-filter: blur(14px);
    animation: lightbox-in 0.3s var(--ease-ribbit, ease);
    box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.35);
  }

  @keyframes lightbox-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .lightbox__head {
    position: relative;
    z-index: 4;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 3.5rem;
    padding: 0.85rem clamp(1rem, 4vw, 2rem);
    border-bottom: 1px solid color-mix(in srgb, var(--color-linen, #f4f3ee) 18%, transparent);
    background: rgba(8, 8, 12, 0.92);
  }

  .lightbox__title {
    margin: 0;
    padding-right: 0.5rem;
    font-family: var(--font-body);
    font-size: clamp(0.68rem, 1.4vw, 0.78rem);
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--color-linen, #f4f3ee);
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
  }

  .lightbox__close {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    min-height: 2.75rem;
    padding: 0.35rem 0.85rem 0.35rem 0.65rem;
    border: 1px solid color-mix(in srgb, var(--accent-gold, #c9a227) 55%, var(--color-linen, #f4f3ee));
    border-radius: 999px;
    background: rgba(0, 0, 0, 0.65);
    color: var(--color-linen, #f4f3ee);
    font-family: var(--font-body);
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1;
    cursor: pointer;
    pointer-events: auto;
    transition:
      background 0.2s ease,
      border-color 0.2s ease,
      transform 0.2s ease;
  }

  .lightbox__close-icon {
    font-size: 1.35rem;
    line-height: 1;
  }

  .lightbox__close-label {
    display: none;
  }

  .lightbox__close:hover,
  .lightbox__close:focus-visible {
    background: rgba(0, 0, 0, 0.85);
    border-color: var(--accent-gold, #c9a227);
    transform: translateY(-1px);
    outline: none;
  }

  @media (min-width: 520px) {
    .lightbox__close-label {
      display: inline;
    }
  }

  .lightbox__stage {
    position: relative;
    flex: 1;
    min-height: 0;
    margin: clamp(0.5rem, 2vh, 1.25rem) clamp(0.75rem, 3vw, 2rem) clamp(1.25rem, 4vh, 2rem);
  }

  .lightbox__stage :global(.carousel) {
    position: absolute;
    inset: 0;
  }

  .lightbox__stage :global(.carousel--lightbox .carousel__img) {
    object-fit: contain;
    pointer-events: none;
  }

  .lightbox__stage :global(.carousel--lightbox .carousel__arrow) {
    width: 3.25rem;
    height: 3.25rem;
    font-size: 1.1rem;
    z-index: 5;
    pointer-events: auto;
    background: rgba(0, 0, 0, 0.55);
    border-color: color-mix(in srgb, var(--color-linen, #f4f3ee) 45%, transparent);
  }

  .lightbox__stage :global(.carousel--lightbox .carousel__dots) {
    bottom: clamp(0.75rem, 3vh, 1.5rem);
    pointer-events: auto;
  }
</style>
