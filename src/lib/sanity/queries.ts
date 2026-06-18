/** GROQ: tutti i mentor pubblicati, ordinati */
export const mentorsQuery = `*[_type == "mentor" && published != false] | order(order asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  roleIt,
  roleEn,
  bioIt,
  bioEn,
  website,
  "image": portrait.asset->url,
  order
}`;

/** GROQ: tutti i talenti pubblicati, ordinati */
export const talentsQuery = `*[_type == "talent" && published != false] | order(order asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  project,
  pitchIt,
  pitchEn,
  edition,
  instagram,
  "portrait": portrait.asset->url,
  "concept": concept[].asset->url,
  "sketch": sketch[].asset->url,
  "finished": finished[].asset->url,
  "vetrina": vetrina[].asset->url,
  order
}`;
