import { DeleteBook } from "@/components/delete-book";
import { DownloadFile } from "@/components/download-file";
import { Navbar } from "@/components/navbar";
import { UploadCover } from "@/components/upload-cover";
import { UploadFile } from "@/components/upload-file";
import { getBookById } from "@/service/book";
import { getUserByOAuthID } from "@/service/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

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

	if (!book) redirect("/");

	const dbUser = await getUserByOAuthID(user.id!);

	return (
		<main>
			<Navbar isAuthenticated={isAuthenticated()} user={user} />
			<section className="px-10 py-5 flex flex-col items-center justify-center gap-5">
				{book.coverImageURL ? (
					<div>
						<img className="w-56 h-72 rounded-lg" src={book?.coverImageURL!} />
					</div>
				) : (
					book.owner.oAuthID === user.id && (
						<UploadCover book={book} user={user} />
					)
				)}

				<div className="flex flex-col items-center justify-center gap-2">
					<h1 className="text-2xl font-bold text-center	">{book?.title}</h1>
					<p>by {book?.author}</p>
				</div>
				<p className="text-md text-muted-foreground">{book?.description}</p>

				{book.owner.oAuthID === user.id && book.documentURL.length <= 0 && (
					<UploadFile book={book} user={user} />
				)}

				{book.documentURL.length > 0 ? (
					<DownloadFile book={book} user={user} dbUser={dbUser} />
				) : (
					book.owner.oAuthID !== user.id && (
						<h1>
							The User hasn't upload the book pdf yet. Please wait or try again
							later...
						</h1>
					)
				)}

				{book.owner.oAuthID === user.id && <DeleteBook book={book} />}
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
