<script lang="ts">
	import { page } from '$app/stores';
	import GraphicOrbit from '$lib/components/graphics/GraphicOrbit.svelte';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	import { messages } from '$lib/i18n';

	let menuOpen = $state(false);
	let scrolled = $state(false);
	let hidden = $state(false);
	let active = $state('');
	let progress = $state(0);
	let lastY = 0;

	const links = $derived([
		{ href: '/#progetto', label: $messages.nav.home, id: 'progetto' },
		{ href: '/about', label: $messages.nav.about, id: 'about' },
		{ href: '/mentors', label: $messages.nav.mentors, id: 'mentors' },
		{ href: '/students', label: $messages.nav.students, id: 'students' },
		{ href: '/#edizioni', label: $messages.nav.work, id: 'edizioni' },
		{ href: '/contact', label: $messages.nav.contact, id: 'contact' }
	]);

	const mobileExtra = $derived([
		{ href: '/editions/previous', label: $messages.editions.previous },
		{ href: '/editions/september', label: $messages.editions.september }
	]);

	let onHome = $derived($page.url.pathname === '/');

	const resolveHref = (href: string) => {
		if (href.startsWith('/#')) return onHome ? href.slice(1) : href;
		if (href.startsWith('#')) return onHome ? href : `/${href}`;
		return href;
	};

	$effect(() => {
		document.body.style.overflow = menuOpen ? 'hidden' : '';
	});

	$effect(() => {
		const onScroll = () => {
			const y = window.scrollY;
			scrolled = y > 48;
			hidden = y > 120 && y > lastY && !menuOpen;
			lastY = y;

			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 0 ? (y / max) * 100 : 0;

			if (!onHome) {
				active = '';
				return;
			}

			const ids = ['hero', 'progetto', 'manifesto', 'storia', 'narrativa', 'galleria', 'edizioni', 'mentori', 'contatti'];
			let current = 'hero';
			for (const id of ids) {
				const el = document.getElementById(id);
				if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
					current = id;
				}
			}

			const map: Record<string, string> = {
				hero: '/#progetto',
				progetto: '/#progetto',
				manifesto: '/#manifesto',
				storia: '/#storia',
				narrativa: '/#storia',
				galleria: '/#edizioni',
				edizioni: '/#edizioni',
				mentori: '/mentors',
				studenti: '/students',
				contatti: '/contact'
			};
			active = map[current] ?? '';
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener('scroll', onScroll);
	});

	const closeMenu = () => {
		menuOpen = false;
	};
</script>

<header
	class="navbar"
	class:navbar--scrolled={scrolled}
	class:navbar--hidden={hidden}
	class:navbar--open={menuOpen}
