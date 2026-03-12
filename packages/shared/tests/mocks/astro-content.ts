export const defineCollection = <T>(config: T): T => config;

export const getCollection = async () => [] as unknown[];
export const getEntries = async () => [] as unknown[];
export const getEntry = async () => undefined;
export const reference = (value: unknown) => value;
