/**
 * Scroll verso un capitolo della home (anchor in-page o step nel percorso sticky).
 * @param {{ type: 'section', sectionId: string } | { type: 'path', pathEl: HTMLElement, stepIndex: number, stepCount: number, pathScrollVh: number }} target
 */
export function scrollToHomeChapter(target) {
	const header =
		parseFloat(
			getComputedStyle(document.documentElement).getPropertyValue('--site-header-offset')
		) || 84;

	if (target.type === 'path') {
		const { pathEl, stepIndex, stepCount, pathScrollVh } = target;
		const n = Math.max(1, stepCount);
		const progress = Math.min(0.98, Math.max(0, (stepIndex + 0.45) / n));
		const viewport = window.innerHeight;
		const total = viewport * pathScrollVh;
		const scrollable = Math.max(0, total - viewport);
		const sectionTop = pathEl.getBoundingClientRect().top + window.scrollY;
		const scrollTarget = sectionTop + progress * scrollable - header * 0.4;
		window.scrollTo({ top: Math.max(0, scrollTarget), behavior: 'smooth' });
		return;
	}

	const el = document.getElementById(target.sectionId);
	if (!el) return;
	const top = el.getBoundingClientRect().top + window.scrollY - header;
	window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}
