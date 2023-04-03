import { SocialMedia } from '../store/constants'

export interface Author {
	id: string
	name: string
	image: string
	rol: string
	bio: string
	email: string
	lang: string
	social: SocialMedia[]
}

export const jsonToAuthor = (json: any): Author => {
	return {
		id: json.id,
		name: json.name,
		image: json.image,
		rol: json.rol,
		bio: json.bio,
		email: json.email,
		lang: json.lang,
		social: json.social
	}
}
