import type { CmsConfig } from 'netlify-cms-core';
import { collections as enCollections } from './netlify-cms-en';
import { collections as esCollections } from './netlify-cms-es';
import { collections as commonCollections } from './netlify-cms-common';

const config: CmsConfig = {
	backend: {
		name: 'git-gateway',
		branch: 'main',
	},
	local_backend: true,
	publish_mode: 'editorial_workflow',
	media_folder: 'public/images',
	public_folder: '/images',
	collections: [
		...commonCollections,
		...enCollections,
		...esCollections,
	],
};

export default config;
