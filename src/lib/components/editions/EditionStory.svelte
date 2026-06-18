<script>
  import StoryHero from '$lib/components/story/StoryHero.svelte';
  import HomeStoryStatement from '$lib/components/home/HomeStoryStatement.svelte';
  import HomeStoryNewsletter from '$lib/components/home/HomeStoryNewsletter.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import FilmCarousel from '$lib/components/FilmCarousel.svelte';
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

  <HomeStoryStatement
    code="// 01"
    title={$t('home.edizioniTitle')}
    body={$t('home.edizioniBody')}
    bg={storyTones.void}
    tone="dark"
    minVh={0.75}
  />

  {#if showPairs}
    <section class="edition-story__pairs story-page__section--soft" aria-label="Coppie edizione">
      <p class="story-page__eyebrow edition-story__pairs-eyebrow">// 02 · {$t('nav.talents')}</p>
      <PairCards />
    </section>
  {/if}

  <section class="edition-story__vetrina story-page__section--void" aria-label="Vetrina">
    <FilmCarousel
      label={$t('home.vetrinaTitle')}
      images={storyVetrinaSlides}
      aspect="wide"
      intervalMs={5200}
    />
  </section>

  <HomeStoryNewsletter bg={storyTones.ash} />

  <HomeStoryFooter bg={storyTones.void} />
</article>

<style>
  .edition-story__pairs {
    padding: clamp(4rem, 12vh, 6rem) var(--editorial-pad);
  }

  .edition-story__pairs-eyebrow {
    margin-bottom: 2rem;
    max-width: var(--max-width);
    margin-left: auto;
    margin-right: auto;
  }
</style>
