import { createUser } from "@/service/user";

export async function POST(req: Request) {
	const { oAuthId } = await req.json();

	const user = await createUser(oAuthId);

	return new Response(JSON.stringify(user), { status: 201 });
}
