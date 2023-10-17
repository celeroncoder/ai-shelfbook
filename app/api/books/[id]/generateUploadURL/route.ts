import { generateUploadURL } from "@/service/book";

export async function GET(_req: Request) {
	return new Response(JSON.stringify(await generateUploadURL()));
}
