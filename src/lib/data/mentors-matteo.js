/** Mentor THE 8th — bios da fonti pubbliche (Vicenzaoro, IED, siti ufficiali) */

/** @typedef {import('$lib/i18n/messages.js').Locale} Locale */

export const mentors = [
  {
    slug: 'alessia-crivelli',
    name: 'Alessia Crivelli',
    roleIt: 'Presidente · Fondazione Mani Intelligenti',
    roleEn: 'President · Fondazione Mani Intelligenti',
    image: '/mentors/crivelli.webp',
    website: 'https://www.maniintelligenti.it/it/',
    bioIt:
      'Figura di riferimento del distretto orafo valenzano, guida la Fondazione Mani Intelligenti con l’obiettivo di colmare il gap generazionale nel gioiello italiano. Direttore generale di Crivelli Gioielli e vicepresidente vicaria di Confindustria Federorafi, promuove formazione, laboratori e collaborazioni tra scuole e imprese.',
    bioEn:
      'A leading figure in the Valenza jewellery district, she leads Fondazione Mani Intelligenti to bridge the generational gap in Italian jewellery. General Manager of Crivelli Gioielli and Deputy Vice-President of Confindustria Federorafi, she champions training, workshops and school–industry partnerships.'
  },
  {
    slug: 'alessio-boschi',
    name: 'Alessio Boschi',
    roleIt: 'Maestro orafo · Designer internazionale',
    roleEn: 'Master goldsmith · International designer',
    image: '/mentors/boschi.webp',
    website: 'https://alessio-boschi.com/',
    bioIt:
      'Designer di alta gioielleria noto per trasformare storia, miti e architettura in gioielli con meccanismi nascosti e dettagli sorprendenti — dall’anello “Il Milione” dedicato a Marco Polo alle creazioni esposte in Design Room a Vicenzaoro. Fondatore di AB Jewels, unisce saper fare italiano e ricerca narrativa.',
    bioEn:
      'A high-jewellery designer who turns history, myth and architecture into pieces with hidden mechanisms and surprising details — from the “Il Milione” ring honouring Marco Polo to works shown in Vicenzaoro’s Design Room. Founder of AB Jewels, he combines Italian craft and narrative research.'
  },
  {
    slug: 'luca-daverio',
    name: 'Luca Daverio',
    roleIt: 'Jewelry design artist · Daverio1933',
    roleEn: 'Jewelry design artist · Daverio1933',
    image: '/mentors/daverio.webp',
    website: 'https://daverio1933.it/',
    bioIt:
      'Terza generazione del brand Daverio1933, nato nel 1933 dalle mani dello scultore Franco Daverio. Luca ha sviluppato il concetto di “gioiello-scultura” tra Bergamo e Valenza: creazioni uniche dove forma, pietra e lavorazione artigianale dialogano con il design contemporaneo.',
    bioEn:
      'Third generation of Daverio1933, founded in 1933 by sculptor Franco Daverio. Luca developed the “jewellery-as-sculpture” concept between Bergamo and Valenza: unique pieces where form, stone and artisan craft meet contemporary design.'
  },
  {
    slug: 'barbara-brocchi',
    name: 'Barbara Brocchi',
    roleIt: 'Curatrice · Coordinatrice Design del Gioiello IED Roma',
    roleEn: 'Curator · Head of Jewellery Design IED Rome',
    image: '/mentors/brocchi.webp',
    website: 'https://www.ied.it/corsi/roma/diplomi-triennali/design-del-gioiello',
    bioIt:
      'Illustratrice e jewelry designer, coordina il corso triennale in Design del Gioiello all’IED Roma. Art director e formatrice, guida i talenti tra ricerca stilistica, tecnologie digitali e dialogo con il sistema del lusso — pilastro creativo del percorso THE 8th.',
    bioEn:
      'Illustrator and jewellery designer, she coordinates the Jewellery Design BA at IED Rome. As art director and educator she guides talents through stylistic research, digital tools and dialogue with the luxury sector — a creative pillar of THE 8th.'
  }
];

/** @param {string} slug */
export function getMentor(slug) {
  return mentors.find((m) => m.slug === slug);
}

/** @param {Locale} loc */
export function mentorRole(mentor, loc) {
  return loc === 'en' ? mentor.roleEn : mentor.roleIt;
}

/** @param {Locale} loc */
export function mentorBio(mentor, loc) {
  return loc === 'en' ? mentor.bioEn : mentor.bioIt;
}

/** @param {string} slug */
export function getMentorNeighbors(slug) {
  const index = mentors.findIndex((m) => m.slug === slug);
  if (index < 0) return { index: -1, prev: null, next: null };
  return {
    index,
    prev: index > 0 ? mentors[index - 1] : null,
    next: index < mentors.length - 1 ? mentors[index + 1] : null
  };
}
