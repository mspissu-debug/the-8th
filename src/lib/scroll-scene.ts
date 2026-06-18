type ScrollSceneOpts = {
	/** Spostamento verticale in px (positivo = scende scrollando) */
	parallaxY?: number;
	/** Scala min → max in base al progresso nella viewport */
	scale?: [number, number];
	/** Opacità min → max */
	opacity?: [number, number];
	/** Ruota in gradi */
	rotate?: [number, number];
};

function progressInViewport(node: HTMLElement): number {
	const rect = node.getBoundingClientRect();
	const vh = window.innerHeight;
	const start = vh * 0.85;
	const end = vh * 0.15;
	const t = (start - rect.top) / (start - end + rect.height * 0.35);
	return Math.max(0, Math.min(1, t));
}

export function scrollScene(node: HTMLElement, opts: ScrollSceneOpts = {}) {
	const { parallaxY = 0, scale, opacity, rotate } = opts;
	let raf = 0;

	const update = () => {
		const p = progressInViewport(node);
		const parts: string[] = [];

		if (parallaxY) {
			parts.push(`translateY(${(0.5 - p) * parallaxY}px)`);
		}
		if (rotate) {
			const deg = rotate[0] + (rotate[1] - rotate[0]) * p;
			parts.push(`rotate(${deg}deg)`);
		}
		if (scale) {
			const s = scale[0] + (scale[1] - scale[0]) * p;
			parts.push(`scale(${s})`);
		}

		if (parts.length) {
			node.style.transform = parts.join(' ');
		}
		if (opacity) {
			node.style.opacity = String(opacity[0] + (opacity[1] - opacity[0]) * p);
		}
		node.style.setProperty('--scene-p', String(p));
	};

	const onScroll = () => {
		cancelAnimationFrame(raf);
		raf = requestAnimationFrame(update);
	};

	update();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll, { passive: true });

	return {
		destroy() {
			cancelAnimationFrame(raf);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		}
	};
}
