"use server";

import { createBook, generateUploadURL, updateBook } from "@/service/book";
import { decreaseDownloadCount, increaseDownloadCount } from "@/service/user";

export const createBookAction = (data: {
	title: string;
	description: string;
	author: string;
	ownerId: string;
}) => {
	const book = createBook({ ...data, documentURL: "" });

	return book;
};

export const getSecureURL = async () => {
	console.log("getSecureURL");

	return await generateUploadURL();
};

export const updateBookAction = async (
	id: string,
	data: {
		title: string;
		description: string;
		author: string;
		ownerId: string;
		documentURL: string;
	}
) => {
	return await updateBook(id, data);
};

export const increaseDownloadCountForUser = async (userId: string) => {
	return await increaseDownloadCount(userId);
};

export const decreaseDownloadCountForUser = async (oAuthID: string) => {
	return await decreaseDownloadCount(oAuthID);
};
