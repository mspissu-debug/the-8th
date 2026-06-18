<script>
  import { onMount } from 'svelte';

  /** @type {number} */
  export let delay = 0;

  let el;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div
  bind:this={el}
  class="motion-block"
  class:motion-block--visible={visible}
  style="--reveal-delay: {delay}ms"
>
  <slot />
</div>
