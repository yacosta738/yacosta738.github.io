import identity from 'netlify-identity-widget';
export function initIdentity(adminPath) {
    identity.on('init', (user) => {
        if (!user) {
            identity.on('login', () => {
                document.location.href = adminPath;
            });
        }
    });
    identity.init();
}
