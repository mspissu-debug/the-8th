# The 8 — Ibrido Matteo × Michele

Unione della proposta **Matteo** (`THE 8/THE8`) e **Michele** (`the8-proposta-02`).

## Cosa usa chi

| Elemento | Fonte |
|----------|--------|
| Storytelling home (scroll, capitoli) | Matteo — `HomeStory` |
| Animazioni pagine interne | Michele — `reveal`, `page-motion`, grafiche |
| Immagini statiche | Matteo — cartella `static/` |
| Navbar | Matteo — `SiteHeader` |
| Font (priorità) | Michele — Space Grotesk + IBM Plex Mono |
| Sezione mentor (layout/UX) | Michele — `/mentors` |
| Admin | Michele — `/admin` |
| Palette coesa | Bridge CSS — `hybrid-bridge.css` |

## Avvio

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Note

- Route principali: `/`, `/mentors`, `/students`, `/editions/*`, `/contact`, `/admin`
- La home usa il racconto scroll di Matteo; le pagine interne mantengono il sistema motion di Michele.
