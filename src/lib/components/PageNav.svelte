<script>
  /** @type {{ href?: string, label: string }[]} */
  export let crumbs = [];

  /** @type {{ href: string, label: string, hint?: string } | null} */
  export let back = null;

  /** @type {'default' | 'story'} */
  export let variant = 'default';
</script>

<nav class="page-nav" class:page-nav--story={variant === 'story'} aria-label="Percorso e ritorno">
  {#if crumbs.length}
    <ol class="page-nav__crumbs">
      {#each crumbs as crumb}
        <li class="page-nav__crumb">
          {#if crumb.href}
            <a class="page-nav__crumb-link" href={crumb.href}>{crumb.label}</a>
          {:else}
            <span class="page-nav__crumb-current" aria-current="page">{crumb.label}</span>
          {/if}
        </li>
      {/each}
    </ol>
  {/if}

  {#if back}
    <a class="page-nav__back" href={back.href}>
      <span class="page-nav__back-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="page-nav__back-body">
        <span class="page-nav__back-label">{back.label}</span>
        {#if back.hint}
          <span class="page-nav__back-hint">{back.hint}</span>
        {/if}
      </span>
    </a>
  {/if}
</nav>

<style>
  .page-nav {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: calc(4.25rem + 0.5rem) var(--editorial-pad) 0.85rem;
  }

  .page-nav__crumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.35rem 0;
    list-style: none;
    margin: 0 0 0.85rem;
    padding: 0;
    font-size: var(--editorial-eyebrow);
    letter-spacing: 0.08em;
    color: var(--text-subtle);
  }

  .page-nav__crumb {
    display: flex;
    align-items: center;
  }

  .page-nav__crumb:not(:last-child)::after {
    content: '/';
    margin: 0 0.4rem;
    opacity: 0.4;
    pointer-events: none;
  }

  .page-nav__crumb-link {
    color: var(--text-muted);
    transition: color 0.2s ease;
  }

  .page-nav__crumb-link:hover {
    color: var(--text);
  }

  .page-nav__crumb-current {
    color: var(--text);
    font-weight: var(--weight-medium);
  }

  .page-nav__back {
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    max-width: min(36rem, 100%);
    padding: 0.65rem 1rem 0.65rem 0.7rem;
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-xl);
    background:
      radial-gradient(circle at 14% 24%, color-mix(in srgb, var(--accent-gold) 24%, transparent) 0%, transparent 52%),
      color-mix(in srgb, var(--bg-elevated) 86%, var(--accent-ink) 14%);
    color: var(--text);
    box-shadow: var(--shadow-soft);
    transition:
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.25s var(--ease-out);
  }

  .page-nav__back:hover {
    border-color: color-mix(in srgb, var(--accent-soft) 65%, var(--accent-gold));
    background:
      radial-gradient(circle at 14% 24%, color-mix(in srgb, var(--accent-highlight) 22%, transparent) 0%, transparent 52%),
      color-mix(in srgb, var(--bg-soft) 84%, var(--accent-ink) 16%);
    transform: translateX(-2px);
  }

  .page-nav__back-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 1.85rem;
    height: 1.85rem;
    border-radius: 50%;
    background: color-mix(in srgb, var(--text) 6%, transparent);
    color: var(--text-muted);
    transition: color 0.2s ease, background 0.2s ease;
  }

  .page-nav__back:hover .page-nav__back-icon {
    color: var(--text);
    background: color-mix(in srgb, var(--accent-highlight) 16%, transparent);
  }

  .page-nav__back-body {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }

  .page-nav__back-label {
    font-size: clamp(0.9rem, 1.8vw, 1rem);
    font-weight: var(--weight-medium);
    line-height: 1.3;
    letter-spacing: 0.01em;
  }

  .page-nav__back-hint {
    font-size: var(--editorial-eyebrow);
    line-height: 1.4;
    color: var(--text-subtle);
  }

  .page-nav--story .page-nav__crumbs {
    color: color-mix(in srgb, var(--color-linen) 42%, transparent);
  }

  .page-nav--story .page-nav__crumb-link {
    color: color-mix(in srgb, var(--color-linen) 58%, transparent);
  }

  .page-nav--story .page-nav__crumb-link:hover {
    color: color-mix(in srgb, var(--accent-gold) 88%, var(--color-linen));
  }

  .page-nav--story .page-nav__crumb-current {
    color: var(--color-linen);
    font-weight: var(--weight-medium);
  }

  .page-nav--story .page-nav__back {
    gap: 0.5rem;
    padding: 0.5rem 0.95rem 0.5rem 0.55rem;
    border: 1px solid color-mix(in srgb, var(--color-linen) 22%, transparent);
    border-radius: 999px;
    background: color-mix(in srgb, var(--color-linen) 4%, transparent);
    box-shadow: none;
    color: var(--color-linen);
    transition:
      border-color 0.25s ease,
      background 0.25s ease,
      transform 0.3s var(--ease-ribbit);
  }

  .page-nav--story .page-nav__back:hover {
    border-color: color-mix(in srgb, var(--accent-gold) 52%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 10%, transparent);
    transform: translateX(-3px);
  }

  .page-nav--story .page-nav__back-icon {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 0;
    background: transparent;
    color: color-mix(in srgb, var(--accent-gold) 85%, var(--color-linen));
  }

  .page-nav--story .page-nav__back-label {
    font-family: var(--font-body, var(--font-mono));
    font-size: clamp(0.9rem, 1.5vw, 1rem);
    font-weight: var(--weight-medium);
    letter-spacing: 0.02em;
    text-transform: none;
    line-height: 1.25;
  }

  .page-nav--story .page-nav__back-hint {
    font-size: 0.58rem;
    letter-spacing: 0.04em;
    line-height: 1.35;
    color: color-mix(in srgb, var(--color-linen) 46%, transparent);
  }
</style>
