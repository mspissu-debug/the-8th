/** Link principali del sito */

export const siteLinks = {
	email: 'info@maniintelligenti.it',
	instagram: 'https://www.instagram.com/maniintelligenti/',
	linkedin: 'https://www.linkedin.com/company/fondazione-mani-intelligenti/'
};

export const headerNavLinks = [
	{ href: '/students', key: 'nav.talents', previewKicker: 'Talenti', previewKey: 'nav.previewTalents' },
	{ href: '/mentors', key: 'nav.mentors', previewKicker: 'Mentor', previewKey: 'nav.previewMentors' },
	{ href: '/editions/september', key: 'nav.vetrina', previewKicker: 'Vetrina', previewKey: 'nav.previewVetrina' },
	{ href: '/contact', key: 'nav.contact', previewKicker: 'Contatti', previewKey: 'nav.previewContact' },
	{ href: '/open-call', key: 'nav.candidature', cta: true, previewKicker: 'Candidati', previewKey: 'nav.previewOpenCall' }
];

export const footerExploreLinks = [
	{ href: '/students', key: 'nav.talents', hintKey: 'pages.talentsLede' },
	{ href: '/mentors', key: 'nav.mentors', hintKey: 'pages.mentorsLede' },
	{ href: '/editions/september', key: 'nav.vetrina', hintKey: 'pages.vetrinaLede' },
	{ href: '/contact', key: 'nav.contact', hintKey: 'pages.contactLede' },
	{ href: '/llms.txt', key: 'footer.llms' },
	{ href: '/open-call', key: 'nav.candidature', hintKey: 'pages.openCallLede' }
];

/** Voci menu pannello mobile (stesse voci della barra desktop) */
export const panelNavLinks = [...headerNavLinks];
