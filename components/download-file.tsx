"use client";

import { decreaseDownloadCountForUser } from "@/lib/actions";
import { Button } from "./ui/button";
import { getBookById } from "@/service/book";
import { Download } from "lucide-react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserByOAuthID } from "@/service/user";

export function DownloadFile({
	book,
	user,
	dbUser,
}: {
	book: Awaited<ReturnType<typeof getBookById>>;
	user: KindeUser;
	dbUser: Awaited<ReturnType<typeof getUserByOAuthID>>;
}) {
	if (!book || !user) return null;

	const handleDownload = async () => {
		if (book.owner.oAuthID === user.id) {
			window.open(book.documentURL, "_blank");
		} else {
			const res = await decreaseDownloadCountForUser(user.id!);
			res && window.open(book.documentURL, "_blank");
		}
	};

	return (
		<div className="flex flex-col gap-2 items-center justify-center">
			{(dbUser?.downloadCount || 0) <= 0 && (
				<p className="text-red-400">
					You have exhauseted your download credits. Upload one book to restore
					4 free downloads.
				</p>
			)}
			<Button
				disabled={(dbUser?.downloadCount || 0) <= 0}
				onClick={handleDownload}
				className="flex items-center gap-2"
			>
				<Download className="w-4" /> Download Book
			</Button>
		</div>
	);
}
