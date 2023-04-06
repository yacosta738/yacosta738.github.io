let previousTitle = document.title
	let titleTextAlt = { en: "Don't go! Come back! 😥", es: '¡No te vayas! ¡Vuelve! 😥' }

	window.addEventListener('blur', () => {
		previousTitle = document.title
		document.title = titleTextAlt[document.documentElement.lang]
	})

	window.addEventListener('focus', () => {
		document.title = previousTitle
	})
