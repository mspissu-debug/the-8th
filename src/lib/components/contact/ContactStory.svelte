<script>
  import StoryHero from '$lib/components/story/StoryHero.svelte';
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import HomeStoryNewsletter from '$lib/components/home/HomeStoryNewsletter.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import { storyHeroImages, storyTones } from '$lib/data/home-story.js';
  import { siteLinks } from '$lib/data/site-links.js';
  import { trailSite, backFromSite } from '$lib/navigation/trails.js';
  import { reveal } from '$lib/reveal';
  import { locale, t } from '$lib/i18n';

  let lanesIn = false;

  $: isEn = $locale === 'en';
  $: pageTitle = $t('pages.contactTitle');
  $: lanes = [
    {
      lane: 'ON',
      title: $t('pages.contactEmailLabel'),
      body: $t('pages.contactWrite'),
      href: `mailto:${siteLinks.email}`,
      cta: siteLinks.email
    },
    {
      lane: 'OFF',
      title: $t('pages.contactApply'),
      body: $t('pages.openCallLede'),
      href: '/open-call',
      cta: $t('pages.contactApplyCta')
    }
  ];
</script>

<svelte:head>
  <title>{pageTitle} · THE 8th</title>
</svelte:head>

<article class="story-page contact-story">
  <StoryHero
    images={storyHeroImages}
    crumbs={trailSite(pageTitle)}
    back={backFromSite()}
    code={`// ${$t('pages.contactLabel')}`}
    title={pageTitle}
    lede={$t('pages.contactLede')}
  />

  <section
    class="contact-story__lanes story-page__section--soft"
    aria-label={pageTitle}
    use:reveal={{ variant: 'clip-up', threshold: 0.12, onInView: () => (lanesIn = true) }}
  >
    <p class="story-page__eyebrow contact-story__lanes-eyebrow">// 02</p>
    <MotionWords
      as="h2"
      className="story-page__heading contact-story__lanes-title"
      text={isEn ? 'Get in touch' : 'Parliamone'}
    />
    <div class="contact-story__lanes-grid">
      {#each lanes as lane, i (lane.lane)}
        <article
          class="contact-story__lane home-stagger"
          class:in-view={lanesIn}
          style="--delay: {0.1 + i * 0.14}s"
          data-variant={i === 0 ? 'left' : 'right'}
        >
          <p class="story-page__tag">{lane.lane}</p>
          <h3 class="story-page__lane-title">{lane.title}</h3>
          <p class="story-page__body contact-story__lane-body">{lane.body}</p>
          <a class="story-page__link" href={lane.href}>{lane.cta}</a>
        </article>
      {/each}
    </div>
    <MotionBlock delay={160}>
      <div class="contact-story__social">
        {#if siteLinks.instagram}
          <a href={siteLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        {/if}
        {#if siteLinks.linkedin}
          <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        {/if}
      </div>
    </MotionBlock>
  </section>

  <HomeStoryNewsletter bg={storyTones.ash} />

  <HomeStoryFooter bg={storyTones.void} />
</article>

<style>
  .contact-story__lanes {
    padding: clamp(4rem, 12vh, 6.5rem) var(--editorial-pad);
  }

  .contact-story__lanes-eyebrow,
  .contact-story :global(.contact-story__lanes-title) {
    max-width: var(--max-width);
    margin-left: auto;
    margin-right: auto;
  }

  .contact-story :global(.contact-story__lanes-title) {
    margin-bottom: 2.5rem;
  }

  .contact-story__lanes-grid {
    display: grid;
    gap: clamp(2rem, 5vw, 3rem);
    max-width: var(--max-width);
    margin: 0 auto;
  }

  @media (min-width: 900px) {
    .contact-story__lanes-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .contact-story__lane-body {
    margin-top: 0.75rem;
  }

  .story-page__link {
    margin-top: 1.25rem;
  }

  .contact-story__social {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    max-width: var(--max-width);
    margin: 2.5rem auto 0;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .contact-story__social a {
    color: color-mix(in srgb, var(--story-text) 70%, transparent);
    border-bottom: 1px solid var(--story-border);
    padding-bottom: 0.1rem;
  }
</style>
