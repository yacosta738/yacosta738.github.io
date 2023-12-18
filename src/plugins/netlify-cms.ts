import type { CmsConfig } from 'netlify-cms-core';
import cmsConfigCommon from './netlify-cms-common';
import cmsConfigEn from './netlify-cms-en';
import cmsConfigEs from './netlify-cms-es';
export const config: Omit<CmsConfig, 'load_config_file' | 'local_backend'> = {
	backend: {
		name: 'git-gateway',
		branch: 'master',
	},
	publish_mode: 'editorial_workflow',
	media_folder: 'public/uploads',
	public_folder: 'public/uploads',
	site_url: 'https://yunielacosta.com',
	display_url: 'https://yunielacosta.com',
	logo_url: 'https://yunielacosta.com/logo.svg',
	collections: [
		// Content collections
		...cmsConfigCommon,
		...cmsConfigEn,
		...cmsConfigEs,
	],
};
