<script>
  /** @type {string} */
  export let trail = '';

  /** @type {string} */
  export let aside = '';
</script>

<div class="people-profile-meta">
  <span class="people-profile-meta__trail">{trail}</span>
  {#if aside}
    <span class="people-profile-meta__pair">{aside}</span>
  {/if}
</div>
