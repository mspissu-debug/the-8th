<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import { reveal } from '$lib/reveal';

  /**
   * @typedef {{ roman: string, year: string, text: string }} RecognitionItem
   */

  /** @type {string} */
  export let sectionCode = '';

  /** @type {string} */
  export let title = '';

  /** @type {RecognitionItem[]} */
  export let items = [];

  /** @type {{ href: string, label: string } | null} */
  export let backLink = null;

  let listIn = false;
</script>

<section
  class="people-recognitions"
  aria-labelledby="people-recognitions-title"
  use:reveal={{ variant: 'clip-up', threshold: 0.08, onInView: () => (listIn = true) }}
>
  <div class="people-recognitions__inner">
    {#if sectionCode}
      <p class="people-recognitions__code">{sectionCode}</p>
    {/if}
    <MotionWords as="h2" id="people-recognitions-title" className="people-recognitions__title" text={title} />

    <ul class="people-recognitions__list">
      {#each items as item, i (item.roman)}
        <li
          class="people-recognitions__item home-stagger"
          class:in-view={listIn}
          style="--delay: {0.06 + i * 0.1}s"
        >
          <span class="people-recognitions__roman">{item.roman}</span>
          <div>
            <span class="people-recognitions__year">{item.year}</span>
            <p>{item.text}</p>
          </div>
        </li>
      {/each}
    </ul>

    {#if backLink}
      <a class="people-recognitions__back" href={backLink.href}>— {backLink.label}</a>
    {/if}
  </div>
</section>
