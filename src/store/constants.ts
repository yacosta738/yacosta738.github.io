export interface SocialMedia {
	name: string
	url: string
	icon: string
}

export const email = 'yunielacosta738@gmail.com'
export const domain = 'https://yunielacosta.com'

export const DRAWER_MENU_ID = 'drawer-menu'
export const DRAWER_MENU_BUTTON_ID = 'drawer-menu-button'
export const DRAWER_MENU_LABEL = 'drawer-menu-label'
export const DRAWER_BUTTON_BOX = 'drawer-button-box'

export const NAVBAR_HEADER = 'navbar-header'

export const socialMedia: SocialMedia[] = [
	{
		name: 'GitHub',
		url: 'https://github.com/yacosta738',
		icon: 'uit:github-alt'
	},
	{
		name: 'Instagram',
		url: 'https://www.instagram.com/yacosta738',
		icon: 'mdi:instagram'
	},
	{
		name: 'Twitter',
		url: 'https://twitter.com/yacosta738',
		icon: 'uit:twitter-alt'
	},
	{
		name: 'Linkedin',
		url: 'https://www.linkedin.com/in/yacosta738',
		icon: 'uit:linkedin-alt'
	},
	{
		name: 'Codepen',
		url: 'https://codepen.io/yacosta738',
		icon: 'ph:codepen-logo'
	}
]

export default { email, socialMedia }
