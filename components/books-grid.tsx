"use client";

import { Search } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Book } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { Suspense, useState } from "react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AddBookDialog } from "./add-book";
import Link from "next/link";

export function BooksGrid({
	initialBookData,
	user,
}: {
	initialBookData: Book[];
	user: KindeUser;
}) {
	const [books, setBooks] = useState(initialBookData);
	const [search, setSearch] = useState("");

	const { data, isLoading } = useQuery<any, any, Book[]>({
		queryKey: ["books"],
		queryFn: async () => {
			const { data } = await axios.get("/books");
			return JSON.parse(data);
		},
		onSuccess: (data) => {
			setBooks(data);
		},
		initialData: initialBookData,
	});

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (search) {
			search !== ""
				? setBooks(
						data.filter((book) =>
							book.title.toLowerCase().includes(search.toLowerCase())
						)
				  )
				: setBooks(data);
		}
	}

	return (
		<>
			<section className="flex items-center justify-between px-6 py-4">
				<form
					onSubmit={onSubmit}
					className="flex w-full max-w-sm items-center space-x-2"
				>
					<Input
						type="text"
						placeholder="Harry Potter..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button type="submit" className="gap-2">
						<span className="sr-only">Find</span>
						<Search className="w-4" />
					</Button>
				</form>

				<AddBookDialog user={user} />
			</section>

			<Suspense>
				<section className="px-6 py-4 flex flex-wrap gap-5">
					{!isLoading &&
						books &&
						books.length > 0 &&
						books.map((book: any) => {
							const isOwner = book.owner.oAuthID == user?.id;

							return (
								<Link href={`/book/${book.id}`}>
									<Card
										key={book.id}
										className="hover:shadow-md hover:scale-105 cursor-pointer duration-300 w-96"
									>
										<CardHeader>
											<CardTitle>{book.title}</CardTitle>
											<CardDescription>by {book.author}</CardDescription>
										</CardHeader>
										<CardContent>
											<p className="text-muted-foreground text-sm">
												{book.description}
											</p>
										</CardContent>
										{user && (
											<CardFooter>
												<div className="flex items-center justify-end w-full">
													<p className="text-sm text-muted-foreground">
														{isOwner && "Owner"}
													</p>
												</div>
											</CardFooter>
										)}
									</Card>
								</Link>
							);
						})}
				</section>
			</Suspense>
		</>
	);
}
