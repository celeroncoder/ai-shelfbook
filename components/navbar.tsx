import { BookOpen, LogIn, LogOut } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { KindeUser, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { Suspense } from "react";
import Link from "next/link";
import { getUserByOAuthID } from "@/service/user";
import { DownloadsLeft } from "./downloads-left";

export async function Navbar({
	isAuthenticated,
	user,
}: {
	isAuthenticated: boolean;
	user?: KindeUser;
}) {
	const dbUser = await getUserByOAuthID(user?.id!);

	if (!dbUser) return null;

	return (
		<Suspense>
			<header className="py-4 px-6 border-b-2 border-b-slate-200 flex items-center justify-between">
				<Link
					href={"/"}
					className="flex items-center justify-center gap-2 flex-nowrap"
				>
					<BookOpen className="w-6 h-6" />
					<h1 className="font-bold text-xl select-none whitespace-nowrap">
						AI ShelfBook
					</h1>
				</Link>
				<div className="flex gap-2 items-center">
					{isAuthenticated && user && (
						<Button
							variant={"outline"}
							className="flex gap-2 items-center justify-between"
						>
							<img className="rounded-full w-6 h-6" src={user.picture || ""} />
							<p className="text-sm text-muted-foreground">
								Hey, {user.given_name}
							</p>
						</Button>
					)}

					<DownloadsLeft downloadCount={dbUser.downloadCount} />

					{!isAuthenticated ? (
						<a href="/login">
							<Button className="flex items-center gap-2">
								<LogIn className="w-4" />
								Log In
							</Button>
						</a>
					) : (
						<Button variant={"secondary"}>
							<LogoutLink className="flex gap-2">
								<LogOut className="h-4 w-4" />
								<p className="">Log Out</p>
							</LogoutLink>
						</Button>
					)}
					<ModeToggle />
				</div>
			</header>
		</Suspense>
	);
}
