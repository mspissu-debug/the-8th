import { royaImages } from './images.js';

/** @type {Record<string, import('./types.js').ProjectDetail>} */
export const royaProjects = {
  gate: {
    slug: 'gate',
    title: 'The Gate to the Dreams',
    subtitle: 'Macrotema · sogno',
    cover: royaImages.gate.cover,
    concept:
      'Un portale tra industria e immaginario: sketch sovrapposti, moodboard onirici e gioielli che sembrano sospesi in un ambiente subacqueo. La collezione apre il viaggio verso il bismuto come materiale-sogno.',
    processNote:
      'Collage di riferimenti, disegni a matita e fotografie concettuali costruiscono un racconto quasi psicologico.',
    images: royaImages.gate.gallery,
    finished: royaImages.gate.gallery.slice(0, 2),
    specs: {
      Materiale: 'Argento, resine, elementi di bismuto',
      Sezione: 'Dream · Macrotema',
      Concept: 'Portale · sogno · transizione'
    },
    accent: 'dream'
  },
  innovazione: {
    slug: 'innovazione',
    title: 'Innovazione · Bismuto',
    subtitle: 'Bi 83 · cristalli a gradini',
    cover: royaImages.innovazione.cover,
    concept:
      'Il bismuto (numero atomico 83) fuso e raffreddato lentamente forma cristalli cubici a gradini — hopper crystals — con ossido iridescente che riflette lilla, azzurro, oro e magenta secondo l\'angolo. La tesi porta questo metallo dall\'industria all\'alta gioielleria.',
    processNote:
      'Studio della crescita cristallina, prove di fusione controllata e documentazione della trasformazione colore-metallo.',
    images: royaImages.innovazione.gallery,
    finished: royaImages.innovazione.gallery.slice(1, 4),
    specs: {
      Materiale: 'Bismuto puro (Bi)',
      Cristallo: 'Struttura cubica a gradini (hopper)',
      Concept: 'Innovazione · iridescenza · industria → lusso'
    },
    accent: 'bismuth'
  },
  rimozione: {
    slug: 'rimozione',
    title: 'Rimozione',
    subtitle: 'Dream · sottrazione',
    cover: royaImages.rimozione.cover,
    concept:
      'Rimozione lavora per sottrazione: togliere il superfluo per far emergere la forma essenziale del cristallo e del corpo. Gioielli leggeri, quasi frammenti di un sogno che si dissolve.',
    processNote:
      'Modelli in cera perduta, prove di levigatura e fotografie di dettaglio sul processo di “svuotamento” della forma.',
    images: royaImages.rimozione.gallery,
    finished: royaImages.rimozione.gallery.slice(2, 4),
    specs: {
      Materiale: 'Bismuto, argento',
      Sezione: 'Rimozione',
      Concept: 'Sottrazione · essenza · fragilità'
    },
    accent: 'rimozione'
  }
};

export const royaProjectList = Object.values(royaProjects);
