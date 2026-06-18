<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import LocaleToggle from '$lib/components/LocaleToggle.svelte';
  import EightLoader from '$lib/components/EightLoader.svelte';
  import { isTalentiSection } from '$lib/data/talents.js';
  import { headerNavLinks, panelNavLinks } from '$lib/data/site-links.js';
  import { previewPoolForHref } from '$lib/data/header-previews.js';
  import { t } from '$lib/i18n';

  let menuOpen = false;
  let shell;
  let activePreviewHref = '/students';
  let previewIndex = 0;
  let previewTimer;
  $: path = $page.url.pathname;
  $: siteTalents = $page.data.talents ?? [];
  $: isHome = path === '/';
  $: menuLinks = panelNavLinks;
  $: currentPreview =
    menuLinks.find((link) => link.href === activePreviewHref) ?? menuLinks[0];
  $: previewSlides = previewPoolForHref(currentPreview?.href ?? '/students');
  $: previewCaption = currentPreview?.previewKey ? $t(currentPreview.previewKey) : '';
  $: if (previewIndex >= previewSlides.length) previewIndex = 0;
  $: if (typeof document !== 'undefined') {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  /** @param {string} href */
  function linkActive(href) {
    if (href === '/students') return isTalentiSection(path, siteTalents);
    if (href === '/mentors') return path === '/mentors' || path.startsWith('/mentors/');
    if (href === '/open-call') return path === '/open-call';
    if (href === '/contact') return path === '/contact';
    const base = href.split('#')[0];
    if (href.includes('#') && path === '/') return true;
    return path === base || path.startsWith(`${base}/`);
  }

  function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) activePreviewHref = path.startsWith('/students/') ? '/students' : path.split('#')[0] || path;
  }

  function closeMenu() {
    menuOpen = false;
  }

  /** @param {MouseEvent} event */
  function onWindowClick(event) {
    if (!menuOpen || !shell) return;
    if (shell.contains(/** @type {Node} */ (event.target))) return;
    closeMenu();
  }

  onMount(() => {
    const desktopNav = window.matchMedia('(min-width: 1080px)');
    const onViewportChange = () => {
      if (desktopNav.matches) closeMenu();
    };
    desktopNav.addEventListener('change', onViewportChange);
    return () => {
      document.body.classList.remove('menu-open');
      clearInterval(previewTimer);
      desktopNav.removeEventListener('change', onViewportChange);
    };
  });

  $: {
    clearInterval(previewTimer);
    if (menuOpen && previewSlides.length > 1) {
      previewTimer = setInterval(() => {
        previewIndex = (previewIndex + 1) % previewSlides.length;
      }, 1700);
    }
  }
</script>

<svelte:window
  on:keydown={(e) => e.key === 'Escape' && closeMenu()}
  on:click={onWindowClick}
/>

<header
  class="site-header"
  class:site-header--open={menuOpen}
  class:site-header--home={isHome}
