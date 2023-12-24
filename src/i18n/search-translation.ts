
type ModalTranslations = {
	[key: string]: string | object | ModalTranslations;
};

export interface DocSearchTranslation {
	// These two keys are Astro-specific and apply to the search box in the header.
	button?: string;
	shortcutLabel?: string;
	// Astro-specific labels for the custom `resultsFooterComponent`.
	resultsFooterLede?: string;
	resultsFooterIntegrations?: string;
	resultsFooterThemes?: string;
	resultsFooterDiscord?: string;
	// Search box placeholder text within the DocSearch modal.
	placeholder?: string;
	// This object follows DocSearch's translation.modal format.
	// See: https://docsearch.algolia.com/docs/api/#translations
	modal?: ModalTranslations;
}

/** Helper to type check a dictionary of DocSearch string translations. */
export const DocSearchDictionary = (dict: DocSearchTranslation) => dict;
