<script>
  import PeopleProfileMeta from '$lib/components/story/PeopleProfileMeta.svelte';
  import PeopleProfileSplit from '$lib/components/story/PeopleProfileSplit.svelte';
  import PeopleRecognitions from '$lib/components/story/PeopleRecognitions.svelte';
  import PeopleIndexRow from '$lib/components/story/PeopleIndexRow.svelte';
  import HomeStoryNewsletter from '$lib/components/home/HomeStoryNewsletter.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import { page } from '$app/stores';
  import {
    mentors as builtinMentors,
    mentorRole,
    mentorBio,
    getMentorNeighborsFrom
  } from '$lib/data/mentors.js';
  import { EDITION_PAIRS } from '$lib/data/pairs.js';
  import { excerpt, recognitionFromText, roleKicker } from '$lib/people-format.js';
  import PageNav from '$lib/components/PageNav.svelte';
  import { trailMentor } from '$lib/navigation/trails.js';
  import { storyTones } from '$lib/data/home-story.js';
  import { locale, t } from '$lib/i18n';

  $: homeBack = { href: '/', label: $t('pages.backHome'), hint: $t('pages.backHomeHint') };

  /** @type {import('$lib/data/mentors.js').mentors[number]} */
  export let mentor;

  $: mentors = $page.data.mentors?.length ? $page.data.mentors : builtinMentors;
  $: isEn = $locale === 'en';
  $: neighbors = getMentorNeighborsFrom(mentors, mentor.slug);
  $: pair = EDITION_PAIRS.find((p) => p.mentorSlug === mentor.slug);
  $: index = neighbors.index >= 0 ? neighbors.index : 0;
  $: total = mentors.length;
  $: tag = `M.${String(index + 1).padStart(2, '0')}`;

  $: roleParts = mentorRole(mentor, $locale).split('·').map((s) => s.trim());
  $: roleLine = `| ${roleKicker(mentorRole(mentor, $locale))} · <strong>${roleParts.slice(1).join(' · ') || mentorRole(mentor, $locale)}</strong>`;

  $: actions = [
    ...(pair
      ? [
          {
            href: `/students/${pair.studentSlug}`,
            label: `${$t('people.studentLink')} — ${pair.studentName} →`
          }
        ]
      : []),
    ...(mentor.website
      ? [{ href: mentor.website, label: `${$t('people.website')} →`, external: true }]
      : [])
  ];

  $: recognitionItems = recognitionFromText(
    mentorBio(mentor, $locale),
    3,
    $t('people.editionYear')
  );

  $: rowItems = mentors.map((m) => ({
    href: `/mentors/${m.slug}`,
    kicker: roleKicker(mentorRole(m, $locale)),
    name: m.name,
    excerpt: excerpt(mentorBio(m, $locale))
  }));
</script>

<svelte:head>
  <title>{mentor.name} · THE 8th</title>
</svelte:head>

<article class="story-page mentor-story">
  <PageNav crumbs={trailMentor(mentor.name)} back={homeBack} variant="story" />

  <PeopleProfileMeta
    trail="> {$t('people.mentorTrail')} {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}"
    aside="[ {$t('people.pairLabel')} · {String(index + 1).padStart(2, '0')} ]"
  />

  <PeopleProfileSplit
    image={mentor.image}
    imageAlt={mentor.name}
    {tag}
    name={mentor.name}
    {roleLine}
    bio={mentorBio(mentor, $locale)}
    {actions}
  />

  <PeopleRecognitions
    sectionCode="04 / 05 · {$t('people.recognitions')}"
    title={$t('people.awardsTitle')}
    items={recognitionItems}
    backLink={{ href: '/mentors', label: $t('people.allMentors') }}
  />

  <section class="people-index-section" aria-label={$t('profile.exploreMentors')}>
    <PeopleIndexRow items={rowItems} ctaLabel={$t('people.openProfile')} />
  </section>

  <HomeStoryNewsletter bg={storyTones.ash} />

  <HomeStoryFooter bg={storyTones.void} />
</article>
