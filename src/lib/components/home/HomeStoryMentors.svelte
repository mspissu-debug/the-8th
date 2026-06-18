<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { reveal } from '$lib/reveal';
  import { page } from '$app/stores';
  import { locale, t } from '$lib/i18n';
  import { mentorRole, mentors as builtinMentors } from '$lib/data/mentors.js';

  $: mentors = $page.data.mentors?.length ? $page.data.mentors : builtinMentors;

  let gridIn = false;

  /** @type {string} */
  export let bg = '#14131a';

  /** @type {boolean} */
  export let showHead = true;

  /** @type {string} */
  export let sectionCode = '// 15';
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
      <a class="story-mentors__cta" href="/mentors">{$t('home.exploreAll')}</a>
    </div>
  {/if}

  <div
    class="story-mentors__grid"
    use:reveal={{ variant: 'fade', threshold: 0.08, onInView: () => (gridIn = true) }}
  >
    {#each mentors as mentor, i (mentor.slug)}
      <a
        class="story-mentors__card home-stagger"
        class:in-view={gridIn}
        style="--delay: {0.06 + i * 0.1}s"
        data-variant={i % 2 === 0 ? 'left' : 'right'}
        href="/mentors/{mentor.slug}"
      >
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
