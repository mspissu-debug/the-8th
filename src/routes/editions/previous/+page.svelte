<script>
  import EditionStory from '$lib/components/editions/EditionStory.svelte';
  import { allFinished } from '$lib/data/home-media.js';
  import { t } from '$lib/i18n';

  $: title = $t('home.edizioniTitle') + ' 2024–2025';
  $: lede = 'Archivio della prima edizione THE 8th — quattro talenti, quattro mentor, dodici mesi di laboratorio.';
</script>

<EditionStory title={title} lede={lede} code="// Edizione 01" heroImages={allFinished.slice(0, 10)} showPairs={true} variant="archive" />
