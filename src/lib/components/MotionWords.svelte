<script>
  import { onMount } from 'svelte';

  /** @type {string} */
  export let text = '';

  /** @type {keyof HTMLElementTagNameMap} */
  export let as = 'h2';

  /** @type {string} */
  export let className = '';

  /** @type {string} */
  export let id = '';

  /** @type {number} */
  export let delay = 0;

  let el;
  let visible = false;

  $: words = text.trim() ? text.trim().split(/\s+/) : [];

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -6% 0px' }
    );
    if (el) observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<svelte:element
  this={as}
  bind:this={el}
  {id}
  class="motion-words {className}"
  class:motion-words--visible={visible}
  style="--reveal-delay: {delay}ms"
  aria-label={text}
>
  {#each words as word, i (i)}
    <span class="motion-words__word" aria-hidden="true" style="--i: {i}">
      <span class="motion-words__inner">{word}</span>
    </span>{#if i < words.length - 1}{' '}{/if}
  {/each}
</svelte:element>
