<script>
  import { page } from '$app/stores';
  import { talents as builtinTalents } from '$lib/data/talents.js';
  import { partners } from '$lib/data/partners.js';
  import { siteLinks, footerExploreLinks } from '$lib/data/site-links.js';
  import AiAssistantsStrip from '$lib/components/AiAssistantsStrip.svelte';
  import LocaleToggle from '$lib/components/LocaleToggle.svelte';
  import MotionIgniteWords from '$lib/components/MotionIgniteWords.svelte';
  import { t } from '$lib/i18n';

  /** @type {string} */
  export let bg = '#06060a';

  /** @deprecated Ignored — footer is always full viewport width. */
  export let wide = false;

  $: talentList = $page.data.talents?.length ? $page.data.talents : builtinTalents;

  $: explore = footerExploreLinks.map((link) => ({
    href: link.href,
    label: $t(link.key)
  }));
</script>

<AiAssistantsStrip {bg} {wide} />

<footer class="story-footer" id="home-footer" style="--story-bg: {bg}">
  <div class="story-footer__inner">
    <MotionIgniteWords
      as="p"
      className="story-footer__tagline"
      text={$t('footer.tagline')}
      delay={40}
    />

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
          {#each talentList as talent}
            <li>
              <a href={talent.href ?? `/students/${talent.slug}`}>{talent.name}</a>
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
      <a href="/llms.txt">{$t('footer.llms')}</a>
      <a href="/cookie-policy">Cookie Policy</a>
      <div class="story-footer__locale">
        <LocaleToggle />
      </div>
    </div>
  </div>
</footer>

<style>
  .story-footer {
    width: 100%;
    background: var(--story-bg);
    color: color-mix(in srgb, var(--color-linen) 88%, transparent);
    padding: clamp(4rem, 10vh, 5.5rem) var(--editorial-pad)
      calc(2.5rem + var(--persistent-cta-safe, 0px));
    scroll-margin-top: 2rem;
    border-top: 1px solid color-mix(in srgb, var(--color-linen) 8%, transparent);
  }

  .story-footer__inner {
    width: 100%;
    max-width: none;
    margin-inline: 0;
  }

  .story-footer :global(.story-footer__tagline) {
    margin: 0 0 clamp(2rem, 5vh, 2.75rem);
    max-width: min(22ch, 92vw);
    line-height: 1.12;
    letter-spacing: -0.02em;
    text-transform: none;
    color: var(--color-linen);
  }

  .story-footer__cols {
    display: grid;
    gap: clamp(1.5rem, 4vw, 2.25rem);
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
  }

  @media (min-width: 900px) {
    .story-footer__cols {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }

  .story-footer__col-title {
    margin: 0 0 0.65rem;
    letter-spacing: 0.04em;
    text-transform: none;
  }

  .story-footer ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .story-footer li {
    margin-bottom: 0.45rem;
  }

  .story-footer a {
    font-size: var(--type-link);
    letter-spacing: 0.02em;
    text-transform: none;
    transition: color 0.2s ease;
  }

  .story-footer a:hover {
    color: var(--color-linen);
  }

  .story-footer li span {
    display: block;
    font-size: var(--type-label);
    opacity: 0.45;
    margin-top: 0.12rem;
    letter-spacing: 0.02em;
  }

  .story-footer__bar {
    margin-top: clamp(2rem, 5vh, 2.75rem);
    padding-top: 1rem;
    border-top: 1px solid color-mix(in srgb, var(--color-linen) 10%, transparent);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1.25rem;
    font-size: var(--type-label);
    letter-spacing: 0.04em;
    text-transform: none;
    opacity: 0.55;
    width: 100%;
  }

  .story-footer__locale {
    --locale-border: color-mix(in srgb, var(--color-linen) 25%, transparent);
    --locale-muted: color-mix(in srgb, var(--color-linen) 45%, transparent);
    --locale-active: var(--color-linen);
  }
</style>
