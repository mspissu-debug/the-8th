<script>
  import StoryHero from '$lib/components/story/StoryHero.svelte';
  import MotionIgniteWords from '$lib/components/MotionIgniteWords.svelte';
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
    <div class="open-call-story__inner story-editorial-head home-stagger" class:in-view={formIn}>
      <p class="story-editorial-head__code open-call-story__code">// 01 · {$t('openCall.step1Title')}</p>
      <MotionIgniteWords
        as="h2"
        id="open-call-form-title"
        className="open-call-story__title story-editorial-head__title"
        text={$t('pages.openCallTitle')}
      />
      <p class="open-call-story__lede story-editorial-head__lede">{$t('pages.openCallLede')}</p>
      <OpenCallForm />
    </div>
  </section>

  <HomeStoryFooter bg={storyTones.void} />
</article>

<style>
  .open-call-story__form {
    width: 100%;
    padding: clamp(3.5rem, 10vh, 5.5rem) var(--editorial-pad);
  }

  .open-call-story__inner {
    width: 100%;
    max-width: none;
    margin-inline: 0;
    opacity: 0;
    transform: translateY(1.25rem);
    transition:
      opacity 0.85s var(--ease-ribbit),
      transform 0.85s var(--ease-ribbit);
  }

  .open-call-story__inner.in-view {
    opacity: 1;
    transform: translateY(0);
  }

  .open-call-story__code {
    margin-bottom: 0.75rem;
  }

  .open-call-story :global(.open-call-story__title) {
    margin-bottom: 0.5rem;
  }

  .open-call-story__lede {
    margin-bottom: clamp(2rem, 5vh, 2.75rem);
  }
</style>
