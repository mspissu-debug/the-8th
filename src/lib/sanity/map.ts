/** Documento mentor da GROQ */
export type SanityMentorDoc = {
	_id: string;
	name: string;
	slug: string;
	roleIt?: string;
	roleEn?: string;
	bioIt?: string;
	bioEn?: string;
	website?: string;
	image?: string;
	order?: number;
};

/** Documento talent da GROQ */
export type SanityTalentDoc = {
	_id: string;
	name: string;
	slug: string;
	project?: string;
	pitchIt?: string;
	pitchEn?: string;
	edition?: string;
	instagram?: string;
	portrait?: string;
	concept?: string[];
	sketch?: string[];
	finished?: string[];
	vetrina?: string[];
	order?: number;
};

export function mapSanityMentor(doc: SanityMentorDoc) {
	return {
		slug: doc.slug,
		name: doc.name,
		roleIt: doc.roleIt,
		roleEn: doc.roleEn ?? doc.roleIt,
		image: doc.image,
		website: doc.website,
		bioIt: doc.bioIt,
		bioEn: doc.bioEn ?? doc.bioIt,
		order: doc.order
	};
}

export function mapSanityTalent(doc: SanityTalentDoc) {
	const pitchIt = doc.pitchIt;
	const pitchEn = doc.pitchEn;
	return {
		slug: doc.slug,
		name: doc.name,
		project: doc.project,
		skin: doc.slug,
		portrait: doc.portrait,
		pitch: pitchIt || pitchEn || '',
		pitchIt,
		pitchEn,
		social: { instagram: doc.instagram },
		concept: (doc.concept ?? []).filter(Boolean),
		sketch: (doc.sketch ?? []).filter(Boolean),
		finished: (doc.finished ?? []).filter(Boolean),
		vetrina: (doc.vetrina ?? []).filter(Boolean),
		source: 'sanity' as const
	};
}
