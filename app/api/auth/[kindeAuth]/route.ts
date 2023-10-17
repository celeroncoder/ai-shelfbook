import { AuthEndpoints, handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

type Context = {
	params: {
		kindeAuth: AuthEndpoints;
	};
};

export async function GET(req: NextRequest, { params }: Context) {
	const endpoint = params.kindeAuth;
	return await handleAuth(req, endpoint);
}
