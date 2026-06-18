<script>
  import PageNav from '$lib/components/PageNav.svelte';
  import { reveal } from '$lib/reveal';

  /** @type {string} */
  export let code = '';

  /** @type {string} */
  export let title = '';

  /** @type {string} */
  export let lede = '';

  /** @type {{ href: string, label: string, hint?: string } | null} */
  export let back = null;

  let headIn = false;
</script>

{#if back}
  <PageNav {back} crumbs={[]} variant="story" />
{/if}

<header
  class="people-page-head"
  class:people-page-head--after-nav={!!back}
  use:reveal={{ variant: 'clip-up', threshold: 0.12, onInView: () => (headIn = true) }}
>
  <div class="people-page-head__inner">
    <p class="people-page-head__code home-stagger" class:in-view={headIn}>{code}</p>
    <h1 class="people-page-head__title home-stagger" class:in-view={headIn} style="--delay: 0.08s">
      {title}
    </h1>
    {#if lede}
      <p class="people-page-head__lede home-stagger" class:in-view={headIn} style="--delay: 0.16s">
        {lede}
      </p>
    {/if}
  </div>
</header>
