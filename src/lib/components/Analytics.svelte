<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	const gaId = import.meta.env.PUBLIC_GA_ID;
	const plausibleDomain = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN;

	let lastPath = '';

	$effect(() => {
		if (!browser) return;
		const path = $page.url.pathname + $page.url.search;
		if (path === lastPath) return;
		lastPath = path;

		if (gaId && typeof window.gtag === 'function') {
			window.gtag('config', gaId, { page_path: path });
		}

		if (plausibleDomain && typeof window.plausible === 'function') {
			window.plausible('pageview', { u: path });
		}
	});
</script>

<svelte:head>
	{#if gaId}
		<script async src="https://www.googletagmanager.com/gtag/js?id={gaId}"></script>
		{@html `
			<script>
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', '${gaId}', { anonymize_ip: true, send_page_view: false });
			</script>
		`}
	{/if}
	{#if plausibleDomain}
		<script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js"></script>
	{/if}
</svelte:head>
