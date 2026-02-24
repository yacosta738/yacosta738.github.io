export const isValidEmailAddress = (email: string): boolean => {
	const value = email.trim();
	if (!value) {
		return false;
	}

	if (
		value.includes(" ") ||
		value.includes("\t") ||
		value.includes("\n") ||
		value.includes("\r")
	) {
		return false;
	}

	const atIndex = value.indexOf("@");
	if (atIndex <= 0 || atIndex !== value.lastIndexOf("@")) {
		return false;
	}

	const localPart = value.slice(0, atIndex);
	const domainPart = value.slice(atIndex + 1);
	if (!localPart || !domainPart || !domainPart.includes(".")) {
		return false;
	}

	if (domainPart.startsWith(".") || domainPart.endsWith(".")) {
		return false;
	}

	const domainLabels = domainPart.split(".");
	return domainLabels.every((label) => label.trim().length > 0);
};
