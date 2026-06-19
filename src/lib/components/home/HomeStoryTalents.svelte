<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { reveal } from '$lib/reveal';
  import { t } from '$lib/i18n';

  let gridIn = false;

  /** @type {{ slug: string, name: string, project: string, href: string, portrait?: string, cover: string, images: string[] }[]} */
  export let talents = [];

  /** @type {string} */
  export let bg = '#0c0b10';

  /** @type {boolean} */
  export let showHead = true;

  /** @type {boolean} */
  export let showCta = true;

  /** @type {string} */
  export let sectionCode = '// 10';

  /** @type {string} */
  export let sectionTitle = '';

  /** @type {string} */
  export let sectionLede = '';

  $: titleText = sectionTitle || $t('home.talentsTitle');
  $: ledeText = sectionLede || $t('home.talentsLead');
</script>

<section class="story-talents" id="home-talents" style="--story-bg: {bg}" aria-labelledby="story-talents-title">
  {#if showHead}
    <div class="story-talents__head">
      <p class="story-talents__code">{sectionCode}</p>
      <MotionWords
        as="h2"
        id="story-talents-title"
        className="story-talents__title"
        text={titleText}
      />
      <MotionBlock delay={140}>
        <p class="story-talents__lede">{ledeText}</p>
      </MotionBlock>
      {#if showCta}
        <a class="story-talents__cta" href="/students">{$t('home.exploreAll')}</a>
      {/if}
    </div>
  {/if}

  <div
    class="story-talents__grid"
    use:reveal={{ variant: 'fade', threshold: 0.08, onInView: () => (gridIn = true) }}
  >
    {#each talents as talent, i (talent.href ?? talent.slug ?? i)}
      <a
        class="story-talents__card home-stagger"
        class:in-view={gridIn}
        style="--delay: {0.06 + i * 0.1}s"
        data-variant={i % 2 === 0 ? 'left' : 'right'}
        href={talent.href}
      >
        <div class="story-talents__visual">
          {#if talent.cover}
            <img class="story-talents__cover" src={talent.cover} alt="" loading="lazy" />
          {/if}
          {#if talent.portrait && talent.portrait !== talent.cover}
            <div class="story-talents__portrait">
              <img src={talent.portrait} alt="" loading="lazy" />
            </div>
          {/if}
        </div>
        {#if talent.images?.length > 1}
          <div class="story-talents__thumbs" aria-hidden="true">
            {#each talent.images.slice(0, 5) as src}
              <img src={src} alt="" loading="lazy" />
            {/each}
          </div>
        {/if}
        <div class="story-talents__meta">
          <p class="story-talents__name">{talent.name}</p>
          <p class="story-talents__project">{talent.project}</p>
        </div>
      </a>
    {/each}
  </div>
</section>
