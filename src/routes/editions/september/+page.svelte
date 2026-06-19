<script>
  import EditionStory from '$lib/components/editions/EditionStory.svelte';
  import { storyVetrinaSlides } from '$lib/data/home-story.js';
  import { t } from '$lib/i18n';

  $: title = $t('pages.vicenzaoroPageTitle');
  $: lede = $t('pages.vicenzaoroPageLede');
</script>

<EditionStory
  {title}
  {lede}
  code="// 13 · Vicenzaoro"
  heroImages={storyVetrinaSlides.slice(0, 8)}
  showPairs={true}
/>
