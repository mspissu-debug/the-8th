<script>
  import { reveal } from '$lib/reveal';

  /**
   * @typedef {{ href: string, kicker: string, name: string, excerpt: string }} PeopleRowItem
   */

  /** @type {PeopleRowItem[]} */
  export let items = [];

  /** @type {string} */
  export let ctaLabel = 'Apri profilo';

  let rowIn = false;
</script>

<div
  class="people-row"
  use:reveal={{ variant: 'fade', threshold: 0.06, onInView: () => (rowIn = true) }}
>
  {#each items as item, i (item.href)}
    <a
      class="people-row__card home-stagger"
      class:in-view={rowIn}
      style="--delay: {0.05 + i * 0.08}s"
      href={item.href}
    >
      <span class="people-row__idx" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
      <span class="people-row__kicker">{item.kicker}</span>
      <span class="people-row__name">{item.name}</span>
      {#if item.excerpt}
        <p class="people-row__excerpt">{item.excerpt}</p>
      {/if}
      <span class="people-row__cta">{ctaLabel} →</span>
    </a>
  {/each}
</div>
