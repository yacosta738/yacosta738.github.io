/**
 * Represents a certificate or certification obtained.
 *
 * @property {string} name - The name of the certificate (e.g., "Certified Kubernetes Administrator").
 * @property {Date} date - The date the certificate was obtained.
 * @property {string} issuer - The organization that issued the certificate (e.g., "The Linux Foundation").
 * @property {string} [url] - An optional URL to view the certificate.
 */
export default interface Certificate {
	name: string;
	date: Date;
	issuer: string;
	url?: string;
}
