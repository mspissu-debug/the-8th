<script>
  import { page } from '$app/stores';
  import PeopleProfileMeta from '$lib/components/story/PeopleProfileMeta.svelte';
  import PeopleProfileSplit from '$lib/components/story/PeopleProfileSplit.svelte';
  import PeoplePhaseCarousels from '$lib/components/story/PeoplePhaseCarousels.svelte';
  import PeopleRecognitions from '$lib/components/story/PeopleRecognitions.svelte';
  import PeopleIndexRow from '$lib/components/story/PeopleIndexRow.svelte';
  import HomeStoryNewsletter from '$lib/components/home/HomeStoryNewsletter.svelte';
  import HomeStoryFooter from '$lib/components/home/HomeStoryFooter.svelte';
  import { storyTalents as builtinStoryTalents } from '$lib/data/home-story.js';
  import { getBuiltinShowcases } from '$lib/data/showcase-registry.js';
  import { buildStoryTalentsFromShowcases } from '$lib/data/home-story-build.js';
  import { getTalentNeighborsFromList, talents as builtinTalents } from '$lib/data/talents.js';
  import { EDITION_PAIRS } from '$lib/data/pairs.js';
  import { excerpt } from '$lib/people-format.js';
  import { studentProductionPhases } from '$lib/data/student-phases.js';
  import PageNav from '$lib/components/PageNav.svelte';
  import { trailStudent } from '$lib/navigation/trails.js';
  import { storyTones } from '$lib/data/home-story.js';
  import { siteLinks } from '$lib/data/site-links.js';
  import { locale, t } from '$lib/i18n';

  $: homeBack = { href: '/', label: $t('pages.backHome'), hint: $t('pages.backHomeHint') };

  /** @type {import('$lib/data/student-showcases.js').elenaShowcase} */
  export let student;

  $: isEn = $locale === 'en';
  $: talentList = $page.data.talents?.length ? $page.data.talents : builtinTalents;
  $: storyTalents = $page.data.showcases?.length
    ? buildStoryTalentsFromShowcases($page.data.showcases)
    : builtinStoryTalents;
  $: showcasesBySlug = Object.fromEntries(
    ($page.data.showcases ?? getBuiltinShowcases()).map((s) => [s.slug, s])
  );
  $: studentPitch =
    isEn && student.pitchEn ? student.pitchEn : student.pitchIt ?? student.pitch;
  $: neighbors = getTalentNeighborsFromList(talentList, student.slug);
  $: index = neighbors.index >= 0 ? neighbors.index : 0;
  $: total = talentList.length;
  $: pair = EDITION_PAIRS.find((p) => p.studentSlug === student.slug);
  $: tag = `T.${String(index + 1).padStart(2, '0')}`;

  $: roleLine = `| ${student.project} · <strong>THE 8th · ${$t('people.editionYear')}</strong>`;

  $: actions = [
    {
      href: `mailto:${siteLinks.email}?subject=${encodeURIComponent(`${$t('people.contactDesignerSubject')} — ${student.name}`)}`,
      label: `${$t('people.contactDesigner')} →`
    },
    ...(pair?.mentorSlug
      ? [
          {
            href: `/mentors/${pair.mentorSlug}`,
            label: `Mentor — ${pair.mentorName} →`
          }
        ]
      : []),
    ...(student.social?.instagram
      ? [{ href: student.social.instagram, label: 'Instagram →', external: true }]
      : [])
  ];

  $: productionPhases = studentProductionPhases(student);

  $: phases = isEn
    ? [
        {
          roman: 'I',
          year: $t('people.editionYear'),
          text: 'Concept — Authorial direction, references and first material choices for the collection.'
        },
        {
          roman: 'II',
          year: $t('people.editionYear'),
          text: 'Sketch & prototype — Iterations with mentors and partner companies until the piece is production-ready.'
        },
        {
          roman: 'III',
          year: $t('people.editionYear'),
          text: 'Showcase — Finished work, shooting and presentation at Vicenzaoro Design Room.'
        }
      ]
    : [
        {
          roman: 'I',
          year: $t('people.editionYear'),
          text: 'Concept — Direzione creativa, riferimenti e prime scelte materiali per la collezione.'
        },
        {
          roman: 'II',
          year: $t('people.editionYear'),
          text: 'Sketch e prototipo — Iterazioni con mentor e aziende partner fino al pezzo pronto per la produzione.'
        },
        {
          roman: 'III',
          year: $t('people.editionYear'),
          text: 'Vetrina — Pezzo finito, shooting e presentazione a Vicenzaoro Design Room.'
        }
      ];

  $: rowItems = storyTalents.map((talent) => ({
    href: talent.href,
    kicker: talent.project,
    name: talent.name,
    excerpt: excerpt(
      talent.slug === student.slug ? studentPitch : showcasesBySlug[talent.slug]?.pitch ?? talent.project
    )
  }));
</script>

<svelte:head>
  <title>{student.name} · {student.project} | THE 8th</title>
</svelte:head>

<article class="story-page student-story">
  <PageNav crumbs={trailStudent(student.name)} back={homeBack} variant="story" />

  <PeopleProfileMeta
    trail="> {$t('people.studentTrail')} {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}"
    aside="[ {$t('people.pairLabel')} · {String(index + 1).padStart(2, '0')} ]"
  />

  <PeopleProfileSplit
    image={student.portrait || student.finished?.[0] || student.concept?.[0] || ''}
    imageAlt={student.name}
    {tag}
    name={student.name}
    {roleLine}
    bio={studentPitch}
    {actions}
  />

  <PeoplePhaseCarousels
    sectionCode="02 / 05 · {$t('pages.talentsLabel')}"
    title={$t('people.worksTitle')}
    phases={productionPhases}
  />

  <PeopleRecognitions
    sectionCode="04 / 05 · {$t('people.recognitions')}"
    title={student.project}
    items={phases}
    backLink={{ href: '/students', label: $t('people.allStudents') }}
  />

  <section class="people-index-section" aria-label={$t('profile.exploreTalents')}>
    <PeopleIndexRow items={rowItems} ctaLabel={$t('people.openProfile')} />
  </section>

  <HomeStoryNewsletter bg={storyTones.ash} />

  <HomeStoryFooter bg={storyTones.void} />
</article>
