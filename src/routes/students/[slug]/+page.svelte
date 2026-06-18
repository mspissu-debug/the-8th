<script>
  import StudentShowcase from '$lib/components/StudentShowcase.svelte';

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<StudentShowcase student={data.student} />
