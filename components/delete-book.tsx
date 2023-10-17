"use client";

import { getBookById } from "@/service/book";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { deleteBookAction } from "@/lib/actions";

export const DeleteBook = ({
	book,
}: {
	book: Awaited<ReturnType<typeof getBookById>>;
}) => {
	if (!book) return null;

	const onClick = async () => {
		await deleteBookAction(book.id);
		window.location.href = "/";
	};
	return (
		<div>
			<Button
				onClick={onClick}
				variant={"destructive"}
				className="flex items-center justify-center gap-2"
			>
				<Trash className="w-4" /> Delete Book
			</Button>
		</div>
	);
};
