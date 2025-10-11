/**
 * Raw data types from the resume JSON file.
 * These represent the structure of data before transformation.
 */

export interface RawProfile {
	network: string;
	username: string;
	url: string;
}

export interface RawLocation {
	address?: string;
	postalCode?: string;
	city: string;
	countryCode: string;
	region: string;
}

export interface RawBasics {
	name: string;
	label: string;
	image: string;
	email: string;
	phone?: string;
	url?: string;
	summary: string;
	location: RawLocation;
	profiles: RawProfile[];
}

export interface RawWork {
	name: string;
	position: string;
	url?: string;
	startDate: string;
	endDate: string | null;
	summary?: string;
	highlights?: string[];
}

export interface RawEducation {
	institution: string;
	url?: string;
	area: string;
	studyType: string;
	startDate: string;
	endDate?: string;
	score?: string;
	courses?: string[];
}

export interface RawProject {
	name: string;
	description: string;
	highlights?: string[];
	keywords?: string[];
	startDate?: string;
	endDate?: string;
	url?: string;
	roles?: string[];
	entity?: string;
	type?: string;
	github?: string;
	isActive?: boolean;
}

export interface RawSkill {
	name: string;
	level: string;
	keywords?: string[];
}

export interface RawVolunteer {
	organization: string;
	position: string;
	url?: string;
	startDate: string;
	endDate?: string;
	summary?: string;
	highlights?: string[];
}

export interface RawAward {
	title: string;
	date: string;
	awarder: string;
	summary?: string;
}

export interface RawCertificate {
	name: string;
	date: string;
	issuer: string;
	url?: string;
}

export interface RawPublication {
	name: string;
	publisher: string;
	releaseDate: string;
	url?: string;
	summary?: string;
}

export interface RawLanguage {
	language: string;
	fluency: string;
}

export interface RawInterest {
	name: string;
	keywords?: string[];
}

export interface RawReference {
	name: string;
	reference: string;
}

export interface RawResumeData {
	basics: RawBasics;
	work: RawWork[];
	volunteer?: RawVolunteer[];
	education: RawEducation[];
	awards?: RawAward[];
	certificates?: RawCertificate[];
	publications?: RawPublication[];
	skills: RawSkill[];
	languages?: RawLanguage[];
	interests?: RawInterest[];
	references?: RawReference[];
	projects?: RawProject[];
}
