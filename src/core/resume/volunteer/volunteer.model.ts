export default interface Volunteer {
	organization: string;
	position: string;
	url?: string;
	startDate: Date;
	endDate?: Date | null;
	summary?: string;
	highlights?: string[];
}
