<script>
  import PageNav from '$lib/components/PageNav.svelte';
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
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
  class="people-page-head story-editorial-head"
  class:people-page-head--after-nav={!!back}
  use:reveal={{ variant: 'clip-up', threshold: 0.12, onInView: () => (headIn = true) }}
>
  <div class="people-page-head__inner story-editorial-head__inner">
    {#if code}
      <p class="people-page-head__code story-editorial-head__code home-stagger" class:in-view={headIn}>
        {code}
      </p>
    {/if}
    <div class="home-stagger" class:in-view={headIn} style="--delay: 0.08s">
      <MotionWords
        as="h1"
        className="people-page-head__title story-editorial-head__title"
        text={title}
      />
    </div>
    {#if lede}
      <MotionBlock delay={140}>
        <p
          class="people-page-head__lede story-editorial-head__lede home-stagger"
          class:in-view={headIn}
          style="--delay: 0.16s"
        >
          {lede}
        </p>
      </MotionBlock>
    {/if}
  </div>
</header>
