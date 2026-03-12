export const getImage = async () => ({
	src: "",
	attributes: {},
});

export const Picture = (props: { src?: string; alt?: string }) => {
	const src = props?.src ?? "";
	const alt = props?.alt ?? "";
	return `<picture><img src="${src}" alt="${alt}"></picture>`;
};
