<script>
  import { onMount, onDestroy } from 'svelte';

  /** @type {(string | { src: string, hover?: string })[]} */
  export let images = [];

  /** @type {string} */
  export let label = '';

  /** @type {number} */
  export let intervalMs = 4800;

  /** @type {'tall' | 'wide'} */
  export let aspect = 'tall';

  /** @type {boolean} */
  export let hoverReveal = false;

  let index = 0;
  let hovering = false;
  let spotX = 50;
  let spotY = 50;
  /** @type {ReturnType<typeof setInterval> | undefined} */
  let timer;

  $: slides = images.map((img) =>
    typeof img === 'string' ? { src: img, hover: undefined } : img
  );
  $: hasHover = hoverReveal && slides.some((s) => s.hover);

  function next() {
    if (!slides.length) return;
    index = (index + 1) % slides.length;
  }

  /** @param {MouseEvent} event */
  function updateSpot(event) {
    const rect = /** @type {HTMLElement} */ (event.currentTarget).getBoundingClientRect();
    spotX = Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100));
    spotY = Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100));
  }

  function resetSpot() {
    spotX = 50;
    spotY = 50;
  }

  onMount(() => {
    if (slides.length > 1) timer = setInterval(next, intervalMs);
  });

  onDestroy(() => clearInterval(timer));
</script>

<div
  class="film film--{aspect}"
  class:film--empty={!slides.length}
  class:film--hover={hasHover}
>
  {#if label}
    <p class="film__label t-label">
      {label}
    </p>
  {/if}

  {#if slides.length}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="film__stage"
      class:film__stage--hovering={hovering && hasHover}
      style="--spot-x:{spotX}%; --spot-y:{spotY}%;"
      on:mouseenter={() => (hovering = true)}
      on:mousemove={updateSpot}
      on:mouseleave={() => {
        hovering = false;
        resetSpot();
      }}
    >
      {#each slides as slide, i}
        <img
          class="film__img"
          class:film__img--active={i === index}
          src={slide.src}
          alt=""
          loading={i === 0 ? 'eager' : 'lazy'}
        />
        {#if slide.hover}
          <img
            class="film__img film__img--glow"
            class:film__img--active={i === index}
            class:film__img--glow-on={i === index && hovering}
            src={slide.hover}
            alt=""
            loading="lazy"
          />
        {/if}
      {/each}
    </div>
  {:else}
    <div class="film__placeholder" aria-hidden="true"></div>
  {/if}
</div>

<style>
  .film {
    width: 100%;
  }

  .film__label {
    margin: 0 0 0.75rem;
    font-size: var(--editorial-eyebrow);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-subtle);
  }

  .film__hint {
    color: var(--sign-cta);
    font-style: italic;
    text-transform: none;
    letter-spacing: 0;
  }

  .film__stage {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--radius-md);
    background: rgba(0, 0, 0, 0.06);
  }

  .film--hover .film__stage {
    cursor: crosshair;
  }
  .film__stage::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s var(--ease-out);
    background: radial-gradient(
      circle at var(--spot-x, 50%) var(--spot-y, 50%),
      rgba(130, 255, 228, 0.26) 0%,
      rgba(106, 154, 255, 0.2) 18%,
      rgba(8, 9, 16, 0) 48%
    );
    mix-blend-mode: screen;
    z-index: 3;
  }
  .film__stage--hovering::after {
    opacity: 1;
  }

  .film--tall .film__stage,
  .film--wide .film__stage {
    aspect-ratio: unset;
    width: 100%;
    height: min(100svh, 900px);
    min-height: min(100svh, 900px);
  }

  .film__img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transform: scale(1.08);
    transition:
      opacity 1.1s cubic-bezier(0.45, 0, 0.15, 1),
      transform 7s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .film__img--active {
    opacity: 1;
    transform: scale(1);
    z-index: 1;
  }

  .film__img--glow {
    z-index: 2;
    opacity: 0;
    transform: scale(1.02);
    filter: brightness(1.08) saturate(1.12);
    -webkit-mask-image: radial-gradient(
      circle 24% at var(--spot-x, 50%) var(--spot-y, 50%),
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.95) 55%,
      transparent 100%
    );
    mask-image: radial-gradient(
      circle 24% at var(--spot-x, 50%) var(--spot-y, 50%),
      rgba(0, 0, 0, 0.95) 0%,
      rgba(0, 0, 0, 0.95) 55%,
      transparent 100%
    );
    transition:
      opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
  }

  .film__img--glow.film__img--glow-on {
    opacity: 1;
    transform: scale(1);
  }

  .film--hover .film__img--active:not(.film__img--glow) {
    transition:
      opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
      filter 0.55s ease;
  }

  .film--hover:hover .film__img--active:not(.film__img--glow) {
    filter: brightness(0.72);
  }

  .film__placeholder {
    width: 100%;
    min-height: 12rem;
    border-radius: var(--radius-md);
    background: repeating-linear-gradient(
      -12deg,
      transparent,
      transparent 12px,
      rgba(128, 128, 128, 0.08) 12px,
      rgba(128, 128, 128, 0.08) 24px
    );
  }

  .film--empty .film__placeholder {
    min-height: min(40vh, 320px);
  }

  @media (prefers-reduced-motion: reduce) {
    .film__img {
      transform: none;
      transition: opacity 0.35s ease;
    }

    .film__img--glow {
      transition: opacity 0.2s ease;
    }
  }
</style>
