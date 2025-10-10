import type { CollectionEntry } from "astro:content";
import { findImage } from "@/utils/images";
import type Resume from "./resume.model";

/**
 * Maps a single resume collection entry from Astro's content collection to a `Resume` model.
 * This function handles data normalization, ensuring that optional fields are
 * handled correctly and that the final object matches the `Resume` interface.
 *
 * @param {CollectionEntry<"resume">} resumeData - The resume collection entry from Astro.
 * @returns {Resume} A normalized `Resume` model object.
 * @throws {Error} If the resume data is invalid or missing required fields.
 */
export async function toResume(
	resumeData: CollectionEntry<"resume">,
): Promise<Resume> {
	if (!resumeData?.data) {
		throw new Error("Invalid resume data: data object is missing");
	}

	const { data } = resumeData;
	if (!data.basics.name) {
		throw new Error("Invalid resume data: name is required");
	}

	const preparedImage = await findImage(data.basics.image || "");

	return {
		id: resumeData.id,
		basics: {
			name: data.basics.name,
			label: data.basics.label,
			image: preparedImage as unknown as string,
			email: data.basics.email,
			phone: data.basics.phone,
			url: data.basics.url,
			summary: data.basics.summary,
			location: data.basics.location,
			profiles: data.basics.profiles,
		},
		work: data.work,
		volunteer: data.volunteer ? data.volunteer : undefined,
		education: data.education,
		awards: data.awards ? data.awards : undefined,
		certificates: data.certificates ? data.certificates : undefined,
		publications: data.publications ? data.publications : undefined,
		skills: data.skills
			? data.skills.map((skill) => ({
					name: skill.name,
					level: skill.level ?? "",
					keywords: skill.keywords,
				}))
			: [],
		languages: data.languages ? data.languages : undefined,
		interests: data.interests ? data.interests : undefined,
		references: data.references ? data.references : undefined,
		projects: data.projects
			? data.projects.map((project) => ({
					name: project.name,
					description: project.description ?? "",
					highlights: project.highlights ?? [],
					startDate: project.startDate,
					endDate: project.endDate || undefined,
					url: project.url,
				}))
			: undefined,
	};
}

/**
 * Maps an array of resume collection entries to an array of `Resume` models.
 *
 * @param {CollectionEntry<"resume">[]} resumes - An array of resume collection entries.
 * @returns {Resume[]} An array of `Resume` model objects.
 */
export async function toResumes(
	resumes: CollectionEntry<"resume">[],
): Promise<Resume[]> {
	const mapped: Resume[] = [];
	for (const r of resumes) {
		// await each mapping sequentially to keep code simple
		// This is fine for build-time mapping (small number of resumes)
		// If performance is needed, we could map in parallel with Promise.all
		// but keep sequential for determinism.
		// eslint-disable-next-line no-await-in-loop
		mapped.push(await toResume(r));
	}
	return mapped;
}
