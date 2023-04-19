import type { AstroIntegration } from 'astro';
import type { CmsConfig } from 'netlify-cms-core';
import type { PreviewStyle } from './types.js';
interface NetlifyCMSOptions {
    /**
     * Path at which the Netlify CMS admin dashboard should be served.
     * @default '/admin'
     */
    adminPath?: string;
    config: Omit<CmsConfig, 'load_config_file' | 'local_backend'>;
    disableIdentityWidgetInjection?: boolean;
    previewStyles?: PreviewStyle[];
}
export default function NetlifyCMS({ disableIdentityWidgetInjection, adminPath, config: cmsConfig, previewStyles, }: NetlifyCMSOptions): AstroIntegration;
export {};
