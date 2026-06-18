<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { mentors, getMentorNeighbors, mentorRole } from '$lib/data/mentors.js';
  import { storyTones } from '$lib/data/home-story.js';
  import { locale, t } from '$lib/i18n';
  import { reveal } from '$lib/reveal';

  let gridIn = false;

  /** @type {string} */
  export let currentSlug = '';

  /** @type {string} */
  export let bg = storyTones.charcoal;

  /** @type {string} */
  export let sectionCode = '// 05';

  $: peers = mentors.map((mentor) => ({ ...mentor, href: `/mentors/${mentor.slug}` }));
  $: neighbors = getMentorNeighbors(currentSlug);
  $: prevPeer = neighbors.prev ? { ...neighbors.prev, href: `/mentors/${neighbors.prev.slug}` } : null;
  $: nextPeer = neighbors.next ? { ...neighbors.next, href: `/mentors/${neighbors.next.slug}` } : null;
  $: isEn = $locale === 'en';
  $: flowLabel = isEn ? 'Explore the mentor network' : 'Esplora la rete dei mentor';
</script>

<nav class="story-peer-nav story-peer-nav--mentor" style="--story-peer-bg: {bg}" aria-label={$t('nav.mentors')}>
  <header class="story-peer-nav__head">
    <p class="story-peer-nav__code">{sectionCode} · {$t('nav.mentors')}</p>
    <MotionWords as="p" className="story-peer-nav__title" text={$t('profile.exploreMentors')} />
    <MotionBlock delay={100}>
      <p class="story-peer-nav__lede">{flowLabel}</p>
    </MotionBlock>
  </header>

  {#if prevPeer || nextPeer}
    <div class="story-peer-nav__flow">
      {#if prevPeer}
        <a
          class="story-peer-nav__flow-link"
          href={prevPeer.href}
          style={prevPeer.image ? `--flow-cover: url(${prevPeer.image})` : undefined}
        >
          <span class="story-peer-nav__flow-kicker">{isEn ? 'Previous' : 'Precedente'}</span>
          <span class="story-peer-nav__flow-name">{prevPeer.name}</span>
          <span class="story-peer-nav__flow-project">{mentorRole(prevPeer, $locale)}</span>
        </a>
      {:else}
        <div class="story-peer-nav__flow-spacer" aria-hidden="true"></div>
      {/if}

      {#if nextPeer}
        <a
          class="story-peer-nav__flow-link story-peer-nav__flow-link--next"
          href={nextPeer.href}
          style={nextPeer.image ? `--flow-cover: url(${nextPeer.image})` : undefined}
        >
          <span class="story-peer-nav__flow-kicker">{isEn ? 'Next' : 'Successivo'}</span>
          <span class="story-peer-nav__flow-name">{nextPeer.name}</span>
          <span class="story-peer-nav__flow-project">{mentorRole(nextPeer, $locale)}</span>
        </a>
      {:else}
        <div class="story-peer-nav__flow-spacer" aria-hidden="true"></div>
      {/if}
    </div>
  {/if}

  <ul
    class="story-peer-nav__grid story-peer-nav__grid--mentor"
    use:reveal={{ variant: 'fade', threshold: 0.06, onInView: () => (gridIn = true) }}
  >
    {#each peers as mentor, i (mentor.slug)}
      {@const active = mentor.slug === currentSlug}
      <li>
        <a
          class="story-peer-nav__card story-peer-nav__card--mentor home-stagger"
          class:story-peer-nav__card--active={active}
          class:in-view={gridIn}
          style="--delay: {0.05 + i * 0.09}s"
          data-variant={i % 2 === 0 ? 'left' : 'right'}
          href={mentor.href}
          aria-current={active ? 'page' : undefined}
        >
          <div class="story-peer-nav__visual story-peer-nav__visual--mentor">
            {#if mentor.image}
              <img class="story-peer-nav__cover" src={mentor.image} alt="" loading="lazy" />
            {/if}
          </div>
          <div class="story-peer-nav__meta">
            <p class="story-peer-nav__name">{mentor.name}</p>
            <p class="story-peer-nav__project">{mentorRole(mentor, $locale)}</p>
          </div>
        </a>
      </li>
    {/each}
  </ul>

  <a class="story-peer-nav__cta" href="/mentors">{$t('home.exploreAll')}</a>
</nav>

<style src="$lib/styles/story-peer-nav.css"></style>
