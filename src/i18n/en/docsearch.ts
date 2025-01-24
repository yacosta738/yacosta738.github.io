import { DocSearchDictionary } from '../search-translation';

export default DocSearchDictionary({
  button: 'Search',
  modal: {
    searchBox: {
      placeholder: 'Search articles and documentation',
    },
    startScreen: {
      recentSearchesTitle: 'Recent',
      noRecentSearchesText: 'No recent searches',
      saveRecentSearchButtonTitle: 'Save this search',
      removeRecentSearchButtonTitle: 'Remove this search from history',
      favoriteSearchesTitle: 'Favorites',
      removeFavoriteSearchButtonTitle: 'Remove this search from favorites',
    },
    errorScreen: {
      titleText: 'Unable to retrieve results',
      helpText: 'You may want to check your network connection.',
    },
    footer: {
      shortcutLabel: 'to search',
      closeText: 'to close',
      closeKeyAriaLabel: 'Escape key',
    },
    noResultsScreen: {
      noResultsText: 'No results for',
      suggestedQueryText: 'Try searching for',
      reportMissingResultsText: 'Think this query should return results?',
      reportMissingResultsLinkText: 'Let us know.',
    },
  },
});
