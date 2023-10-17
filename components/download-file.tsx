"use client";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { getBookById } from "@/service/book";
import { Download } from "lucide-react";
import Link from "next/link";

export function DownloadFile({
	book,
}: {
	book: Awaited<ReturnType<typeof getBookById>>;
}) {
	if (!book) return null;
	return (
		<Link href={book.documentURL} target="_blank">
			<Button className="flex items-center gap-2">
				<Download className="w-4" /> Download Book
			</Button>
		</Link>
	);
}
