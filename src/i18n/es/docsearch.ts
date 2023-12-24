import { DocSearchDictionary } from '../search-translation';

export default DocSearchDictionary({
	button: 'Buscar',
	modal: {
		searchBox: {
			placeholder: 'Buscar artículos y documentación',
		},
		startScreen: {
			recentSearchesTitle: 'Recientes',
			noRecentSearchesText: 'No hay búsquedas recientes',
			saveRecentSearchButtonTitle: 'Guardar esta búsqueda',
			removeRecentSearchButtonTitle: 'Eliminar esta búsqueda del historial',
			favoriteSearchesTitle: 'Favoritos',
			removeFavoriteSearchButtonTitle: 'Eliminar esta búsqueda de favoritos',
		},
		errorScreen: {
			titleText: 'No se pueden recuperar los resultados',
			helpText: 'Es posible que desees verificar tu conexión de red.',
		},
		footer: {
			shortcutLabel: 'para buscar',
			closeText: 'para cerrar',
			closeKeyAriaLabel: 'Tecla de escape',
		},
		noResultsScreen: {
			noResultsText: 'No hay resultados para',
			suggestedQueryText: 'Intenta buscar',
			reportMissingResultsText: '¿Crees que esta consulta debería devolver resultados?',
			reportMissingResultsLinkText: 'Háganos saber.',
		},
	},
});
