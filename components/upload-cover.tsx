"use client";

import { getBookById } from "@/service/book";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UploadCloud } from "lucide-react";
import { getSecureImageURL, updateBookAction } from "@/lib/actions";
import { getExtension } from "@/lib/utils";

export function UploadCover({
	book,
	user,
}: {
	book: Awaited<ReturnType<typeof getBookById>>;
	user: KindeUser;
}) {
	if (!book || !user) return null;

	const [files, setFiles] = useState<FileList | null>(null);

	const handleUpload = async (files: FileList | null) => {
		if (files === null) return;

		const file = files[0];

		const { uploadURL } = await getSecureImageURL(getExtension(file.name));

		if (!uploadURL) return;

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
				documentURL: book.documentURL,
				coverImageURL: uploadURL.split("?")[0],
			}));

		window.location.reload();
	};

	const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (files === null) return;

		handleUpload(files);
	};

	return (
		<form
			onSubmit={onSubmit}
			className="text-center min-w-fit w-full lg:w-1/4 md:w-1/2"
		>
			<h1 className="text-xl font-semibold my-4">Upload Cover</h1>
			<div className="flex items-center justify-center gap-4">
				<Input
					type="file"
					accept="image/*"
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
