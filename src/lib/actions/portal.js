/** Monta il nodo in `document.body` (fuori dagli stacking context annidati). */
/** @param {HTMLElement} node */
export function portal(node) {
	document.body.appendChild(node);
	return {
		destroy() {
			node.remove();
		}
	};
}
