<script>
  import { onMount } from 'svelte';

  let progress = 0;

  onMount(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<div class="scroll-progress" aria-hidden="true">
  <span class="scroll-progress__bar" style="width: {progress}%"></span>
</div>

<style>
  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    z-index: 200;
    background: transparent;
    pointer-events: none;
  }

  .scroll-progress__bar {
    display: block;
    height: 100%;
    background: linear-gradient(
      90deg,
      var(--accent-gold) 0%,
      color-mix(in srgb, var(--accent-highlight) 70%, var(--accent-gold)) 100%
    );
    transition: width 0.08s linear;
  }
</style>
