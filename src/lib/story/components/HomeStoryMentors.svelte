<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { locale, t } from '$lib/i18n';
  import { mentorRole } from '$lib/data/mentors.js';

  import { mentors } from '$lib/data/mentors.js';

  /** @type {string} */
  export let bg = '#14131a';

  /** @type {boolean} */
  export let showHead = true;

  /** @type {string} */
  export let sectionCode = '// 05';
</script>

<section class="story-mentors" id="home-mentors" style="--story-bg: {bg}" aria-labelledby="story-mentors-title">
  {#if showHead}
    <div class="story-mentors__head">
      <p class="story-mentors__code">{sectionCode}</p>
      <MotionWords
        as="h2"
        id="story-mentors-title"
        className="story-mentors__title"
        text={$t('home.storyMentorsTitle')}
      />
      <MotionBlock delay={160}>
        <p class="story-mentors__lede">{$t('home.storyMentorsBody')}</p>
      </MotionBlock>
      <a class="story-mentors__cta" href="/mentori">{$t('home.exploreAll')}</a>
    </div>
  {/if}

  <div class="story-mentors__grid">
    {#each mentors as mentor}
      <a class="story-mentors__card" href="/mentori/{mentor.slug}">
        <div class="story-mentors__frame">
          <img src={mentor.image} alt="" loading="lazy" />
        </div>
        <div class="story-mentors__meta">
          <p class="story-mentors__name">{mentor.name}</p>
          <p class="story-mentors__role">{mentorRole(mentor, $locale)}</p>
        </div>
      </a>
    {/each}
  </div>
</section>

<style>
  .story-mentors {
    background: var(--story-bg);
    color: var(--color-linen);
    padding: clamp(4.5rem, 12vh, 7rem) var(--editorial-pad);
  }

  .story-mentors__head {
    max-width: 36rem;
    margin-bottom: 2rem;
  }

  .story-mentors__code {
    margin: 0 0 0.75rem;
    font-size: 0.6rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.5;
  }

  .story-mentors :global(.story-mentors__title) {
    margin: 0;
    font-family: var(--font-display);
    font-weight: var(--weight-black);
    font-size: clamp(1.2rem, 3.2vw, 2.2rem);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    line-height: 1.05;
  }

  .story-mentors__lede {
    margin: 1rem 0 0;
    font-size: 0.95rem;
    line-height: 1.55;
    color: color-mix(in srgb, var(--color-linen) 72%, transparent);
  }

  .story-mentors__cta {
    display: inline-block;
    margin-top: 1rem;
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-bottom: 1px solid color-mix(in srgb, var(--accent-gold) 55%, transparent);
    padding-bottom: 0.15rem;
  }

  .story-mentors__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(0.85rem, 2vw, 1.25rem);
  }

  @media (min-width: 900px) {
    .story-mentors__grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .story-mentors__card {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    transition: transform 0.35s var(--ease-ribbit);
  }

  .story-mentors__card:hover {
    transform: translateY(-3px);
  }

  .story-mentors__frame {
    aspect-ratio: 3 / 4;
    overflow: hidden;
    border-radius: 0.25rem;
    background: #0a0a0e;
  }

  .story-mentors__frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 15%;
    filter: saturate(1.02);
  }

  .story-mentors__name {
    margin: 0;
    font-family: var(--font-display);
    font-size: 0.95rem;
    letter-spacing: 0.02em;
  }

  .story-mentors__role {
    margin: 0.2rem 0 0;
    font-size: 0.68rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-linen) 55%, transparent);
    line-height: 1.35;
  }
</style>
