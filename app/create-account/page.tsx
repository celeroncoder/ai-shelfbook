import { createUser, getUserById, getUserByOAuthID } from "@/service/user";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function CreateAccountPage() {
	const { isAuthenticated, getUser } = getKindeServerSession();

	const user = getUser();

	if (!isAuthenticated() || !user || !user.id) {
		redirect("/login");
	}

	const isAlreadyCreated = await getUserByOAuthID(user.id);

	if (isAlreadyCreated) {
		redirect("/");
	} else {
		const dbUser = await createUser(user.id);

		if (dbUser) {
			redirect("/");
		} else redirect("/login");
	}
}
