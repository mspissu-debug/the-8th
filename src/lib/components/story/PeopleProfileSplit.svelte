<script>
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { reveal } from '$lib/reveal';
  import { splitName } from '$lib/people-format.js';

  /** @type {string} */
  export let image = '';

  /** @type {string} */
  export let imageAlt = '';

  /** @type {string} */
  export let tag = '';

  /** @type {string} */
  export let name = '';

  /** @type {string} */
  export let roleLine = '';

  /** @type {string} */
  export let bio = '';

  /** @type {{ href: string, label: string, external?: boolean }[]} */
  export let actions = [];

  /** Posizione ritratto nel layout split: `left` o `right`. */
  export let imageSide = 'left';

  $: parts = splitName(name);

  let blockIn = false;
</script>

<section
  class="people-profile-split story-page__section--soft"
  class:people-profile-split--image-right={imageSide === 'right'}
  aria-label={name}
  use:reveal={{ variant: 'clip-up', threshold: 0.1, onInView: () => (blockIn = true) }}
>
  <div class="people-profile-split__grid">
    {#if image}
      <div
        class="people-profile-split__visual home-stagger"
        class:in-view={blockIn}
        data-variant="left"
      >
        <figure class="people-profile-split__portrait">
          {#if tag}
            <span class="people-profile-split__tag">{tag}</span>
          {/if}
          <img src={image} alt={imageAlt} loading="eager" />
        </figure>
      </div>
    {/if}

    <div
      class="people-profile-split__copy home-stagger"
      class:in-view={blockIn}
      style="--delay: 0.1s"
      data-variant="right"
    >
      <h1 class="people-profile-split__name">
        {#if parts.last}
          <span>{parts.first}</span>
          {' '}
          <span class="people-profile-split__name-accent">{parts.last}</span>
        {:else}
          {name}
        {/if}
      </h1>

      {#if roleLine}
        <p class="people-profile-split__role">{@html roleLine}</p>
      {/if}

      {#if bio}
        <MotionBlock delay={120}>
          <p class="people-profile-split__bio">{bio}</p>
        </MotionBlock>
      {/if}

      {#if actions.length}
        <div class="people-profile-split__actions">
          {#each actions as action}
            <a
              class="people-profile-split__btn"
              href={action.href}
              target={action.external ? '_blank' : undefined}
              rel={action.external ? 'noopener noreferrer' : undefined}
            >
              {action.label}
            </a>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
