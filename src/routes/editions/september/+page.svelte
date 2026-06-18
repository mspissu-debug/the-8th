<script>
  import EditionStory from '$lib/components/editions/EditionStory.svelte';
  import { storyHeroImages } from '$lib/data/home-story.js';
  import { t } from '$lib/i18n';

  $: title = $t('home.edizioniTitle') + ' 2025–2026';
  $: lede = $t('home.edizioniLead') + ' · Vicenzaoro Design Room';
</script>

<EditionStory {title} {lede} code="// Edizione 02" heroImages={storyHeroImages} showPairs={true} />
