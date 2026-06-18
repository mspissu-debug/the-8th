<script>
  import { onMount } from 'svelte';
  import HeroCarousel from '$lib/components/HeroCarousel.svelte';
  import LocaleToggle from '$lib/components/LocaleToggle.svelte';
  import ScrollHint from '$lib/components/ScrollHint.svelte';
  import HomeStoryStatement from './HomeStoryStatement.svelte';
  import HomeStoryScrollScene from './HomeStoryScrollScene.svelte';
  import HomeStoryFilmStrip from './HomeStoryFilmStrip.svelte';
  import HomeStoryPath from './HomeStoryPath.svelte';
  import HomeStoryRail from './HomeStoryRail.svelte';
  import HomeStoryTalents from './HomeStoryTalents.svelte';
  import HomeStoryMentors from './HomeStoryMentors.svelte';
  import HomeStoryVetrina from './HomeStoryVetrina.svelte';
  import HomeStoryNewsletter from './HomeStoryNewsletter.svelte';
  import HomeStoryFooter from './HomeStoryFooter.svelte';
  import { page } from '$app/stores';
  import {
    storyTones,
    storyHeroImages,
    storyFilmStripImages,
    storyOrbitImages,
    storyPathImages,
    storyWorks,
    storyTalents as builtinStoryTalents,
    storyVetrinaSlides
  } from '$lib/data/home-story.js';
  import { buildStoryTalentsFromShowcases } from '$lib/data/home-story-build.js';
  import { t } from '$lib/i18n';

  $: storyTalents = $page.data.showcases?.length
    ? buildStoryTalentsFromShowcases($page.data.showcases)
    : builtinStoryTalents;

  let entered = false;

  $: pathSteps = [
    {
      id: '01',
      title: $t('home.path01Title'),
      body: $t('home.path01Body'),
      images: storyPathImages.crowd
    },
    {
      id: '02',
      title: $t('home.path02Title'),
      body: $t('home.path02Body'),
      images: storyPathImages.courage
    },
    {
      id: '03',
      title: $t('home.path03Title'),
      body: $t('home.path03Body'),
      images: storyPathImages.concept
    },
    {
      id: '04',
      title: $t('home.path04Title'),
      body: $t('home.path04Body'),
      images: storyPathImages.sketch
    },
    {
      id: '05',
      title: $t('home.path05Title'),
      body: $t('home.path05Body'),
      images: storyPathImages.prototype
    },
    {
      id: '06',
      title: $t('home.path06Title'),
      body: $t('home.path06Body'),
      images: storyPathImages.finished
    },
    {
      id: '07',
      title: $t('home.path07Title'),
      body: $t('home.path07Body'),
      images: storyPathImages.shooting
    },
    {
      id: '08',
      title: $t('home.path08Title'),
      body: $t('home.path08Body'),
      images: storyPathImages.vetrina
    }
  ];

  $: if (typeof document !== 'undefined') {
    document.body.classList.toggle('home-story-gate-open', !entered);
  }

  onMount(() => {
    document.body.classList.add('home-story-active');
    if (sessionStorage.getItem('the8-story-entered') === '1') entered = true;
    return () => {
      document.body.classList.remove('home-story-active', 'home-story-gate-open');
    };
  });

  function enterStory() {
    entered = true;
    sessionStorage.setItem('the8-story-entered', '1');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
</script>

<div class="home-story" class:home-story--entered={entered}>
  {#if !entered}
    <div class="home-story__gate" role="dialog" aria-label={$t('home.storyEnter')}>
      <div class="home-story__gate-media" aria-hidden="true">
        <HeroCarousel images={storyHeroImages} intervalMs={4500} />
        <div class="home-story__gate-veil"></div>
      </div>
      <div class="home-story__gate-content">
        <p class="home-story__gate-kicker">THE 8th · 2025–26</p>
        <h1 class="home-story__gate-title t-display">THE <span>8</span></h1>
        <button type="button" class="home-story__gate-btn" on:click={enterStory}>
          {$t('home.storyEnter')}
        </button>
      </div>
    </div>
  {/if}

  <section class="home-story__hero" aria-label="Introduzione">
    <div class="home-story__hero-media" aria-hidden="true">
      <HeroCarousel images={storyHeroImages} intervalMs={5200} showDots={true} />
      <div class="home-story__hero-veil"></div>
    </div>
    <div class="home-story__hero-ui">
      <div class="home-story__hero-locale">
        <LocaleToggle />
      </div>
      <div class="home-story__hero-copy">
        <p class="home-story__hero-kicker">{$t('home.storyKicker')}</p>
        <h1 class="home-story__hero-brand t-display">THE <span>8</span></h1>
        <p class="home-story__hero-tagline">{$t('home.heroTagline')}</p>
      </div>
      <ScrollHint text={$t('home.scroll')} />
    </div>
  </section>

  <HomeStoryStatement
    code="// 01"
    title={$t('home.storyManifestoTitle')}
    body={$t('home.storyManifestoBody')}
    bg={storyTones.void}
    tone="dark"
    minVh={1.05}
  />

  <HomeStoryFilmStrip
    images={storyFilmStripImages}
    label={$t('home.storySketchLabel')}
    bg={storyTones.charcoal}
    intervalMs={2800}
  />

  <HomeStoryStatement
    code="// 02"
    title={$t('home.storyCourageTitle')}
    body={$t('home.storyCourageBody')}
    bg={storyTones.ash}
    tone="dark"
    minVh={1}
  />

  <HomeStoryPath steps={pathSteps} bg={storyTones.void} scrollVh={3.4} />

  <HomeStoryScrollScene
    images={storyOrbitImages}
    bg={storyTones.charcoal}
    scrollVh={2.4}
    layout="split"
    copy={{
      left: $t('home.storyMirrorLeft'),
      right: $t('home.storyMirrorRight')
    }}
  />

  <HomeStoryTalents talents={storyTalents} bg={storyTones.charcoal} />

  <HomeStoryMentors bg={storyTones.ink} />

  <HomeStoryRail
    items={storyWorks}
    title={$t('home.storyWorksTitle')}
    ctaLabel={$t('home.storyWorksCta')}
    ctaHref="/talenti"
    bg={storyTones.charcoal}
  />

  <HomeStoryVetrina images={storyVetrinaSlides} bg={storyTones.void} />

  <HomeStoryNewsletter bg={storyTones.ash} />

  <HomeStoryStatement
    code="// 07"
    title={$t('home.storyClosingTitle')}
    body={$t('home.storyClosingBody')}
    bg={storyTones.linen}
    tone="light"
    minVh={0.9}
  >
    <div class="home-story__closing-actions">
      <a class="home-story__closing-cta home-story__closing-cta--primary" href="/talenti">
        {$t('home.heroPrimaryCta')}
      </a>
      <a class="home-story__closing-cta" href="/vetrina">{$t('home.heroSecondaryCta')}</a>
      <a class="home-story__closing-cta" href="/open-call">{$t('nav.candidature')}</a>
    </div>
  </HomeStoryStatement>

  <HomeStoryFooter bg={storyTones.void} />
</div>

<style>
  .home-story {
    --story-ease: var(--ease-ribbit);
    background: #06060a;
  }

  .home-story__gate {
    position: fixed;
    inset: 0;
    z-index: 300;
    display: grid;
    place-items: center;
    background: #06060a;
  }

  .home-story--entered .home-story__gate {
    display: none;
  }

  .home-story__gate-media {
    position: absolute;
    inset: 0;
  }

  .home-story__gate-media :global(.carousel) {
    position: absolute;
    inset: 0;
  }

  .home-story__gate-veil {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: radial-gradient(circle at 50% 38%, transparent 0%, rgba(6, 6, 10, 0.78) 68%);
    pointer-events: none;
  }

  .home-story__gate-content {
    position: relative;
    z-index: 2;
    text-align: center;
    padding: var(--editorial-pad);
  }

  .home-story__gate-kicker {
    margin: 0 0 0.75rem;
    font-size: 0.65rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-linen) 55%, transparent);
  }

  .home-story__gate-title {
    margin: 0;
    color: var(--color-linen);
    line-height: 0.9;
  }

  .home-story__gate-title span {
    color: var(--accent-gold);
  }

  .home-story__gate-btn {
    margin-top: 1.5rem;
    border: 1px solid color-mix(in srgb, var(--color-linen) 35%, transparent);
    border-radius: 999px;
    padding: 0.65rem 1.35rem;
    background: transparent;
    color: var(--color-linen);
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      transform 0.3s var(--story-ease);
  }

  .home-story__gate-btn:hover {
    transform: translateY(-2px);
    border-color: color-mix(in srgb, var(--color-linen) 55%, transparent);
    background: color-mix(in srgb, var(--color-linen) 8%, transparent);
  }

  .home-story__hero {
    position: relative;
    min-height: 100svh;
    background: #06060a;
  }

  .home-story__hero-media {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .home-story__hero-media :global(.carousel) {
    position: absolute;
    inset: 0;
  }

  .home-story__hero-veil {
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background:
      linear-gradient(180deg, rgba(6, 6, 10, 0.15) 0%, rgba(6, 6, 10, 0.55) 55%, rgba(6, 6, 10, 0.95) 100%),
      radial-gradient(circle at 18% 12%, color-mix(in srgb, var(--accent-primary) 18%, transparent), transparent 42%);
  }

  .home-story__hero-ui {
    --scroll-hint-color: color-mix(in srgb, var(--color-linen) 55%, transparent);
    position: relative;
    z-index: 2;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: calc(4.5rem + var(--editorial-pad)) var(--editorial-pad) clamp(2rem, 6vh, 3.5rem);
    pointer-events: none;
  }

  .home-story__hero-locale {
    position: absolute;
    top: calc(4.25rem + 0.35rem);
    right: var(--editorial-pad);
    pointer-events: auto;
    --locale-border: color-mix(in srgb, var(--color-linen) 30%, transparent);
    --locale-muted: color-mix(in srgb, var(--color-linen) 52%, transparent);
    --locale-active: var(--color-linen);
  }

  @media (min-width: 720px) {
    .home-story__hero-locale {
      display: none;
    }
  }

  .home-story__hero-copy {
    text-align: center;
    margin-bottom: 0.35rem;
  }

  .home-story__hero-kicker {
    margin: 0;
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-linen) 52%, transparent);
  }

  .home-story__hero-brand {
    margin: 0.35rem 0 0;
    color: var(--color-linen);
    line-height: 0.9;
  }

  .home-story__hero-brand span {
    color: var(--accent-gold);
  }

  .home-story__hero-tagline {
    margin: 0.75rem auto 0;
    max-width: 36rem;
    font-size: clamp(0.88rem, 1.8vw, 1.02rem);
    line-height: 1.45;
    color: color-mix(in srgb, var(--color-linen) 78%, transparent);
  }

  .home-story__closing-actions {
    margin-top: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
    justify-content: center;
    pointer-events: auto;
  }

  .home-story__closing-cta {
    border: 1px solid color-mix(in srgb, var(--color-amethyst) 22%, transparent);
    border-radius: 999px;
    padding: 0.52rem 0.95rem;
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: transform 0.24s var(--ease-out), background 0.24s ease;
  }

  .home-story__closing-cta:hover {
    transform: translateY(-2px);
    background: color-mix(in srgb, var(--color-amethyst) 6%, transparent);
  }

  .home-story__closing-cta--primary {
    border-color: color-mix(in srgb, var(--accent-gold) 55%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 14%, transparent);
  }
</style>
