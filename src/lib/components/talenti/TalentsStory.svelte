<script>
  import PeoplePageHead from '$lib/components/story/PeoplePageHead.svelte';
  import HomeStoryTalents from '$lib/components/home/HomeStoryTalents.svelte';
  import HomeStoryNewsletter from '$lib/components/home/HomeStoryNewsletter.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import { page } from '$app/stores';
  import { storyTones } from '$lib/data/home-story.js';
  import { buildStoryTalentsFromShowcases } from '$lib/data/home-story-build.js';
  import { t } from '$lib/i18n';

  $: homeBack = { href: '/', label: $t('pages.backHome'), hint: $t('pages.backHomeHint') };

  $: storyTalents = buildStoryTalentsFromShowcases($page.data.showcases ?? []);
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

  <HomeStoryTalents
    talents={storyTalents}
    bg={storyTones.charcoal}
    showHead={false}
    showCta={false}
  />

  <HomeStoryNewsletter bg={storyTones.ash} wide />

  <HomeStoryFooter bg={storyTones.void} wide />
</article>
