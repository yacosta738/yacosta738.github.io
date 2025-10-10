export interface MenuItem {
	href: string;
	translationKey: string;
	ariaLabelKey?: string;
	icon?: string;
	target?: string;
	condition?: boolean;
}

export interface DropdownMenu {
	items: MenuItem[];
	icon?: string;
	translationKey?: string;
}

export interface AuthInfo {
	isLoggedIn: boolean;
	authPath: string;
	authText: string;
}
