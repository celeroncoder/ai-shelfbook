export type Book = {
	id: string;
	title: string;
	author: string;
	description: string;
	documentURL: string;
	owner: {
		oAuthID: string;
	};
};
