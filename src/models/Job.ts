import { type CollectionEntry } from 'astro:content';
export interface IRole {
	role?: string;
	startDate?: Date | string;
	endDate?: Date | string;
	achievements?: string[];
	getIdentifier: () => string;
}

export interface IJob {
	id?: string;
	title?: string;
	lang?: string;
	company?: string;
	icon?: string;
	location?: string;
	url?: string;
	published: boolean;
	roles?: IRole[];
	createDate?: Date | string;
}

export class Role implements IRole {
	id: string = crypto.randomUUID();
	role: string = '';
	startDate?: Date | string;
	endDate?: Date | string;
	achievements: string[] = [];

	constructor(data: Partial<IRole> = {}) {
		Object.assign(this, data);
	}

	public getIdentifier: () => string = () => this.id ?? crypto.randomUUID();
}

export class Job implements IJob {
	id: string = crypto.randomUUID();
	title: string = '';
	lang: string = 'en';
	company: string = '';
	icon: string = '';
	location: string = '';
	url: string = '';
	published: boolean = false;
	roles: IRole[] = [];
	createDate?: Date | string;

	constructor(data: Partial<IJob> = {}) {
		Object.assign(this, data);
	}
}

export const jsonToJob = (json: CollectionEntry<'jobs'>): IJob => {
	return {
		id: json.id || crypto.randomUUID(),
		title: json.data?.title,
		lang: json.data?.lang,
		company: json.data?.company,
		icon: json.data?.icon,
		location: json.data?.location,
		url: json.data?.url,
		published: json.data?.published,
		createDate: json.data?.createDate,
		roles: json.data?.roles?.map((role) => {
			return new Role({
				role: role.role,
				startDate: role.startDate,
				endDate: role.endDate,
				achievements: role.achievements,
			});
		}),
	};
};
