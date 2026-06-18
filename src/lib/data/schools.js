/** Scuole collegate a THE 8th / Vicenzaoro — per validazione form */

export const schools = [
  'IED — Istituto Europeo di Design',
  'IED Roma — Design del Gioiello',
  'IED Milano — Design del Gioiello',
  'TADS — Tarì Design School',
  'Master in Storia, Design e Marketing del Gioiello — Arezzo',
  'Accademia di Belle Arti',
  'Politecnico di Milano — Design',
  'Alchimia — Scuola di Gioielleria Contemporanea',
  'Le Arti Orafe — Firenze'
];

/**
 * @param {string} value
 */
export function schoolMatches(value) {
  const q = value.trim().toLowerCase();
  if (!q) return false;
  return schools.some((s) => {
    const lower = s.toLowerCase();
    return lower === q || lower.includes(q) || q.includes(lower.split('—')[0].trim());
  });
}
