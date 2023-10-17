import { prisma } from "@/lib/prisma";
import { bucketName, randomBytes, s3 } from "@/lib/s3";
import {
	DeleteObjectsCommand,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

async function getAllBooks() {
	return await prisma.book.findMany({
		select: {
			id: true,
			title: true,
			author: true,
			description: true,
			documentURL: true,
			coverImageURL: true,
			owner: {
				select: {
					oAuthID: true,
				},
			},
		},
	});
}

async function getBookById(id: string) {
	return await prisma.book.findUnique({
		where: { id },
		select: {
			id: true,
			title: true,
			author: true,
			description: true,
			documentURL: true,
			coverImageURL: true,
			owner: {
				select: {
					oAuthID: true,
					id: true,
				},
			},
		},
	});
}

async function getBooksByOwner(ownerId: string) {
	return await prisma.book.findMany({ where: { ownerId } });
}

async function createBook({
	title,
	author,
	ownerId,
	description,
	documentURL,
}: {
	title: string;
	author: string;
	ownerId: string;
	description: string;
	documentURL: string;
}) {
	return await prisma.book.create({
		data: {
			title,
			author,
			ownerId,
			description,
			documentURL,
		},
	});
}

async function updateBook(
	id: string,
	{
		title,
		author,
		ownerId,
		description,
		documentURL,
		coverImageURL,
	}: {
		title: string;
		author: string;
		ownerId: string;
		description: string;
		documentURL: string;
		coverImageURL: string;
	}
) {
	return await prisma.book.update({
		where: { id },
		data: {
			title,
			author,
			ownerId,
			description,
			documentURL,
			coverImageURL,
		},
	});
}

async function deleteBook(id: string) {
	return await prisma.book.delete({ where: { id } });
}

async function generateUploadURL() {
	const rawBytes = await randomBytes(16);
	const imageName = `book-${rawBytes.toString("hex")}.pdf`;

	const params = {
		Bucket: bucketName,
		Key: imageName,
		// Expires: 60,
	};

	const command = new PutObjectCommand(params);
	const uploadURL = await getSignedUrl(s3, command, { expiresIn: 3600 });

	return { imageName, uploadURL };
}

async function generateImageUploadURL(fileExt: string) {
	const rawBytes = await randomBytes(16);
	const imageName = `bookCover-${rawBytes.toString("hex")}.${fileExt}`;

	const params = {
		Bucket: bucketName,
		Key: imageName,
		// Expires: 60,
	};

	const command = new PutObjectCommand(params);
	const uploadURL = await getSignedUrl(s3, command, { expiresIn: 3600 });

	return { imageName, uploadURL };
}

async function deleteObjects(objectKeys: string[]) {
	const command = new DeleteObjectsCommand({
		Bucket: bucketName,
		Delete: { Objects: objectKeys.map((objectKey) => ({ Key: objectKey })) },
	});

	await s3.send(command, { requestTimeout: 60 });
}

export {
	getAllBooks,
	getBookById,
	getBooksByOwner,
	createBook,
	updateBook,
	deleteBook,
	generateUploadURL,
	deleteObjects,
	generateImageUploadURL,
};
