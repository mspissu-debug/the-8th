<script>
  import PeoplePageHead from '$lib/components/story/PeoplePageHead.svelte';
  import PeopleIndexRow from '$lib/components/story/PeopleIndexRow.svelte';
  import HomeStoryNewsletter from '$lib/components/home/HomeStoryNewsletter.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import { page } from '$app/stores';
  import { mentors as builtinMentors, mentorRole, mentorBio } from '$lib/data/mentors.js';
  import { excerpt, roleKicker } from '$lib/people-format.js';
  import { storyTones } from '$lib/data/home-story.js';
  import { locale, t } from '$lib/i18n';

  $: mentors = $page.data.mentors?.length ? $page.data.mentors : builtinMentors;

  $: homeBack = { href: '/', label: $t('pages.backHome'), hint: $t('pages.backHomeHint') };

  $: rowItems = mentors.map((mentor) => ({
    href: `/mentors/${mentor.slug}`,
    kicker: roleKicker(mentorRole(mentor, $locale)),
    name: mentor.name,
    excerpt: excerpt(mentorBio(mentor, $locale))
  }));
</script>

<svelte:head>
  <title>{$t('pages.mentorsTitle')} · THE 8th</title>
</svelte:head>

<article class="story-page mentors-story">
  <PeoplePageHead
    code="05 · {$t('nav.mentors')}"
    title={$t('pages.mentorsTitle')}
    lede={$t('pages.mentorsLede')}
    back={homeBack}
  />

  <section class="people-index" aria-label={$t('pages.mentorsTitle')}>
    <PeopleIndexRow items={rowItems} ctaLabel={$t('people.openProfile')} />
  </section>

  <HomeStoryNewsletter bg={storyTones.ash} />

  <HomeStoryFooter bg={storyTones.void} />
</article>
