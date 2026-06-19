<script>
  import { page } from '$app/stores';
  import { aiAssistants } from '$lib/data/ai-assistants.js';
  import {
    formatAiCopy,
    getAiAssistantPrompt,
    resolveAiContext
  } from '$lib/data/ai-assistant-contexts.js';
  import MotionIgniteWords from '$lib/components/MotionIgniteWords.svelte';
  import MotionBlock from '$lib/components/MotionBlock.svelte';
  import { locale, t } from '$lib/i18n';

  /** @type {string} */
  export let bg = '#06060a';

  /** @deprecated Ignored — strip is always full viewport width. */
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

<section class="ai-strip" style="--story-bg: {bg}" aria-label={ariaLabel}>
  <div class="ai-strip__inner">
    <div class="ai-strip__copy story-editorial-head">
      <p class="ai-strip__eyebrow story-editorial-head__code">{eyebrow}</p>
      <MotionIgniteWords as="p" className="ai-strip__title story-editorial-head__title" text={title} />
      <MotionBlock delay={90}>
        <p class="ai-strip__lede story-editorial-head__lede">{lede}</p>
      </MotionBlock>
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
    width: 100%;
    background: var(--story-bg);
    border-top: 1px solid color-mix(in srgb, var(--color-linen) 10%, transparent);
    padding: clamp(2.5rem, 6vh, 3.5rem) var(--editorial-pad) clamp(2rem, 5vh, 3rem);
  }

  .ai-strip__inner {
    width: 100%;
    max-width: none;
    margin-inline: 0;
    display: grid;
    gap: clamp(1.75rem, 4vh, 2.25rem);
    align-items: end;
  }

  @media (min-width: 768px) {
    .ai-strip__inner {
      grid-template-columns: minmax(0, 1fr) auto;
      gap: clamp(2rem, 5vw, 4rem);
    }
  }

  .ai-strip__lede {
    max-width: min(42rem, 92vw);
  }

  .ai-strip__grid {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
    width: min(100%, 24rem);
    margin-inline: 0;
  }

  @media (min-width: 768px) {
    .ai-strip__grid {
      justify-self: end;
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
    border-radius: 0;
    background: color-mix(in srgb, var(--color-linen) 4%, transparent);
    transition:
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.3s var(--ease-ribbit);
  }

  .ai-strip__card:hover {
    border-color: color-mix(in srgb, var(--accent-gold) 45%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 8%, transparent);
    transform: translateY(-3px);
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
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    text-transform: none;
    color: color-mix(in srgb, var(--color-linen) 78%, transparent);
  }
</style>
