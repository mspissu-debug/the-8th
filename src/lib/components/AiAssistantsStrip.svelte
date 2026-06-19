<script>
  import { aiAssistants, copyAiPrompt, getAiAssistantPrompt } from '$lib/data/ai-assistants.js';
  import { locale, t } from '$lib/i18n';

  /** @type {string} */
  export let bg = '#06060a';

  /** @type {string | null} */
  let copiedId = null;

  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let copiedTimer;

  $: prompt = getAiAssistantPrompt($locale);
  $: links = aiAssistants.map((assistant) => ({
    ...assistant,
    href: assistant.buildUrl(prompt)
  }));

  /** @param {MouseEvent} event @param {typeof links[number]} assistant */
  function handleClick(event, assistant) {
    if (assistant.prefill !== 'clipboard') return;

    event.preventDefault();
    window.open(assistant.href, '_blank', 'noopener,noreferrer');

    void copyAiPrompt(prompt).then((copied) => {
      if (!copied) return;

      copiedId = assistant.id;
      clearTimeout(copiedTimer);
      copiedTimer = setTimeout(() => {
        copiedId = null;
      }, 3200);
    });
  }
</script>

<section class="ai-strip" style="--story-bg: {bg}" aria-label={$t('aiAssistants.aria')}>
  <div class="ai-strip__inner">
    <div class="ai-strip__copy">
      <p class="ai-strip__eyebrow">{$t('aiAssistants.eyebrow')}</p>
      <p class="ai-strip__title">{$t('aiAssistants.title')}</p>
      <p class="ai-strip__lede">{$t('aiAssistants.lede')}</p>
    </div>

    <ul class="ai-strip__grid">
      {#each links as assistant (assistant.id)}
        <li>
          <a
            class="ai-strip__card"
            class:ai-strip__card--copied={copiedId === assistant.id}
            href={assistant.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={$t('aiAssistants.openIn').replace('{name}', assistant.name)}
            on:click={(event) => handleClick(event, assistant)}
          >
            <span class="ai-strip__icon" aria-hidden="true">
              <img src={assistant.icon} alt="" width="32" height="32" loading="lazy" decoding="async" />
            </span>
            <span class="ai-strip__name">{assistant.name}</span>
            {#if assistant.prefill === 'clipboard'}
              <span class="ai-strip__hint">{$t('aiAssistants.copyHint')}</span>
            {/if}
            {#if copiedId === assistant.id}
              <span class="ai-strip__copied" role="status">{$t('aiAssistants.copied')}</span>
            {/if}
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

  @media (min-width: 768px) {
    .ai-strip__inner {
      grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
      gap: 2.5rem;
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

  .ai-strip__grid {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  @media (min-width: 520px) {
    .ai-strip__grid {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .ai-strip__card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    min-height: 5.5rem;
    padding: 0.9rem 0.65rem 0.75rem;
    border: 1px solid color-mix(in srgb, var(--color-linen) 14%, transparent);
    border-radius: 0.65rem;
    background: color-mix(in srgb, var(--color-linen) 4%, transparent);
    transition:
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.25s ease;
  }

  .ai-strip__card:hover,
  .ai-strip__card--copied {
    border-color: color-mix(in srgb, var(--accent-gold) 45%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 8%, transparent);
  }

  .ai-strip__card:hover {
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

  .ai-strip__hint {
    font-size: 0.52rem;
    letter-spacing: 0.04em;
    line-height: 1.3;
    text-align: center;
    color: color-mix(in srgb, var(--color-linen) 40%, transparent);
  }

  .ai-strip__copied {
    position: absolute;
    inset: auto 0.45rem 0.45rem;
    padding: 0.25rem 0.35rem;
    border-radius: 0.35rem;
    font-size: 0.52rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-align: center;
    color: var(--color-linen);
    background: color-mix(in srgb, var(--accent-gold) 22%, #06060a);
  }
</style>
