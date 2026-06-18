<script>
  export let text = 'Scorri per esplorare';
</script>

<div class="scroll-hint" aria-hidden="true">
  <span class="scroll-hint__text t-caption">{text}</span>
</div>

<style>
  .scroll-hint {
    margin-top: var(--space-md);
  }

  .scroll-hint__text {
    color: var(--scroll-hint-color, rgba(244, 243, 238, 0.52));
    font-style: italic;
    letter-spacing: 0.04em;
  }
</style>
