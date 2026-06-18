<script>
  import StoryHero from '$lib/components/story/StoryHero.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import { storyHeroImages, storyTones } from '$lib/data/home-story.js';
  import { siteLinks } from '$lib/data/site-links.js';
  import { trailSite, backFromSite } from '$lib/navigation/trails.js';
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>{$t('pages.cookiePolicyTitle')} · THE 8th</title>
  <meta name="description" content={$t('pages.cookiePolicyLede')} />
</svelte:head>

<article class="story-page cookie-policy-story">
  <StoryHero
    images={storyHeroImages}
    crumbs={trailSite($t('pages.cookiePolicyTitle'))}
    back={backFromSite()}
    code={$t('cookies.code')}
    title={$t('pages.cookiePolicyTitle')}
    lede={$t('pages.cookiePolicyLede')}
  />

  <section class="cookie-policy-story__body story-page__section--soft">
    <div class="cookie-policy-story__inner">
      <article class="cookie-policy-story__block">
        <h2>{$t('cookies.section1Title')}</h2>
        <p>{$t('cookies.section1Body')}</p>
      </article>
      <article class="cookie-policy-story__block">
        <h2>{$t('cookies.section2Title')}</h2>
        <p>{$t('cookies.section2Body')}</p>
      </article>
      <article class="cookie-policy-story__block">
        <h2>{$t('cookies.section3Title')}</h2>
        <p>
          {$t('cookies.section3Body')}
          <a href="mailto:{siteLinks.email}">{siteLinks.email}</a>.
        </p>
      </article>
    </div>
  </section>

  <HomeStoryFooter bg={storyTones.void} />
</article>

<style>
  .cookie-policy-story__body {
    padding: clamp(3rem, 8vh, 4.5rem) var(--editorial-pad);
  }

  .cookie-policy-story__inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: grid;
    gap: 2rem;
  }

  .cookie-policy-story__block h2 {
    margin: 0 0 0.65rem;
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 2.2vw, 1.25rem);
    font-weight: var(--weight-medium);
  }

  .cookie-policy-story__block p {
    margin: 0;
    font-size: var(--editorial-body);
    line-height: 1.6;
    color: var(--story-text-muted);
    max-width: 38rem;
  }

  .cookie-policy-story__block a {
    color: var(--accent-gold);
  }
</style>
