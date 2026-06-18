import { samueleImages, royaImages } from './images.js';
import { samueleProjects } from './samuele-projects.js';
import { royaProjects } from './roya-projects.js';

export const samuele = {
  name: 'Samuele Fruet',
  project: 'RITMO',
  bio: 'Tre atti — Frattali, Luce, Pattern — dove il ritmo guida titanio, onde luminose e un bracciale con diamanti fluorescenti che nascondono un messaggio in codice Morse.',
  portrait: samueleImages.portrait,
  social: { instagram: 'https://instagram.com' },
  projects: [
    {
      slug: 'frattali',
      title: 'Frattali · Oreficeria',
      image: samueleProjects.frattali.cover,
      href: '/students/samuele/frattali'
    },
    {
      slug: 'luce',
      title: 'Luce · Alta Gioielleria',
      image: samueleProjects.luce.cover,
      href: '/students/samuele/luce'
    },
    {
      slug: 'pattern',
      title: 'Pattern · Code',
      image: samueleProjects.pattern.cover,
      href: '/students/samuele/pattern'
    }
  ]
};

export const roya = {
  name: 'Roya Ammari',
  project: 'DREAM No. LXXXIII',
  bio: 'Il bismuto (Bi, 83) diventa gioiello: cristalli a gradini iridescenti, sogno industriale e collezione che passa da sketch onirici alla fusione controllata del metallo.',
  portrait: royaImages.portrait,
  social: { instagram: 'https://instagram.com' },
  projects: [
    {
      slug: 'gate',
      title: 'The Gate to the Dreams',
      image: royaProjects.gate.cover,
      href: '/students/roya/gate'
    },
    {
      slug: 'innovazione',
      title: 'Innovazione · Bismuto',
      image: royaProjects.innovazione.cover,
      href: '/students/roya/innovazione'
    },
    {
      slug: 'rimozione',
      title: 'Rimozione',
      image: royaProjects.rimozione.cover,
      href: '/students/roya/rimozione'
    }
  ]
};
