"use client";

import { getSecureURL, updateBookAction } from "@/lib/actions";
import { Input } from "./ui/input";
import { getBookById } from "@/service/book";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { FormEventHandler, useState } from "react";
import { Button } from "./ui/button";
import { UploadCloud } from "lucide-react";
import { getUserByOAuthID } from "@/service/user";

export function UploadFile({
	book,
	user,
}: {
	book: Awaited<ReturnType<typeof getBookById>>;
	user: KindeUser;
}) {
	if (!book || !user) return null;

	const [files, setFiles] = useState<FileList | null>(null);

	const handleUpload = async (files: FileList | null) => {
		console.log("handleUpload");

		if (files === null) return;

		const file = files[0];

		console.log(file);

		const { uploadURL } = await getSecureURL();

		if (!uploadURL) return;

		console.log(uploadURL);

		// putting the object
		const res = await fetch(uploadURL, {
			headers: {
				"Content-type": "multipart/form-data",
			},
			method: "PUT",
			body: file,
		});

		console.log("uploaded", res);

		// res &&
		// 	(await updateBook.mutateAsync({
		// 		bookId: book?.id!,
		// 		documentURL: uploadURL.split("?")[0],
		// 	}));

		res &&
			(await updateBookAction(book.id, {
				...book,
				ownerId: book.owner.id,
				documentURL: uploadURL.split("?")[0],
			}));
	};

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (files === null) return;

		handleUpload(files);
	};

	return (
		<form
			onSubmit={onSubmit}
			className="text-center min-w-fit w-full lg:w-1/4 md:w-1/2"
		>
			<h1 className="text-xl font-semibold my-4">
				Upload a PDF File for the readers to read the book...
			</h1>
			<div className="flex items-center justify-center gap-4">
				<Input
					type="file"
					accept=".pdf"
					onChange={(e) => setFiles(e.target.files)}
				/>

				<Button
					disabled={!files}
					type="submit"
					className="flex items-center gap-2"
				>
					<UploadCloud className="w-4" /> Upload
				</Button>
			</div>
		</form>
	);
}
