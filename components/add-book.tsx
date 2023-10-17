import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { FilePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import { axios } from "@/lib/axios";
import { Book } from "@/lib/types";
import { BookProps } from "@/lib/validators";
import { queryClient } from "@/lib/react-query";
import { createBook } from "@/service/book";
import { createBookAction } from "@/lib/actions";

const formSchema = z.object({
	title: z.string().min(2).max(50),
	description: z.string().min(2).max(250),
	author: z.string().min(2).max(50),
});

export const AddBookDialog = ({ user }: { user: KindeUser }) => {
	const [open, setOpen] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			author: "",
			description: "",
		},
	});

	const { data } = useQuery({
		queryKey: ["userID"],
		async queryFn() {
			const data = (await axios.get(`/users/oAuthId/${user.id}`)).data;

			return JSON.parse(data);
		},
	});

	// const { mutateAsync } = useMutation<
	// 	Book,
	// 	any,
	// 	{ title: string; description: string; author: string; ownerId: string }
	// >({
	// 	async mutationFn(props) {
	// 		const payload: BookProps = { ...props, documentURL: "" };

	// 		console.log(payload);

	// 		const data = (await axios.post("/books", JSON.stringify(payload))).data;

	// 		return JSON.parse(data);
	// 	},
	// 	onSuccess(data, vars, ctx) {
	// 		queryClient.invalidateQueries(["books"]);
	// 	},
	// });

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		// await mutateAsync({
		// 	title: values.title,
		// 	description: values.description,
		// 	author: values.author,
		// 	ownerId: data?.id,
		// });

		const book = await createBookAction({
			title: values.title,
			description: values.description,
			author: values.author,
			ownerId: data?.id,
		});

		if (book) {
			queryClient.invalidateQueries(["books"]);
		}

		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button className="gap-2">
					<FilePlus className="w-4" /> Add Book
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Book</DialogTitle>
					<DialogDescription>Add a book to your shelfbook...</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Harry Potter..." {...field} />
									</FormControl>
									<FormDescription>
										Enter the title of you Book.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="author"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Author</FormLabel>
									<FormControl>
										<Input placeholder="J.K Rowling" {...field} />
									</FormControl>
									<FormDescription>
										Enter the name of the author of the book.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormDescription>
										Enter a short description of the book.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex justify-end">
							<Button type="submit">Add</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
