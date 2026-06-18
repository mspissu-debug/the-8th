import { samueleImages } from './images.js';

/** @typedef {import('./types.js').ProjectDetail} ProjectDetail */

/** @type {Record<string, ProjectDetail>} */
export const samueleProjects = {
  frattali: {
    slug: 'frattali',
    title: 'Frattali',
    subtitle: 'Atto I · Oreficeria in titanio',
    cover: samueleImages.frattali.cover,
    concept:
      'Il primo atto di RITMO traduce la geometria frattale in linguaggio produttivo: ogni ripetizione modulare sul titanio riduce i tempi di lavorazione senza perdere precisione decorativa. Il gioiello diventa ritmo industriale reso visibile.',
    processNote:
      'Render 3D, griglie di punti e prove di fresatura guidano un processo dove forma e ciclo produttivo coincidono.',
    images: samueleImages.frattali.gallery,
    finished: samueleImages.frattali.gallery.slice(0, 2),
    specs: {
      Materiale: 'Titanio grado gioiello',
      Tecnica: 'CAD/CAM, fresatura di precisione',
      Concept: 'Frattali · ritmo produttivo'
    },
    accent: 'frattali'
  },
  luce: {
    slug: 'luce',
    title: 'Luce',
    subtitle: 'Atto II · Alta gioielleria',
    cover: samueleImages.luce.cover,
    concept:
      'Luce esplora le onde luminose come motivo ornamentale: superfici che catturano e rilanciano la luce in modo diverso a ogni angolazione, in continuità con la ricerca su materiali ad alta riflettività.',
    processNote:
      'Prove su leghe lucide, mock-up di incastonatura e studi di luce guidano la composizione delle collezioni.',
    images: samueleImages.luce.gallery,
    finished: samueleImages.luce.gallery.slice(1, 3),
    specs: {
      Materiale: 'Oro bianco, pietre di taglio brillante',
      Tecnica: 'Incastonatura, lucidatura speculare',
      Concept: 'Onde · riflessi · ritmo visivo'
    },
    accent: 'luce'
  },
  pattern: {
    slug: 'pattern',
    title: 'Pattern',
    subtitle: 'Atto III · Gioielleria · Code',
    cover: samueleImages.pattern.cover,
    concept:
      '«Un ritmo regolare con un segreto da nascondere.» Il bracciale tennis usa diamanti fluorescenti e opalescenti come alfabeti luminosi: in luce UV il messaggio in codice Morse emerge; a occhio nudo resta solo eleganza e ritmo.',
    processNote:
      'Selezione di diamanti con risposta UV, layout del messaggio e prove di fluorescenza sotto lampada nera.',
    images: samueleImages.pattern.gallery,
    finished: samueleImages.pattern.gallery.slice(0, 3),
    specs: {
      Materiale: 'Oro, diamanti fluorescenti / opalescenti',
      Messaggio: 'Codice Morse (UV-reactive)',
      Concept: 'Pattern · segreto · luce nera'
    },
    accent: 'pattern',
    morse: {
      encoded: '·−· ·· − −− −−−',
      decoded: 'RITMO',
      hint: 'I diamanti fluorescenti e opalescenti del bracciale nascondono un codice Morse: visibile solo sotto luce UV, come in vetrina.'
    }
  }
};

export const samueleProjectList = Object.values(samueleProjects);
