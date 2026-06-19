<script>
  import StoryHero from '$lib/components/story/StoryHero.svelte';
  import MotionIgniteWords from '$lib/components/MotionIgniteWords.svelte';
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
    <div class="contact-story__head story-editorial-head">
      <p class="story-editorial-head__code contact-story__lanes-eyebrow">// 02</p>
      <MotionIgniteWords
        as="h2"
        className="contact-story__lanes-title story-editorial-head__title"
        text={isEn ? 'Get in touch' : 'Parliamone'}
      />
    </div>

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
    width: 100%;
    padding: clamp(4rem, 12vh, 6.5rem) var(--editorial-pad);
  }

  .contact-story__head {
    margin-bottom: clamp(2rem, 5vh, 2.75rem);
  }

  .contact-story__lanes-grid {
    display: grid;
    gap: clamp(1.25rem, 3vw, 1.75rem);
    width: 100%;
    max-width: none;
  }

  @media (min-width: 900px) {
    .contact-story__lanes-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .contact-story__lane {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding: clamp(1.25rem, 3vw, 1.65rem);
    border: 1px solid color-mix(in srgb, var(--color-linen) 12%, transparent);
    background: color-mix(in srgb, var(--color-linen) 4%, transparent);
    transition:
      border-color 0.3s ease,
      transform 0.35s var(--ease-ribbit),
      background 0.3s ease;
  }

  .contact-story__lane:hover {
    border-color: color-mix(in srgb, var(--accent-gold) 35%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 6%, transparent);
    transform: translateY(-3px);
  }

  .contact-story__lane-body {
    margin-top: 0.75rem;
    max-width: none;
  }

  .story-page__link {
    margin-top: auto;
    padding-top: 1.25rem;
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    color: var(--accent-gold);
    border-bottom: 1px solid color-mix(in srgb, var(--accent-gold) 40%, transparent);
    align-self: flex-start;
  }

  .contact-story__social {
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem;
    width: 100%;
    max-width: none;
    margin: clamp(2rem, 5vh, 2.75rem) 0 0;
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
  }

  .contact-story__social a {
    color: color-mix(in srgb, var(--story-text) 70%, transparent);
    border-bottom: 1px solid var(--story-border);
    padding-bottom: 0.1rem;
    transition: color 0.2s ease, border-color 0.2s ease;
  }

  .contact-story__social a:hover {
    color: var(--story-text);
    border-color: color-mix(in srgb, var(--accent-gold) 50%, transparent);
  }
</style>