>
  <div class="site-header__shell" bind:this={shell}>
    <a class="site-header__logo" href="/" aria-label="THE 8th — home">THE 8th</a>
    <nav class="site-header__bar-nav" aria-label="Principale">
      {#each headerNavLinks as link}
        <a
          class="site-header__bar-link"
          class:site-header__bar-link--active={linkActive(link.href)}
          class:site-header__bar-link--cta={link.cta}
          href={link.href}
        >
          {$t(link.key)}
        </a>
      {/each}
    </nav>
    <button
      class="site-header__menu-btn"
      type="button"
      on:click={toggleMenu}
      aria-expanded={menuOpen}
      aria-label={menuOpen ? $t('nav.close') : $t('nav.menu')}
    >
      <span class="site-header__menu-icon" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
    </button>
  </div>

  <aside
    class="site-header__panel"
    class:site-header__panel--open={menuOpen}
    aria-hidden={!menuOpen}
  >
    <div class="site-header__panel-head">
      <p class="site-header__panel-label">{$t('nav.panelNav')}</p>
      <div class="site-header__locale">
        <LocaleToggle onChange={closeMenu} />
      </div>
    </div>
    <div class="site-header__panel-preview" aria-hidden="true">
      {#if previewSlides.length}
        <div class="site-header__panel-carousel">
          {#each previewSlides as src, i}
            <article class="site-header__profile" class:site-header__profile--active={i === previewIndex}>
              <img src={src} alt="" />
            </article>
          {/each}
        </div>
        <div class="site-header__panel-caption">
          <p class="site-header__abstract-kicker">{currentPreview?.previewKicker}</p>
          <p class="site-header__abstract-body">{previewCaption}</p>
        </div>
      {:else}
        <div class="site-header__panel-abstract">
          <p class="site-header__abstract-kicker">{currentPreview?.previewKicker}</p>
          <p class="site-header__abstract-body">{previewCaption}</p>
          <EightLoader compact={true} story={true} section={$t('loading.default')} />
        </div>
      {/if}
    </div>
    <nav class="site-header__nav" aria-label="Principale">
      {#each menuLinks as link (link.key)}
        <a
          class="site-header__link"
          class:site-header__link--active={linkActive(link.href)}
          class:site-header__link--cta={link.cta}
          href={link.href}
          on:mouseenter={() => {
            activePreviewHref = link.href;
            previewIndex = 0;
          }}
          on:focus={() => {
            activePreviewHref = link.href;
            previewIndex = 0;
          }}
          on:click={closeMenu}
        >
          {$t(link.key)}
        </a>
      {/each}
    </nav>
  </aside>
</header>

<style>
  .site-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 200;
    display: flex;
    justify-content: center;
    padding: 0.45rem clamp(0.5rem, 2vw, 0.85rem);
    pointer-events: none;
    background: transparent;
  }

  .site-header__shell {
    --header-bar-bg: rgba(14, 14, 20, 0.36);
    --header-bar-border: rgba(244, 243, 238, 0.14);
    --header-bar-text: #f4f3ee;
    --header-bar-muted: rgba(244, 243, 238, 0.86);
    pointer-events: auto;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.35rem;
    width: auto;
    max-width: calc(100% - 0.5rem);
    padding: 0.5rem 0.65rem 0.5rem 0.5rem;
    color: var(--header-bar-text);
    background: var(--header-bar-bg);
    border: 1px solid var(--header-bar-border);
    border-radius: 0.6rem;
    backdrop-filter: blur(20px) saturate(1.2);
    -webkit-backdrop-filter: blur(20px) saturate(1.2);
    box-shadow:
      0 10px 32px rgba(0, 0, 0, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.07);
    text-shadow: none;
  }

  .site-header--open .site-header__shell {
    border-radius: 0.75rem 0.75rem 0 0;
  }

  .site-header--open .site-header__bar-nav {
    display: none;
  }

  .site-header__logo {
    flex-shrink: 0;
    margin: 0;
    padding: 0.42rem 0.7rem;
    font-family: var(--font-display);
    font-size: clamp(1.15rem, 2.2vw, 1.4rem);
    font-weight: var(--weight-bold);
    letter-spacing: 0.02em;
    text-transform: none;
    text-decoration: none;
    color: #fff;
    background: rgba(0, 0, 0, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.45rem;
    line-height: 1;
  }

  .site-header__menu-btn {
    flex-shrink: 0;
    margin-left: auto;
    border: 1px solid var(--header-bar-border);
    background: rgba(255, 255, 255, 0.08);
    color: var(--header-bar-text);
    border-radius: 999px;
    width: 2.5rem;
    height: 2.5rem;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: border-color 0.2s ease, background 0.2s ease;
  }

  .site-header__menu-btn:hover {
    border-color: rgba(244, 243, 238, 0.35);
    background: rgba(255, 255, 255, 0.14);
  }

  .site-header__menu-icon {
    display: inline-flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .site-header__menu-icon span {
    width: 0.86rem;
    height: 1px;
    background: var(--header-bar-text);
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .site-header__menu-btn[aria-expanded='true'] .site-header__menu-icon span:nth-child(1) {
    transform: translateY(0.29rem) rotate(45deg);
  }

  .site-header__menu-btn[aria-expanded='true'] .site-header__menu-icon span:nth-child(2) {
    opacity: 0;
  }

  .site-header__menu-btn[aria-expanded='true'] .site-header__menu-icon span:nth-child(3) {
    transform: translateY(-0.29rem) rotate(-45deg);
  }

  .site-header__panel {
    pointer-events: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(34rem, 100vw);
    border-radius: 0;
    padding: 1.1rem;
    background: #06060a;
    border-left: 1px solid color-mix(in srgb, var(--color-linen) 12%, transparent);
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    transform: translateX(1.2rem);
    opacity: 0;
    transition: opacity 0.28s ease, transform 0.28s var(--ease-out);
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto;
    gap: 0.95rem;
  }

  .site-header--home .site-header__panel {
    background: #06060a;
  }

  .site-header__panel--open {
    pointer-events: auto;
    opacity: 1;
    transform: translateX(0);
  }

  .site-header__panel--open .site-header__link {
    animation: header-link-in 0.5s var(--ease-ribbit) both;
  }

  .site-header__panel--open .site-header__link:nth-child(1) {
    animation-delay: 0.04s;
  }
  .site-header__panel--open .site-header__link:nth-child(2) {
    animation-delay: 0.08s;
  }
  .site-header__panel--open .site-header__link:nth-child(3) {
    animation-delay: 0.12s;
  }
  .site-header__panel--open .site-header__link:nth-child(4) {
    animation-delay: 0.16s;
  }
  .site-header__panel--open .site-header__link:nth-child(5) {
    animation-delay: 0.2s;
  }
  .site-header__panel--open .site-header__link:nth-child(6) {
    animation-delay: 0.24s;
  }
  .site-header__panel--open .site-header__link:nth-child(7) {
    animation-delay: 0.28s;
  }
  .site-header__panel--open .site-header__link:nth-child(8) {
    animation-delay: 0.32s;
  }

  @keyframes header-link-in {
    from {
      opacity: 0;
      transform: translateX(12px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .site-header__panel--admin {
    width: min(40rem, 100vw);
    grid-template-rows: auto minmax(0, 1fr);
  }

  .site-header__panel-back {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font-size: clamp(0.85rem, 1.4vw, 0.95rem);
    letter-spacing: 0.04em;
    text-transform: none;
    color: color-mix(in srgb, var(--color-linen) 72%, transparent);
    cursor: pointer;
  }

  .site-header__panel-back:hover {
    color: var(--accent-gold);
  }

  .site-header__panel-admin {
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .site-header__link--admin {
    margin-top: 0.35rem;
    text-align: left;
    border: 1px dashed color-mix(in srgb, var(--color-linen) 22%, transparent);
    color: color-mix(in srgb, var(--color-linen) 58%, transparent);
    cursor: pointer;
    font: inherit;
  }

  .site-header__link--admin:hover {
    color: var(--accent-gold);
    border-color: color-mix(in srgb, var(--accent-gold) 40%, transparent);
  }

  .site-header__panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(244, 243, 238, 0.14);
    padding-bottom: 0.75rem;
  }

  .site-header__panel-label {
    margin: 0;
    font-size: clamp(0.85rem, 1.4vw, 0.95rem);
    letter-spacing: 0.04em;
    text-transform: none;
    color: color-mix(in srgb, var(--accent-soft) 80%, transparent);
  }

  .site-header__bar-nav {
    display: none;
    align-items: center;
    gap: 0.05rem;
    margin-left: 0.15rem;
    flex: 0 1 auto;
    min-width: 0;
  }

  .site-header__bar-link {
    padding: 0.45rem 0.75rem;
    font-size: clamp(0.95rem, 1.15vw, 1.1rem);
    font-weight: 500;
    letter-spacing: 0.02em;
    text-transform: none;
    color: var(--header-bar-muted);
    white-space: nowrap;
    transition: color 0.2s ease, background 0.2s ease;
  }

  .site-header__bar-link:hover,
  .site-header__bar-link--active {
    color: var(--header-bar-text);
  }

  .site-header__bar-link--active {
    color: var(--accent-gold);
    font-weight: 600;
  }

  .site-header__bar-link--cta {
    border: 1px solid color-mix(in srgb, var(--accent-gold) 65%, transparent);
    border-radius: 999px;
    padding-inline: 0.85rem;
    color: var(--header-bar-text);
    background: color-mix(in srgb, var(--accent-gold) 12%, transparent);
  }

  .site-header__bar-link--cta:hover,
  .site-header__bar-link--cta.site-header__bar-link--active {
    border-color: var(--accent-gold);
    background: color-mix(in srgb, var(--accent-gold) 22%, transparent);
    color: #fff;
  }

  @media (min-width: 1080px) {
    .site-header__bar-nav {
      display: flex;
    }

    .site-header__menu-btn {
      display: none;
    }

    .site-header__panel {
      display: none;
    }
  }

  .site-header__panel-preview {
    position: relative;
    overflow: hidden;
    border-radius: 0;
    border: 1px solid color-mix(in srgb, var(--color-linen) 14%, transparent);
    background: #0a0a0e;
    aspect-ratio: 16 / 11;
    min-height: 11rem;
    display: grid;
    grid-template-rows: 1fr auto;
    isolation: isolate;
  }

  .site-header__panel-caption {
    position: relative;
    z-index: 2;
    padding: 0.65rem 0.75rem;
    background: #06060a;
  }

  .site-header__panel-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 18%;
    filter: saturate(1.12) contrast(1.05);
  }

  .site-header__panel-carousel {
    position: relative;
    width: 100%;
    min-height: 0;
  }

  .site-header__profile {
    position: absolute;
    inset: 0;
    bottom: 2.5rem;
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  .site-header__profile--active {
    opacity: 1;
  }

  .site-header__profile img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 22%;
  }

  .site-header__panel-abstract {
    width: 100%;
    height: 100%;
    display: grid;
    align-content: center;
    gap: 0.45rem;
    padding: 0.9rem;
    background: #0a0a0e;
  }

  .site-header__abstract-kicker {
    margin: 0;
    font-size: clamp(0.85rem, 1.4vw, 0.95rem);
    letter-spacing: 0.04em;
    text-transform: none;
    color: var(--accent-gold);
  }

  .site-header__abstract-body {
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(1rem, 2vw, 1.15rem);
    text-transform: none;
    line-height: 1.25;
    color: var(--color-linen);
  }

  .site-header__nav {
    display: flex;
    flex-direction: column;
    gap: 0.46rem;
    align-self: end;
    position: relative;
    z-index: 4;
    padding-top: 0.35rem;
    background: #06060a;
  }

  .site-header__link {
    font-family: var(--font-body);
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    font-weight: var(--weight-medium);
    letter-spacing: 0.02em;
    text-transform: none;
    white-space: normal;
    line-height: 1.35;
    color: rgba(244, 243, 238, 0.82);
    transition: color 0.25s var(--ease-out), opacity 0.25s ease;
    padding: 0.58rem 0.72rem;
    border-radius: 0.8rem;
  }

  .site-header__link:hover {
    color: var(--color-linen);
    background: color-mix(in srgb, var(--color-linen) 8%, transparent);
  }

  .site-header__link--active {
    color: var(--accent-gold);
  }

  .site-header__link--cta {
    margin-top: 0.25rem;
    padding: 0.5rem 0.72rem;
    border: 1px solid color-mix(in srgb, var(--accent-gold) 45%, transparent);
    border-radius: 0;
    background: transparent;
    color: var(--color-linen);
  }

  .site-header__link--cta:hover {
    color: var(--color-linen);
    border-color: color-mix(in srgb, var(--accent-gold) 65%, transparent);
    background: color-mix(in srgb, var(--accent-gold) 10%, transparent);
  }

  .site-header__locale {
    flex-shrink: 0;
    --locale-border: rgba(244, 243, 238, 0.28);
    --locale-muted: rgba(244, 243, 238, 0.5);
    --locale-active: var(--color-linen);
  }

  :global(body.menu-open) {
    overflow: hidden;
  }

  @media (max-width: 720px) {
    .site-header__panel {
      width: 100vw;
      padding: 0.95rem;
    }
  }
</style>
