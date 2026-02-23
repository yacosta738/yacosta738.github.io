// Import existing models from other modules
import type Award from "../award/award.model";
import type Certificate from "../certificate/certificate.model";
import type Education from "../education/education.model";
import type Interest from "../interest/interest.model";
import type Language from "../language/language.model";
import type Project from "../project/project.model";
import type Publication from "../publication/publication.model";
import type Reference from "../reference/reference.model";
import type Skill from "../skill/skill.model";
import type Volunteer from "../volunteer/volunteer.model";
import type Work from "../work/work.model";

/**
 * Profile information for a person's online presence.
 *
 * @property network - The name of the social/networking service (e.g. "GitHub", "Twitter").
 * @property username - The account username on the network.
 * @property url - Full URL to the profile on the network.
 */
export interface Profile {
	network: string;
	username: string;
	url: string;
}

/**
 * Physical or mailing location details.
 *
 * @property address - Optional street address.
 * @property postalCode - Optional postal or ZIP code.
 * @property city - City name.
 * @property countryCode - ISO country code (e.g. "US", "GB").
 * @property region - Region, state or province.
 */
export interface Location {
	address?: string;
	postalCode?: string;
	city: string;
	countryCode: string;
	region: string;
}

/**
 * Core personal/basic information that appears at the top of a resume.
 *
 * @property name - Full name of the person.
 * @property label - Short professional title or tagline.
 * @property image - URL to a profile image.
 * @property email - Contact email address.
 * @property phone - Optional phone number.
 * @property url - Optional personal website or portfolio URL.
 * @property summary - Short summary or objective statement.
 * @property location - Structured location information.
 * @property profiles - List of social or professional profiles.
 */
export interface Basics {
	name: string;
	label: string;
	image: string;
	email: string;
	phone?: string;
	url?: string;
	summary: string;
	location: Location;
	profiles: Profile[];
}

/**
 * Root resume model that uses the domain model objects directly.
 * Each model contains an optional 'entry' field with the Astro CollectionEntry
 * for accessing Astro-specific functionality when needed.
 *
 * @property id - Unique identifier for the resume.
 * @property basics - Core personal and contact information.
 * @property work - Array of work experience entries.
 * @property volunteer - Optional array of volunteer experience entries.
 * @property education - Array of education entries.
 * @property awards - Optional array of award entries.
 * @property certificates - Optional array of certificate entries.
 * @property publications - Optional array of publication entries.
 * @property skills - Array of skill entries.
 * @property languages - Optional array of language entries.
 * @property interests - Optional array of interest entries.
 * @property references - Optional array of reference entries.
 * @property projects - Optional array of project entries.
 */
export default interface Resume {
	id: string;
	basics: Basics;
	work: Work[];
	volunteer?: Volunteer[];
	education: Education[];
	awards?: Award[];
	certificates?: Certificate[];
	publications?: Publication[];
	skills: Skill[];
	languages?: Language[];
	interests?: Interest[];
	references?: Reference[];
	projects?: Project[];
}
