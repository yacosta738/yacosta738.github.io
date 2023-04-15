// Store the current document title in a variable
let previousTitle = document.title

// Define alternative title text for each language
let titleTextAlt = { en: "Don't go! Come back! 😥", es: '¡No te vayas! ¡Vuelve! 😥' }

// Declare a variable to hold the ID of the timeout task
let timeoutId

// When the window loses focus (e.g. the user switches to another tab)
window.addEventListener('blur', () => {
	// Cancel the previous timeout task if it's still running
	clearTimeout(timeoutId)
	// Store the current title in the previousTitle variable
	previousTitle = document.title
	// Schedule a new timeout task that changes the title after 10 seconds
	timeoutId = setTimeout(() => {
		document.title = titleTextAlt[document.documentElement.lang]
	}, 10000)
})

// When the window gains focus again (e.g. the user comes back to the tab)
window.addEventListener('focus', () => {
	// Cancel the previous timeout task if it's still running
	clearTimeout(timeoutId)
	// Restore the previous title
	document.title = previousTitle
})
