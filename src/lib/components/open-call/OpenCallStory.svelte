<script>
  import StoryHero from '$lib/components/story/StoryHero.svelte';
  import MotionWords from '$lib/components/MotionWords.svelte';
  import OpenCallForm from './OpenCallForm.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import { aboutHeroImages, storyTones } from '$lib/data/home-story.js';
  import { trailSite, backFromSite } from '$lib/navigation/trails.js';
  import { reveal } from '$lib/reveal';
  import { t } from '$lib/i18n';

  let formIn = false;
</script>

<svelte:head>
  <title>{$t('pages.openCallTitle')} · THE 8th</title>
  <meta name="description" content={$t('pages.openCallLede')} />
</svelte:head>

<article class="story-page open-call-story">
  <StoryHero
    images={aboutHeroImages}
    crumbs={trailSite($t('pages.openCallTitle'))}
    back={backFromSite()}
    code={`// ${$t('pages.openCallLabel')}`}
    title={$t('pages.openCallTitle')}
    lede={$t('pages.openCallLede')}
  />

  <section
    class="open-call-story__form story-page__section--soft"
    aria-labelledby="open-call-form-title"
    use:reveal={{ variant: 'clip-up', threshold: 0.08, onInView: () => (formIn = true) }}
  >
    <div class="open-call-story__inner home-stagger" class:in-view={formIn}>
      <p class="story-page__eyebrow">// 01 · {$t('openCall.step1Title')}</p>
      <MotionWords
        as="h2"
        id="open-call-form-title"
        className="story-page__heading open-call-story__title"
        text={$t('pages.openCallTitle')}
      />
      <OpenCallForm />
    </div>
  </section>

  <HomeStoryFooter bg={storyTones.void} />
</article>

<style>
  .open-call-story__form {
    padding: clamp(3.5rem, 10vh, 5.5rem) var(--editorial-pad);
  }

  .open-call-story__inner {
    max-width: var(--max-width);
    margin: 0 auto;
    opacity: 0;
    transform: translateY(18px);
    transition:
      opacity 0.7s var(--ease-ribbit),
      transform 0.7s var(--ease-ribbit);
  }

  .open-call-story__inner.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .open-call-story :global(.open-call-story__title) {
    margin-bottom: 2rem;
  }
</style>
