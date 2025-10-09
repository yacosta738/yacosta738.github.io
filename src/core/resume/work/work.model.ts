export default interface Work {
	name: string;
	position: string;
	url?: string;
	location?: string;
	startDate: Date;
	endDate?: Date | null;
	summary?: string;
	highlights?: string[];
}
