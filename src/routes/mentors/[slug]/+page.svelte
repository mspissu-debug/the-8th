<script>
  import MentorStory from '$lib/components/mentori/MentorStory.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<MentorStory mentor={data.mentor} />
