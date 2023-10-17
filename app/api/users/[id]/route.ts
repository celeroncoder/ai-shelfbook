import { deleteUser, getUserById } from "@/service/user";

type Context = {
	params: {
		id: string;
	};
};

export async function GET(req: Request, ctx: Context) {
	const { id } = ctx.params;

	return new Response(JSON.stringify(await getUserById(id)), { status: 200 });
}

export async function DELETE(req: Request, ctx: Context) {
	const { id } = ctx.params;

	return new Response(JSON.stringify(await deleteUser(id)));
}
