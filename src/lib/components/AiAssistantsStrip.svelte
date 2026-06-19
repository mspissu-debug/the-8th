<script>
  import { page } from '$app/stores';
  import { aiAssistants } from '$lib/data/ai-assistants.js';
  import {
    formatAiCopy,
    getAiAssistantPrompt,
    resolveAiContext
  } from '$lib/data/ai-assistant-contexts.js';
  import { locale, t } from '$lib/i18n';

  /** @type {string} */
  export let bg = '#06060a';

  /** Layout largo come le sezioni home (mentor/talenti). */
  export let wide = false;

  $: pageVars = {
    name: $page.data.student?.name ?? $page.data.mentor?.name ?? '',
    project: $page.data.student?.project ?? ''
  };
  $: context = resolveAiContext($page.url.pathname, pageVars);
  $: prompt = getAiAssistantPrompt($locale, context);
  $: copyKey = `aiAssistants.pages.${context.key}`;

  /** @param {'aria' | 'eyebrow' | 'title' | 'lede'} field */
  function pageCopy(field) {
    const key = `${copyKey}.${field}`;
    const fallback = `aiAssistants.pages.default.${field}`;
    const raw = $t(key);
    const text = raw === key ? $t(fallback) : raw;
    return formatAiCopy(text, context.vars);
  }

  $: ariaLabel = pageCopy('aria');
  $: eyebrow = pageCopy('eyebrow');
  $: title = pageCopy('title');
  $: lede = pageCopy('lede');
  $: links = aiAssistants.map((assistant) => ({
    ...assistant,
    href: assistant.buildUrl(prompt)
  }));
</script>

<section
  class="ai-strip"
  class:ai-strip--wide={wide}
  style="--story-bg: {bg}"
  aria-label={ariaLabel}
>
  <div class="ai-strip__inner">
    <div class="ai-strip__copy">
      <p class="ai-strip__eyebrow">{eyebrow}</p>
      <p class="ai-strip__title">{title}</p>
      <p class="ai-strip__lede">{lede}</p>
    </div>

    <ul class="ai-strip__grid">
      {#each links as assistant (assistant.id)}
        <li>
          <a
            class="ai-strip__card"
            href={assistant.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={$t('aiAssistants.openIn').replace('{name}', assistant.name)}
          >
            <span class="ai-strip__icon" aria-hidden="true">
              <img src={assistant.icon} alt="" width="32" height="32" loading="lazy" decoding="async" />
            </span>
            <span class="ai-strip__name">{assistant.name}</span>
          </a>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .ai-strip {
    background: var(--story-bg);
    border-top: 1px solid color-mix(in srgb, var(--color-linen) 10%, transparent);
    padding: clamp(2.5rem, 6vh, 3.5rem) var(--editorial-pad)
      clamp(2rem, 5vh, 3rem);
  }

  .ai-strip__inner {
    max-width: var(--editorial-max);
    margin: 0 auto;
    display: grid;
    gap: 1.75rem;
    align-items: center;
  }

  .ai-strip--wide .ai-strip__inner {
    max-width: var(--max-width);
    width: 100%;
  }

  @media (min-width: 768px) {
    .ai-strip__inner {
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      gap: 2.5rem;
    }

    .ai-strip--wide .ai-strip__inner {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: clamp(2rem, 5vw, 4rem);
    }
  }

  .ai-strip__eyebrow {
    margin: 0 0 0.45rem;
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-linen) 42%, transparent);
  }

  .ai-strip__title {
    margin: 0 0 0.65rem;
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 2.2vw, 1.35rem);
    letter-spacing: 0.02em;
    line-height: 1.2;
    color: var(--color-linen);
  }

  .ai-strip__lede {
    margin: 0;
    max-width: 42ch;
    font-size: 0.82rem;
    line-height: 1.55;
    color: color-mix(in srgb, var(--color-linen) 62%, transparent);
  }

  .ai-strip--wide .ai-strip__lede {
    max-width: 48ch;
  }

  .ai-strip__grid {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .ai-strip--wide .ai-strip__grid {
    width: min(100%, 22rem);
    margin-inline: auto;
  }

  @media (min-width: 768px) {
    .ai-strip--wide .ai-strip__grid {
      margin-inline: 0;
    }
  }

  .ai-strip__card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    min-height: 5.5rem;
    padding: 0.9rem 0.65rem;
    border: 1px solid color-mix(in srgb, var(--color-linen) 14%, transparent);
    border-radius: 0.65rem;
    background: color-mix(in srgb, var(--color-linen) 4%, transparent);
    transition:
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.25s ease;
  }

  .ai-strip__card:hover {
    border-color: color-mix(in srgb, var(--accent-gold) 45%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 8%, transparent);
    transform: translateY(-2px);
  }

  .ai-strip__icon {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 999px;
    overflow: hidden;
    background: color-mix(in srgb, var(--color-linen) 8%, transparent);
  }

  .ai-strip__icon img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .ai-strip__name {
    font-size: 0.68rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: color-mix(in srgb, var(--color-linen) 78%, transparent);
  }
</style>
