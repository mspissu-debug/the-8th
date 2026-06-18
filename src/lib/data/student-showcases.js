/**
 * Showcase studenti — concept · sketch · prodotto finito
 * Percorsi generati da: npm run import:students
 */
import assets from './student-assets.json';

/** @param {string} slug */
function showcase(slug, name, project, skin, pitch, projects) {
  const a = assets[slug];
  return {
    slug,
    name,
    project,
    skin,
    portrait: a.portrait,
    pitch,
    social: { instagram: 'https://instagram.com' },
    concept: a.concept,
    sketch: a.sketch,
    finished: a.finished,
    ...(projects ? { projects } : {})
  };
}

export const elenaShowcase = showcase(
  'elena',
  'Elena Scala',
  'Meta-Florea',
  'florea',
  'Meta-Florea esplora la metamorfosi tra natura e gioiello: forme organiche, materiali vivi e una collezione pensata per la vetrina di Vicenzaoro.'
);

export const flaviaShowcase = showcase(
  'flavia',
  'Flavia Di Stefano',
  'Metamorfosi',
  'metamorfosi',
  'Metamorfosi nasce dal quarzo rutilato e dall’impronta: trasformazione della materia in gioiello, tra schizzo, analisi della forma e pezzo finito in vetrina.'
);

export const royaShowcase = showcase(
  'roya',
  'Roya Ammari',
  'DREAM No. LXXXIII',
  'roya',
  'Dal bismuto (Bi 83) nasce un messaggio onirico: rivalsa, memoria e persona tradotte in gioiello — lontana dall’Iran, dove non c’era spazio per lavorare né per esistere da sé.',
  [
    { slug: 'gate', title: 'The Gate to the Dreams', href: '/students/roya/gate' },
    { slug: 'innovazione', title: 'Innovazione · Bismuto', href: '/students/roya/innovazione' },
    { slug: 'rimozione', title: 'Rimozione', href: '/students/roya/rimozione' }
  ]
);

export const samueleShowcase = showcase(
  'samuele',
  'Samuele Fruet',
  'RITMO',
  'samuele',
  'RITMO — tre atti tra titanio, luce e codice Morse. Al passaggio del mouse sul prodotto finito si rivela la controparte fosforescente.',
  [
    { slug: 'frattali', title: 'Frattali', href: '/students/samuele/frattali' },
    { slug: 'luce', title: 'Luce', href: '/students/samuele/luce' },
    { slug: 'pattern', title: 'Pattern', href: '/students/samuele/pattern' }
  ]
);
