/** @param {number} t */
function smoothstep(t) {
	return t * t * (3 - 2 * t);
}

/**
 * Stato visivo per ogni layer immagine nel percorso 05–08.
 * @param {number} progress 0–1 sull’intera sezione
 * @param {number} stepCount
 */
export function pathImageLayers(progress, stepCount) {
	if (stepCount <= 0) return [];

	const segment = 1 / stepCount;
	const fade = segment * 0.2;

	return Array.from({ length: stepCount }, (_, i) => {
		const start = i * segment;
		const end = (i + 1) * segment;
		const local = Math.min(1, Math.max(0, (progress - start) / segment));

		let opacity = 0;
		if (progress >= start - fade && progress <= end + fade) {
			if (progress < start + fade) {
				opacity = smoothstep((progress - (start - fade)) / (fade * 2));
			} else if (progress > end - fade) {
				opacity = 1 - smoothstep((progress - (end - fade)) / (fade * 2));
			} else {
				opacity = 1;
			}
		}

		const reveal = Math.min(1, local / 0.38);
		const wipeFromLeft = i % 2 === 0;
		const hidden = (1 - reveal) * 100;
		const clip = wipeFromLeft ? `inset(0 ${hidden}% 0 0)` : `inset(0 0 0 ${hidden}%)`;

		const scale = 1.14 - local * 0.1;
		const shiftY = (local - 0.5) * 5;
		const shiftX = wipeFromLeft ? (1 - reveal) * -3 : (1 - reveal) * 3;
		const blur = Math.max(0, (1 - opacity) * 10 + (1 - reveal) * 6);

		return {
			opacity,
			clip,
			scale,
			shiftY,
			shiftX,
			blur,
			zIndex: i + 1,
			local
		};
	});
}

/**
 * @param {number} progress
 * @param {number} stepCount
 */
export function pathSegmentState(progress, stepCount) {
	if (stepCount <= 0) {
		return { index: 0, local: 0, segment: 1 };
	}

	const segment = 1 / stepCount;
	const index = Math.min(stepCount - 1, Math.max(0, Math.floor(progress / segment)));
	const local = Math.min(1, Math.max(0, (progress - index * segment) / segment));

	return { index, local, segment };
}
