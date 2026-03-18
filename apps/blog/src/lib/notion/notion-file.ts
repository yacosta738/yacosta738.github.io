export type FileObject =
	| { type: "external"; external: { url: string } }
	| { type: "file"; file: { url: string } };

export const fileToUrl = (
	file: FileObject | null | undefined,
): string | undefined => {
	if (!file) {
		return undefined;
	}
	if (file.type === "external") {
		return file.external.url;
	}
	if (file.type === "file") {
		return file.file.url;
	}
	return undefined;
};
