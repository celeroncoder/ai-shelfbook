import { BookProps } from "@/lib/validators";
import { deleteBook, getBookById, updateBook } from "@/service/book";

type Context = {
	params: {
		id: string;
	};
};

export async function GET(_req: Request, ctx: Context) {
	const { id } = ctx.params;
	return new Response(JSON.stringify(await getBookById(id)), { status: 200 });
}

export async function PUT(req: Request, ctx: Context) {
	const { id } = ctx.params;

	const parsedBody = BookProps.safeParse(await req.json());

	if (!parsedBody.success)
		return new Response(JSON.stringify({ message: "Bad Request" }), {
			status: 400,
		});

	return new Response(JSON.stringify(await updateBook(id, parsedBody.data)));
}

export async function DELETE(_req: Request, ctx: Context) {
	const { id } = ctx.params;

	return new Response(JSON.stringify(await deleteBook(id)), { status: 200 });
}
