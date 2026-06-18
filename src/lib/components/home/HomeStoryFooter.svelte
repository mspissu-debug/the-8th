<script>
  import { talents } from '$lib/data/talents.js';
  import { partners } from '$lib/data/partners.js';
  import { siteLinks, footerExploreLinks } from '$lib/data/site-links.js';
  import LocaleToggle from '$lib/components/LocaleToggle.svelte';
  import { t } from '$lib/i18n';

  /** @type {string} */
  export let bg = '#06060a';

  $: explore = footerExploreLinks.map((link) => ({
    href: link.href,
    label: $t(link.key)
  }));
</script>

<footer class="story-footer" id="home-footer" style="--story-bg: {bg}">
  <div class="story-footer__inner">
    <p class="story-footer__tagline">{$t('footer.tagline')}</p>

    <div class="story-footer__cols">
      <div>
        <p class="story-footer__col-title">{$t('footer.partners')}</p>
        <ul>
          {#each partners as partner}
            <li><a href={partner.href} target="_blank" rel="noopener noreferrer">{partner.name}</a></li>
          {/each}
        </ul>
      </div>
      <div>
        <p class="story-footer__col-title">{$t('footer.explore')}</p>
        <ul>
          {#each explore as link}
            <li><a href={link.href}>{link.label}</a></li>
          {/each}
        </ul>
      </div>
      <div>
        <p class="story-footer__col-title">{$t('footer.talentsEdition')}</p>
        <ul>
          {#each talents as talent}
            <li>
              <a href={talent.href}>{talent.name}</a>
              <span>{talent.project}</span>
            </li>
          {/each}
        </ul>
      </div>
      <div>
        <p class="story-footer__col-title">{$t('footer.social')}</p>
        <ul>
          <li>
            <a href={siteLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </li>
          <li>
            <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </li>
          <li>
            <a href="mailto:{siteLinks.email}">{siteLinks.email}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="story-footer__bar">
      <p>© {new Date().getFullYear()} THE 8th · {$t('footer.rights')}</p>
      <a href="/cookie-policy">Cookie Policy</a>
      <div class="story-footer__locale">
        <LocaleToggle />
      </div>
    </div>
  </div>
</footer>

<style>
  .story-footer {
    background: var(--story-bg);
    color: color-mix(in srgb, var(--color-linen) 88%, transparent);
    padding: clamp(4rem, 10vh, 5.5rem) var(--editorial-pad)
      calc(2.5rem + var(--persistent-cta-safe, 0px));
    scroll-margin-top: 2rem;
    border-top: 1px solid color-mix(in srgb, var(--color-linen) 10%, transparent);
  }

  .story-footer__inner {
    max-width: var(--editorial-max);
    margin: 0 auto;
  }

  .story-footer__tagline {
    margin: 0 0 2rem;
    font-family: var(--font-display);
    font-size: clamp(1rem, 2.2vw, 1.35rem);
    letter-spacing: 0.02em;
    text-transform: uppercase;
    max-width: 28ch;
    line-height: 1.2;
    color: var(--color-linen);
  }

  .story-footer__cols {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 900px) {
    .story-footer__cols {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .story-footer__col-title {
    margin: 0 0 0.55rem;
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.45;
  }

  .story-footer ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .story-footer li {
    margin-bottom: 0.4rem;
  }

  .story-footer a {
    font-size: 0.78rem;
    letter-spacing: 0.04em;
    transition: color 0.2s ease;
  }

  .story-footer a:hover {
    color: var(--color-linen);
  }

  .story-footer li span {
    display: block;
    font-size: 0.62rem;
    opacity: 0.45;
    margin-top: 0.1rem;
  }

  .story-footer__bar {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid color-mix(in srgb, var(--color-linen) 10%, transparent);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1.25rem;
    font-size: 0.65rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    opacity: 0.55;
  }

  .story-footer__locale {
    --locale-border: color-mix(in srgb, var(--color-linen) 25%, transparent);
    --locale-muted: color-mix(in srgb, var(--color-linen) 45%, transparent);
    --locale-active: var(--color-linen);
  }
</style>
