<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { t } from '$lib/i18n';

  /** @type {{ slug: string, name: string, project: string, href: string, portrait?: string, cover: string, images: string[] }[]} */
  export let talents = [];

  /** @type {string} */
  export let bg = '#0c0b10';

  /** @type {boolean} */
  export let showHead = true;

  /** @type {boolean} */
  export let showCta = true;

  /** @type {string} */
  export let sectionCode = '// 04';

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
        <a class="story-talents__cta" href="/talenti">{$t('home.exploreAll')}</a>
      {/if}
    </div>
  {/if}

  <div class="story-talents__grid">
    {#each talents as talent}
      <a class="story-talents__card" href={talent.href}>
        <div class="story-talents__visual">
          {#if talent.cover}
            <img class="story-talents__cover" src={talent.cover} alt="" loading="lazy" />
          {/if}
          {#if talent.portrait}
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

<style>
  .story-talents {
    background: var(--story-bg);
    color: var(--color-linen);
    padding: clamp(4.5rem, 12vh, 7rem) var(--editorial-pad);
    scroll-margin-top: 5rem;
  }

  .story-talents__head {
    max-width: 38rem;
    margin-bottom: 2.25rem;
  }

  .story-talents__code {
    margin: 0 0 0.75rem;
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.5;
  }

  .story-talents :global(.story-talents__title) {
    margin: 0;
    font-family: var(--font-display);
    font-weight: var(--weight-black);
    font-size: clamp(1.25rem, 3.5vw, 2.4rem);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    line-height: 1.05;
  }

  .story-talents__lede {
    margin: 1rem 0 0;
    font-size: 0.95rem;
    line-height: 1.55;
    color: color-mix(in srgb, var(--color-linen) 72%, transparent);
  }

  .story-talents__cta {
    display: inline-block;
    margin-top: 1rem;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-bottom: 1px solid color-mix(in srgb, var(--accent-gold) 55%, transparent);
    padding-bottom: 0.12rem;
  }

  .story-talents__grid {
    display: grid;
    gap: clamp(1.25rem, 3vw, 2rem);
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    .story-talents__grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .story-talents__card {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    transition: transform 0.35s var(--ease-ribbit);
  }

  .story-talents__card:hover {
    transform: translateY(-4px);
  }

  .story-talents__visual {
    position: relative;
    aspect-ratio: 3 / 4;
    background: #0a0a0e;
    overflow: hidden;
  }

  .story-talents__cover {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .story-talents__portrait {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--color-linen) 35%, transparent);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
  }

  .story-talents__portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
  }

  .story-talents__thumbs {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 0.2rem;
  }

  .story-talents__thumbs img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 0.12rem;
    opacity: 0.92;
  }

  .story-talents__name {
    margin: 0;
    font-family: var(--font-display);
    font-size: 0.92rem;
    letter-spacing: 0.02em;
  }

  .story-talents__project {
    margin: 0.15rem 0 0;
    font-size: 0.65rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.55;
  }
</style>
