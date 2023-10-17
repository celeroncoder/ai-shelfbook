import { BookProps } from "@/lib/validators";
import { createBook, getAllBooks } from "@/service/book";

export async function GET() {
	return new Response(JSON.stringify(await getAllBooks()), { status: 200 });
}

export async function POST(req: Request) {
	console.log("\n\n\n\n", await req.json());

	const parsedBody = BookProps.safeParse(await req.json());

	if (!parsedBody.success) {
		return new Response(
			JSON.stringify({
				message: "Bad Request",
			}),
			{ status: 400 }
		);
	}

	return new Response(JSON.stringify(await createBook(parsedBody.data)), {
		status: 201,
	});
}
