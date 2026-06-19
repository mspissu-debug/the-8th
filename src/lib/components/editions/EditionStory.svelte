<script>
  import StoryHero from '$lib/components/story/StoryHero.svelte';
  import HomeStoryStatement from '$lib/components/home/HomeStoryStatement.svelte';
  import HomeStoryNewsletter from '$lib/components/home/HomeStoryNewsletter.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import HomeStoryVetrina from '$lib/components/home/HomeStoryVetrina.svelte';
  import MotionIgniteWords from '$lib/components/MotionIgniteWords.svelte';
  import PairCards from '$lib/components/page/PairCards.svelte';
  import { storyTones, storyVetrinaSlides } from '$lib/data/home-story.js';
  import { trailSite, backFromSite } from '$lib/navigation/trails.js';
  import { t } from '$lib/i18n';

  /** @type {string} */
  export let title = '';

  /** @type {string} */
  export let lede = '';

  /** @type {string} */
  export let code = '// Edizioni';

  /** @type {string[]} */
  export let heroImages = [];

  /** @type {boolean} */
  export let showPairs = true;

  /** @type {'vicenzaoro' | 'archive'} */
  export let variant = 'vicenzaoro';
</script>

<svelte:head>
  <title>{title} · THE 8th</title>
</svelte:head>

<article class="story-page edition-story">
  <StoryHero
    images={heroImages.length ? heroImages : storyVetrinaSlides.slice(0, 8)}
    crumbs={trailSite(title)}
    back={backFromSite()}
    {code}
    {title}
    {lede}
  />

  {#if variant === 'vicenzaoro'}
    <HomeStoryStatement
      sectionId="edition-vicenzaoro-about"
      code="// 01 · Vicenzaoro"
      title={$t('pages.vicenzaoroWhatTitle')}
      body={$t('pages.vicenzaoroWhatBody')}
      bg={storyTones.void}
      tone="dark"
      minVh={0.7}
    >
      <a
        class="edition-story__vicenzaoro-link"
        href="https://www.vicenzaoro.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        {$t('pages.vicenzaoroLink')}
      </a>
    </HomeStoryStatement>

    <HomeStoryStatement
      code="// 02 · Design Room"
      title={$t('pages.vicenzaoroDesignRoomTitle')}
      body={$t('pages.vicenzaoroDesignRoomBody')}
      bg={storyTones.ash}
      tone="dark"
      minVh={0.65}
    />
  {:else}
    <HomeStoryStatement
      code="// 01"
      title={$t('home.edizioniTitle')}
      body={$t('home.edizioniBody')}
      bg={storyTones.void}
      tone="dark"
      minVh={0.75}
    />
  {/if}

  {#if showPairs}
    <section class="edition-story__pairs story-page__section--soft" aria-label={variant === 'vicenzaoro' ? $t('pages.vicenzaoroTalentsTitle') : 'Coppie edizione'}>
      <div class="edition-story__pairs-head story-editorial-head">
        <p class="story-editorial-head__code edition-story__pairs-eyebrow">
          // {variant === 'vicenzaoro' ? '03' : '02'} · {$t('nav.talents')}
        </p>
        <MotionIgniteWords
          as="h2"
          className="edition-story__pairs-title story-editorial-head__title"
          text={variant === 'vicenzaoro' ? $t('pages.vicenzaoroTalentsTitle') : $t('home.edizioniTitle')}
        />
      </div>
      <PairCards />
    </section>
  {/if}

  <div class="edition-story__vetrina">
    <HomeStoryVetrina
      images={storyVetrinaSlides}
      bg={storyTones.charcoal}
      sectionCode={variant === 'vicenzaoro' ? '// 04' : '// 03'}
      sectionDomId="edition-vetrina"
      badge={$t('home.vetrinaBadge')}
      titleText={$t('home.vetrinaTitle')}
      bodyText={$t('home.vetrinaBody')}
    />
  </div>

  <HomeStoryNewsletter bg={storyTones.ash} />

  <HomeStoryFooter bg={storyTones.void} />
</article>

<style>
  .edition-story__vicenzaoro-link {
    display: inline-block;
    margin-top: 1.35rem;
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    color: var(--accent-gold);
    border-bottom: 1px solid color-mix(in srgb, var(--accent-gold) 45%, transparent);
    padding-bottom: 0.1rem;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .edition-story__vicenzaoro-link:hover {
    color: var(--color-linen);
    border-color: var(--accent-gold);
  }

  .edition-story__pairs {
    width: 100%;
    padding: clamp(4rem, 12vh, 6rem) var(--editorial-pad);
  }

  .edition-story__pairs-head {
    margin-bottom: clamp(2rem, 5vh, 2.75rem);
  }

  .edition-story__vetrina {
    width: 100%;
  }

  .edition-story__vetrina :global(.story-vetrina) {
    scroll-margin-top: 0;
  }
</style>
