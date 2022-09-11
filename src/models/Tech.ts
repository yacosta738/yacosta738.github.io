export interface Tech {
	id: string
	name?: string
	icon?: string
	url?: string
}


export const jsonToTech = (json: any): Tech => {
	return {
		id: json.id,
		name: json.name,
		icon: json.icon,
		url: json.url
	}
}
