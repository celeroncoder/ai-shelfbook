import { getUserByOAuthID } from "@/service/user";

type Context = {
	params: {
		oAuthId: string;
	};
};

export async function GET(_req: Request, ctx: Context) {
	const { oAuthId } = ctx.params;

	const user = await getUserByOAuthID(oAuthId);

	return new Response(JSON.stringify(user), { status: 200 });
}
