export type RevealVariant =
	| 'clip-up'
	| 'clip-down'
	| 'clip-left'
	| 'clip-right'
	| 'blur'
	| 'scale'
	| 'fade'
	| 'rotate-in'
	| 'skew-in';

type RevealOpts = {
	threshold?: number;
	rootMargin?: string;
	onInView?: () => void;
	variant?: RevealVariant;
	/** Se true, l'animazione può ripetersi uscendo e rientrando in viewport */
	repeat?: boolean;
};

export function reveal(node: HTMLElement, opts: RevealOpts = {}) {
	const { threshold = 0.12, rootMargin = '0px', onInView, variant = 'clip-up', repeat = false } =
		opts;
	let done = false;

	node.classList.add('motion-pending', `motion--${variant}`);

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					if (!done || repeat) {
						done = true;
						node.classList.remove('motion-pending');
						node.classList.add('motion-done');
						onInView?.();
					}
				} else if (repeat && done) {
					done = false;
					node.classList.add('motion-pending');
					node.classList.remove('motion-done');
				}
			}
		},
		{ threshold, rootMargin }
	);

	observer.observe(node);
	return {
		destroy() {
			observer.disconnect();
		}
	};
}

/** Attiva figli `[data-stagger]` in sequenza quando il contenitore entra in viewport */
export function revealStagger(
	node: HTMLElement,
	opts: { threshold?: number; stepMs?: number; baseDelayMs?: number } = {}
) {
	const { threshold = 0.1, stepMs = 90, baseDelayMs = 0 } = opts;
	let done = false;

	const items = () =>
		Array.from(node.querySelectorAll<HTMLElement>('[data-stagger]'));

	const reset = () => {
		for (const el of items()) {
			el.classList.remove('stagger-in');
		}
	};

	const play = () => {
		items().forEach((el, i) => {
			setTimeout(() => el.classList.add('stagger-in'), baseDelayMs + i * stepMs);
		});
	};

	node.classList.add('stagger-group');

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting && !done) {
					done = true;
					play();
				}
			}
		},
		{ threshold }
	);

	observer.observe(node);
	return {
		destroy() {
			observer.disconnect();
			reset();
		}
	};
}
