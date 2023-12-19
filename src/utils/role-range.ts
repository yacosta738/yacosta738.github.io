import type { IRole } from '../models/Job';

export const range = (rol?: IRole, present?: string): string => {
	const date = rol?.startDate ? new Date(rol.startDate) : new Date();
	return `${date.toDateString()} - ${
		rol?.endDate ? new Date(rol.endDate).toDateString() : present ?? 'Present'
	}`;
};
