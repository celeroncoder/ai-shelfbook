import { Navbar } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { UploadFile } from "@/components/upload-file";
import { getSecureURL, updateBookAction } from "@/lib/actions";
import { getBookById } from "@/service/book";
import { getUserById, getUserByOAuthID } from "@/service/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect, useParams } from "next/navigation";

type PageProps = {
	params: {
		id: string;
	};
};

export default async function BookDetailsPage({ params }: PageProps) {
	const { getUser, isAuthenticated } = getKindeServerSession();

	const user = getUser();
	const { id } = params;

	const book = await getBookById(id);

	console.log(book);

	if (!book) redirect("/");

	return (
		<main>
			<Navbar isAuthenticated={isAuthenticated()} user={user} />
			<section className="px-10 py-5 flex flex-col items-center justify-center gap-5">
				<div className="flex flex-col items-center justify-center gap-2">
					<h1 className="text-2xl font-bold text-center	">{book?.title}</h1>
					<p>by {book?.author}</p>
				</div>
				<p className="text-md text-muted-foreground">{book?.description}</p>

				{book.owner.oAuthID === user.id && book.documentURL.length <= 0 && (
					<UploadFile book={book} user={user} />
				)}
			</section>
		</main>
	);
}

// const getSecureURLMutation = useMutation<{ uploadURL: string }, any, any>({
// 	mutationKey: ["getSecureURLMutation"],
// 	async mutationFn() {
// 		const data = await (
// 			await fetch("http://localhost:8000/books/generateUploadURL", {
// 				method: "GET",
// 			})
// 		).json();

// 		return data;
// 	},
// });

// const updateBook = useMutation<
// 	any,
// 	any,
// 	{ bookId: string; documentURL: string }
// >({
// 	async mutationFn({ bookId, documentURL }) {
// 		const payload = { documentURL };

// 		const data = await (
// 			await axios.post(`/books/update/${bookId}`, payload)
// 		).data;

// 		return data;
// 	},
// });