>
	<div class="navbar__progress" aria-hidden="true" style="transform: scaleX({progress / 100})"></div>

	<div class="navbar__inner">
		<a href="/" class="navbar__logo" onclick={closeMenu}>
			<span class="navbar__logo-text">The</span>
			<span class="navbar__logo-eight">
				<span class="navbar__logo-orbit" aria-hidden="true">
					<GraphicOrbit size={28} />
				</span>
				8
			</span>
		</a>

		<nav class="navbar__nav" aria-label="Principale">
			{#each links as link, i (link.href)}
				<a
					href={resolveHref(link.href)}
					class="navbar__link"
					class:navbar__link--active={active === link.href}
					style="--i: {i}"
					onclick={closeMenu}
				>
					<span class="navbar__link-track">
						<span>{link.label}</span>
						<span aria-hidden="true">{link.label}</span>
					</span>
					<span class="navbar__link-dot" aria-hidden="true"></span>
				</a>
			{/each}
		</nav>

		<LocaleSwitcher />

		<button
			type="button"
			class="navbar__toggle"
			aria-expanded={menuOpen}
			aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span class="navbar__toggle-lines">
				<span class="navbar__toggle-line"></span>
				<span class="navbar__toggle-line"></span>
			</span>
			<span class="navbar__toggle-label">{menuOpen ? 'Close' : $messages.nav.menu}</span>
		</button>
	</div>

	<div class="navbar__mobile" class:navbar__mobile--open={menuOpen} aria-hidden={!menuOpen}>
		<div class="navbar__mobile-bg" aria-hidden="true"></div>
		<nav class="navbar__mobile-nav" aria-label="Mobile">
			{#each links as link, i (link.href)}
				<a
					href={resolveHref(link.href)}
					class="navbar__mobile-link"
					style="--i: {i}"
					onclick={closeMenu}
				>
					<span class="navbar__mobile-num">0{i + 1}</span>
					<span class="navbar__mobile-label">{link.label}</span>
				</a>
			{/each}
			{#each mobileExtra as extra, j (extra.href)}
				<a
					href={extra.href}
					class="navbar__mobile-link navbar__mobile-link--sub"
					style="--i: {links.length + j}"
					onclick={closeMenu}
				>
					<span class="navbar__mobile-label">{extra.label}</span>
				</a>
			{/each}
			<a href="/contact" class="navbar__mobile-cta" style="--i: 8" onclick={closeMenu}>
				{$messages.nav.contact} →
			</a>
		</nav>
	</div>
</header>

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 180;
		padding: 1.25rem clamp(1.25rem, 4vw, 2.5rem);
		transition:
			transform 0.45s var(--ease),
			padding 0.4s var(--ease),
			background 0.4s var(--ease);
	}

	.navbar--hidden:not(.navbar--open) {
		transform: translateY(-110%);
	}

	.navbar--scrolled {
		padding-top: 0.85rem;
		padding-bottom: 0.85rem;
		background: color-mix(in srgb, var(--white) 82%, transparent);
		backdrop-filter: blur(14px);
		-webkit-backdrop-filter: blur(14px);
		border-bottom: 1px solid var(--line);
	}

	.navbar__logo-eight {
		position: relative;
		color: var(--indigo);
		padding-left: 0.15rem;
		background: linear-gradient(135deg, var(--indigo), var(--grape));
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.navbar__progress {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, var(--indigo), var(--grape), var(--sky), var(--indigo));
		transform-origin: left;
		transform: scaleX(0);
		transition: transform 0.08s linear;
	}

	.navbar__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		max-width: 1240px;
		margin-inline: auto;
		padding-left: clamp(5rem, 11vw, 6.5rem);
	}

	@media (max-width: 800px) {
		.navbar__inner {
			padding-left: 0;
		}
	}

	.navbar__logo {
		display: flex;
		align-items: baseline;
		gap: 0.35rem;
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1rem;
		letter-spacing: -0.03em;
		text-transform: uppercase;
		position: relative;
		z-index: 2;
		transition: letter-spacing 0.4s var(--ease);
	}

	.navbar__logo:hover {
		letter-spacing: 0.04em;
	}

	.navbar__logo-text {
		opacity: 0.85;
	}

	.navbar__logo-orbit {
		position: absolute;
		left: -0.65rem;
		top: 50%;
		transform: translateY(-50%);
		opacity: 0;
		transition: opacity 0.35s var(--ease);
	}

	.navbar__logo:hover .navbar__logo-orbit {
		opacity: 0.75;
	}

	.navbar__nav {
		display: flex;
		align-items: center;
		gap: clamp(1.25rem, 3vw, 2.25rem);
		font-size: 0.55rem;
		letter-spacing: 0.32em;
	}

	.navbar__link {
		position: relative;
		display: block;
		overflow: hidden;
		padding: 0.25rem 0;
		color: var(--fg-muted);
		transition: color 0.3s var(--ease);
	}

	.navbar__link-track {
		display: flex;
		flex-direction: column;
		transition: transform 0.45s var(--ease);
	}

	.navbar__link-track span:last-child {
		color: var(--indigo);
	}

	.navbar__link:hover .navbar__link-track,
	.navbar__link--active .navbar__link-track {
		transform: translateY(-50%);
	}

	.navbar__link:hover,
	.navbar__link--active {
		color: var(--fg);
	}

	.navbar__link-dot {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--indigo);
		transform: scale(0);
		transition: transform 0.35s var(--ease);
	}

	.navbar__link--active .navbar__link-dot {
		transform: scale(1);
	}

	.navbar__toggle {
		display: none;
		align-items: center;
		gap: 0.65rem;
		font-size: 0.55rem;
		letter-spacing: 0.28em;
		position: relative;
		z-index: 2;
		color: var(--fg);
	}

	.navbar__toggle-lines {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 22px;
		height: 16px;
	}

	.navbar__toggle-line {
		display: block;
		height: 1.5px;
		background: currentColor;
		transition:
			transform 0.4s var(--ease),
			opacity 0.3s var(--ease);
		transform-origin: center;
	}

	.navbar--open .navbar__toggle-line:first-child {
		transform: translateY(3.25px) rotate(45deg);
	}

	.navbar--open .navbar__toggle-line:last-child {
		transform: translateY(-3.25px) rotate(-45deg);
	}

	.navbar__mobile {
		position: fixed;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		visibility: hidden;
	}

	.navbar__mobile--open {
		pointer-events: auto;
		visibility: visible;
	}

	.navbar__mobile-bg {
		position: absolute;
		inset: 0;
		background: var(--black);
		clip-path: inset(0 0 100% 0);
		transition: clip-path 0.55s var(--ease);
	}

	.navbar__mobile--open .navbar__mobile-bg {
		clip-path: inset(0 0 0 0);
	}

	.navbar__mobile-nav {
		position: relative;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
		padding: 6rem 2rem;
	}

	.navbar__mobile-link {
		display: flex;
		align-items: baseline;
		gap: 1.25rem;
		font-family: var(--font-display);
		font-size: clamp(2rem, 8vw, 3.5rem);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: -0.03em;
		color: var(--white);
		opacity: 0;
		transform: translateY(24px);
		transition:
			opacity 0.5s var(--ease),
			transform 0.5s var(--ease),
			color 0.3s;
		transition-delay: calc(var(--i) * 0.07s + 0.15s);
	}

	.navbar__mobile--open .navbar__mobile-link {
		opacity: 1;
		transform: translateY(0);
	}

	.navbar__mobile-link:hover {
		color: var(--sky);
	}

	.navbar__mobile-num {
		font-family: var(--font-body);
		font-size: 0.55rem;
		letter-spacing: 0.35em;
		color: var(--grape);
	}

	.navbar__mobile-cta {
		margin-top: 2rem;
		font-size: 0.58rem;
		letter-spacing: 0.35em;
		padding: 1rem 2rem;
		border: 1px solid color-mix(in srgb, var(--white) 35%, transparent);
		color: var(--white);
		opacity: 0;
		transform: translateY(16px);
		transition:
			opacity 0.5s var(--ease),
			transform 0.5s var(--ease),
			background 0.3s,
			color 0.3s;
		transition-delay: calc(var(--i) * 0.07s + 0.15s);
	}

	.navbar__mobile--open .navbar__mobile-cta {
		opacity: 1;
		transform: translateY(0);
	}

	.navbar__mobile-cta:hover {
		background: var(--white);
		color: var(--black);
	}

	@media (max-width: 800px) {
		.navbar__nav {
			display: none;
		}

		.navbar__toggle {
			display: flex;
		}

		.navbar--open.navbar--scrolled {
			background: transparent;
			border-bottom-color: transparent;
			backdrop-filter: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.navbar,
		.navbar__link-track,
		.navbar__mobile-bg,
		.navbar__mobile-link,
		.navbar__toggle-line {
			transition: none;
		}

		.navbar--hidden:not(.navbar--open) {
			transform: none;
		}
	}
</style>
