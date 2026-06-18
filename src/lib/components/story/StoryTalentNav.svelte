<script>
  import MotionWords from '$lib/components/MotionWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { storyTones } from '$lib/data/home-story.js';
  import { storyTalents as builtinStoryTalents } from '$lib/data/home-story.js';
  import { getTalentNeighborsFromList, talents as builtinTalents } from '$lib/data/talents.js';
  import { locale, t } from '$lib/i18n';
  import { reveal } from '$lib/reveal';

  let gridIn = false;

  /** @type {string} */
  export let currentSlug = '';

  /** @type {string} */
  export let bg = storyTones.charcoal;

  /** @type {string} */
  export let sectionCode = '// 04';

  $: talentList = builtinTalents;
  $: storyTalents = builtinStoryTalents;
  $: neighbors = getTalentNeighborsFromList(talentList, currentSlug);
  $: bySlug = Object.fromEntries(storyTalents.map((talent) => [talent.slug, talent]));
  $: prevPeer = neighbors.prev ? { ...neighbors.prev, ...bySlug[neighbors.prev.slug] } : null;
  $: nextPeer = neighbors.next ? { ...neighbors.next, ...bySlug[neighbors.next.slug] } : null;
  $: isEn = $locale === 'en';
  $: flowLabel = isEn ? 'Continue the edition' : 'Continua l’edizione';
</script>

<nav class="story-peer-nav" style="--story-peer-bg: {bg}" aria-label={$t('nav.talents')}>
  <header class="story-peer-nav__head">
    <p class="story-peer-nav__code">{sectionCode} · {$t('pages.talentsLabel')}</p>
    <MotionWords as="p" className="story-peer-nav__title" text={$t('profile.exploreTalents')} />
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
          style={prevPeer.cover ? `--flow-cover: url(${prevPeer.cover})` : undefined}
        >
          <span class="story-peer-nav__flow-kicker">{isEn ? 'Previous' : 'Precedente'}</span>
          <span class="story-peer-nav__flow-name">{prevPeer.name}</span>
          <span class="story-peer-nav__flow-project">{prevPeer.project}</span>
        </a>
      {:else}
        <div class="story-peer-nav__flow-spacer" aria-hidden="true"></div>
      {/if}

      {#if nextPeer}
        <a
          class="story-peer-nav__flow-link story-peer-nav__flow-link--next"
          href={nextPeer.href}
          style={nextPeer.cover ? `--flow-cover: url(${nextPeer.cover})` : undefined}
        >
          <span class="story-peer-nav__flow-kicker">{isEn ? 'Next' : 'Successivo'}</span>
          <span class="story-peer-nav__flow-name">{nextPeer.name}</span>
          <span class="story-peer-nav__flow-project">{nextPeer.project}</span>
        </a>
      {:else}
        <div class="story-peer-nav__flow-spacer" aria-hidden="true"></div>
      {/if}
    </div>
  {/if}

  <ul
    class="story-peer-nav__grid"
    use:reveal={{ variant: 'fade', threshold: 0.06, onInView: () => (gridIn = true) }}
  >
    {#each storyTalents as talent, i (talent.slug)}
      {@const active = talent.slug === currentSlug}
      <li>
        <a
          class="story-peer-nav__card home-stagger"
          class:story-peer-nav__card--active={active}
          class:in-view={gridIn}
          style="--delay: {0.05 + i * 0.09}s"
          data-variant={i % 2 === 0 ? 'left' : 'right'}
          href={talent.href}
          aria-current={active ? 'page' : undefined}
        >
          <div class="story-peer-nav__visual">
            {#if talent.cover}
              <img class="story-peer-nav__cover" src={talent.cover} alt="" loading="lazy" />
            {/if}
            {#if talent.portrait && talent.portrait !== talent.cover}
              <div class="story-peer-nav__portrait">
                <img src={talent.portrait} alt="" loading="lazy" />
              </div>
            {/if}
          </div>
          <div class="story-peer-nav__meta">
            <p class="story-peer-nav__name">{talent.name}</p>
            <p class="story-peer-nav__project">{talent.project}</p>
          </div>
        </a>
      </li>
    {/each}
  </ul>

  <a class="story-peer-nav__cta" href="/students">{$t('home.exploreAll')}</a>
</nav>

<style src="$lib/styles/story-peer-nav.css"></style>
