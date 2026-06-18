<script>
  import StoryHero from '$lib/components/story/StoryHero.svelte';
  import HomeStoryStatement from '$lib/components/home/HomeStoryStatement.svelte';
  import HomeStoryFilmStrip from '$lib/components/home/HomeStoryFilmStrip.svelte';
  import HomeStoryNewsletter from '$lib/components/home/HomeStoryNewsletter.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import { aboutHeroImages, aboutFilmImages, storyTones } from '$lib/data/home-story.js';
  import { trailSite, backFromSite } from '$lib/navigation/trails.js';
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>{$t('pages.aboutTitle')} · THE 8th</title>
  <meta name="description" content={$t('pages.aboutLede')} />
</svelte:head>

<article class="story-page about-story" id="manifesto">
  <StoryHero
    images={aboutHeroImages}
    crumbs={trailSite($t('pages.aboutTitle'))}
    back={backFromSite()}
    code={`// ${$t('pages.aboutLabel')}`}
    title={$t('pages.aboutTitle')}
    lede={$t('pages.aboutLede')}
  />

  <HomeStoryStatement
    code="// 01"
    title={$t('home.storyManifestoTitle')}
    body={$t('home.storyManifestoBody')}
    bg={storyTones.void}
    tone="dark"
    minVh={1.05}
  />

  <HomeStoryStatement
    code="// 02"
    title={$t('home.storyCourageTitle')}
    body={$t('home.storyCourageBody')}
    bg={storyTones.ash}
    tone="dark"
    minVh={1}
  />

  <HomeStoryFilmStrip
    images={aboutFilmImages}
    label={$t('home.storySketchLabel')}
    bg={storyTones.charcoal}
    intervalMs={2800}
  />

  <HomeStoryNewsletter bg={storyTones.ash} />

  <HomeStoryFooter bg={storyTones.void} />
</article>
