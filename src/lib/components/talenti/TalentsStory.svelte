<script>
  import PeoplePageHead from '$lib/components/story/PeoplePageHead.svelte';
  import PeopleIndexRow from '$lib/components/story/PeopleIndexRow.svelte';
  import HomeStoryNewsletter from '$lib/components/home/HomeStoryNewsletter.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import { page } from '$app/stores';
  import { storyTones } from '$lib/data/home-story.js';
  import { storyTalents as builtinStoryTalents } from '$lib/data/home-story.js';
  import { getBuiltinShowcases } from '$lib/data/showcase-registry.js';
  import { buildStoryTalentsFromShowcases } from '$lib/data/home-story-build.js';
  import { excerpt } from '$lib/people-format.js';
  import { t } from '$lib/i18n';

  $: homeBack = { href: '/', label: $t('pages.backHome'), hint: $t('pages.backHomeHint') };

  $: storyTalents = $page.data.showcases?.length
    ? buildStoryTalentsFromShowcases($page.data.showcases)
    : builtinStoryTalents;
  $: showcasesBySlug = Object.fromEntries(
    ($page.data.showcases ?? getBuiltinShowcases()).map((s) => [s.slug, s])
  );
  $: rowItems = storyTalents.map((talent) => ({
    href: talent.href,
    kicker: talent.project,
    name: talent.name,
    excerpt: excerpt(showcasesBySlug[talent.slug]?.pitch ?? talent.project)
  }));
</script>

<svelte:head>
  <title>{$t('pages.talentsTitle')} · THE 8th</title>
</svelte:head>

<article class="story-page talents-story">
  <PeoplePageHead
    code="04 · {$t('pages.talentsLabel')}"
    title={$t('pages.talentsTitle')}
    lede={$t('pages.talentsLede')}
    back={homeBack}
  />

  <section class="people-index" aria-label={$t('pages.talentsTitle')}>
    <PeopleIndexRow items={rowItems} ctaLabel={$t('people.openProfile')} />
  </section>

  <HomeStoryNewsletter bg={storyTones.ash} />

  <HomeStoryFooter bg={storyTones.void} />
</article>
