<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { loadSiteConfig } from '$lib/config/store';

	$effect(() => {
		if (!browser) return;
		const path = $page.url.pathname;
		const cfg = loadSiteConfig();

		const studentMatch = path.match(/^\/students\/(\d)/);
		if (studentMatch) {
			const s = cfg.students[studentMatch[1]] ?? cfg.students['1'];
			document.documentElement.style.setProperty('--page-accent', s.accent);
			document.documentElement.dataset.studentBand = s.heroBand;
			document.documentElement.dataset.studentRings = s.showRings ? '1' : '0';
			document.documentElement.dataset.studentTitle = s.titleSize;
			return;
		}

		if (path.startsWith('/editions/previous')) {
			const e = cfg.editions.previous;
			document.documentElement.style.setProperty('--page-accent', e.accent);
			document.documentElement.dataset.editionBand = e.heroBand;
			document.documentElement.dataset.editionGallery = String(e.galleryColumns);
			return;
		}

		if (path.startsWith('/editions/september')) {
			const e = cfg.editions.september;
			document.documentElement.style.setProperty('--page-accent', e.accent);
			document.documentElement.dataset.editionBand = e.heroBand;
			document.documentElement.dataset.editionGallery = String(e.galleryColumns);
			return;
		}

		document.documentElement.style.removeProperty('--page-accent');
		delete document.documentElement.dataset.studentBand;
		delete document.documentElement.dataset.studentRings;
		delete document.documentElement.dataset.studentTitle;
		delete document.documentElement.dataset.editionBand;
		delete document.documentElement.dataset.editionGallery;
	});
</script>
