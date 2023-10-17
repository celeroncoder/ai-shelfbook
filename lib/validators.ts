import { z } from "zod";

export const BookProps = z.object({
	title: z.string(),
	author: z.string(),
	ownerId: z.string().cuid(),
	description: z.string(),
	documentURL: z.string().url(),
	coverImageURL: z.string().url(),
});

export type BookProps = z.infer<typeof BookProps>;
