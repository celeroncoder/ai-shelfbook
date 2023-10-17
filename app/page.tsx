import { BooksGrid } from "@/components/books-grid";
import { Navbar } from "@/components/navbar";
import { getAllBooks } from "@/service/book";
import { getUserByOAuthID } from "@/service/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
	const { isAuthenticated, getUser } = getKindeServerSession();

	if (!isAuthenticated() || !getUser()) {
		redirect("/login");
	}

	const books = await getAllBooks();

	return (
		<main>
			<Navbar isAuthenticated={isAuthenticated()} user={getUser()} />
			<BooksGrid initialBookData={books} user={getUser()} />
		</main>
	);
}
