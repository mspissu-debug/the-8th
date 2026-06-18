<script>
  import { onMount } from 'svelte';

  /** @type {'up' | 'fade' | 'scale' | 'kulto' | 'chapter' | 'proof' | 'cta'} */
  export let variant = 'up';

  /** @type {number} */
  export let delay = 0;

  let el;
  let visible = false;

  function checkVisible() {
    if (!el || visible) return;
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > window.innerHeight * 0.08;
    if (inView) visible = true;
  }

  onMount(() => {
    checkVisible();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
    );
    if (el) observer.observe(el);

    return () => observer.disconnect();
  });
</script>

<div
  bind:this={el}
  class="reveal reveal--{variant}"
  class:reveal--visible={visible}
  style="--reveal-delay: {delay}ms"
>
  <slot />
</div>

<style>
  .reveal {
    opacity: 0;
    transition:
      opacity 1.15s var(--ease-ribbit) var(--reveal-delay, 0ms),
      transform 1.15s var(--ease-ribbit) var(--reveal-delay, 0ms);
  }

  .reveal--up {
    transform: translateY(2.5rem);
  }

  .reveal--fade {
    transform: none;
  }

  .reveal--scale {
    transform: scale(0.96);
  }

  .reveal--kulto {
    transform: scale(1.06) translateY(2.2rem);
    transition-duration: 1.2s;
  }

  .reveal--chapter {
    transform: translateY(1.5rem) scale(0.985);
    transition-duration: 1.1s;
  }

  .reveal--proof {
    transform: translateY(1.2rem);
    transition-duration: 0.95s;
  }

  .reveal--cta {
    transform: translateY(0.9rem) scale(0.98);
    transition-duration: 0.85s;
  }

  .reveal--visible {
    opacity: 1;
    transform: none;
  }

  .reveal--kulto.reveal--visible {
    transform: scale(1) translateY(0);
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
