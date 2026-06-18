<script>
  import StudentStory from '$lib/components/students/StudentStory.svelte';

  /** @type {import('$lib/data/student-showcases.js').elenaShowcase} */
  export let student;
</script>

<StudentStory {student} />
