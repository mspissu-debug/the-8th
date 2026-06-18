<script>
  export let compact = false;

  /** @type {boolean} */
  export let story = false;

  /** @type {string} */
  export let section = 'Loading section';
</script>

<div
  class="eight-loader"
  class:eight-loader--compact={compact}
  class:eight-loader--story={story}
  aria-label="THE 8th loading"
  role="status"
>
  <div class="eight-loader__rings" aria-hidden="true">
    <span></span><span></span>
  </div>
  <p class="eight-loader__label">
    <span class="eight-loader__index">8 / 8</span>
    <span class="eight-loader__section">{section}</span>
  </p>
</div>

<style>
  .eight-loader {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    color: var(--color-linen);
  }

  .eight-loader__rings {
    position: relative;
    width: 2.4rem;
    height: 3.2rem;
  }

  .eight-loader__rings span {
    position: absolute;
    left: 0;
    width: 2.4rem;
    height: 1.5rem;
    border: 1.5px solid color-mix(in srgb, var(--accent-soft) 70%, transparent);
    border-radius: 999px;
    animation: eight-build 1.2s var(--ease-out) infinite;
    box-shadow: 0 0 16px color-mix(in srgb, var(--accent-highlight) 35%, transparent);
  }

  .eight-loader__rings span:first-child {
    top: 0;
  }

  .eight-loader__rings span:last-child {
    bottom: 0;
    animation-delay: 120ms;
  }

  .eight-loader__label {
    display: flex;
    flex-direction: column;
    margin: 0;
    line-height: 1.15;
  }

  .eight-loader__index {
    font-family: var(--font-display);
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .eight-loader__section {
    font-family: var(--font-body);
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(244, 243, 238, 0.62);
  }

  .eight-loader--compact {
    gap: 0.55rem;
  }

  .eight-loader--compact .eight-loader__rings {
    width: 1.9rem;
    height: 2.65rem;
  }

  .eight-loader--compact .eight-loader__rings span {
    width: 1.9rem;
    height: 1.2rem;
  }

  .eight-loader--compact .eight-loader__index {
    font-size: 0.72rem;
  }

  .eight-loader--compact .eight-loader__section {
    font-size: 0.58rem;
  }

  .eight-loader--story .eight-loader__rings span {
    border-color: color-mix(in srgb, var(--accent-gold) 55%, transparent);
    box-shadow: 0 0 14px color-mix(in srgb, var(--accent-gold) 22%, transparent);
  }

  .eight-loader--story .eight-loader__index {
    color: var(--color-linen);
    font-weight: var(--weight-black);
  }

  .eight-loader--story .eight-loader__section {
    color: color-mix(in srgb, var(--accent-gold) 75%, var(--color-linen));
  }

  @keyframes eight-build {
    0% {
      opacity: 0.28;
      transform: scale(0.78);
    }
    45% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0.48;
      transform: scale(0.86);
    }
  }
</style>
