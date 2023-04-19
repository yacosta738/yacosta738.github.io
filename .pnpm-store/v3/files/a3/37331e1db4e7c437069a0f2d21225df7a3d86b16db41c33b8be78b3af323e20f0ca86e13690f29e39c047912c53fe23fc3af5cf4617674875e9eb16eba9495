import { spawn } from 'node:child_process';
import AdminDashboard from './vite-plugin-admin-dashboard.js';
const widgetPath = 'astro-netlify-cms/identity-widget';
export default function NetlifyCMS({ disableIdentityWidgetInjection = false, adminPath = '/admin', config: cmsConfig, previewStyles = [], }) {
    if (!adminPath.startsWith('/')) {
        throw new Error('`adminPath` option must be a root-relative pathname, starting with "/", got "' +
            adminPath +
            '"');
    }
    if (adminPath.endsWith('/')) {
        adminPath = adminPath.slice(0, -1);
    }
    let proxy;
    const NetlifyCMSIntegration = {
        name: 'netlify-cms',
        hooks: {
            'astro:config:setup': ({ config, injectRoute, injectScript, updateConfig, }) => {
                var _a;
                const identityWidgetScript = `import { initIdentity } from '${widgetPath}'; initIdentity('${adminPath}');`;
                const newConfig = {
                    // Default to the URL provided by Netlify when building there. See:
                    // https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
                    site: config.site || process.env.URL,
                    vite: {
                        plugins: [
                            ...(((_a = config.vite) === null || _a === void 0 ? void 0 : _a.plugins) || []),
                            AdminDashboard({
                                config: cmsConfig,
                                previewStyles,
                                identityWidget: disableIdentityWidgetInjection
                                    ? identityWidgetScript
                                    : '',
                            }),
                        ],
                    },
                };
                updateConfig(newConfig);
                injectRoute({
                    pattern: adminPath,
                    entryPoint: 'astro-netlify-cms/admin-dashboard.astro',
                });
                if (!disableIdentityWidgetInjection) {
                    injectScript('page', identityWidgetScript);
                }
            },
            'astro:server:start': () => {
                proxy = spawn('netlify-cms-proxy-server', {
                    stdio: 'inherit',
                    // Run in shell on Windows to make sure the npm package can be found.
                    shell: process.platform === 'win32',
                });
                process.on('exit', () => proxy.kill());
            },
            'astro:server:done': () => {
                proxy.kill();
            },
        },
    };
    return NetlifyCMSIntegration;
}
