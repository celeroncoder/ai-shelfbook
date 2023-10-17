import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function LoginPage() {
	return (
		<main className="bg-background flex items-center justify-center h-screen">
			<Card>
				<CardHeader>
					<CardTitle>Login to AI Shelfbook</CardTitle>
					<CardDescription>
						Get Started with AI Shelfbook by logging in with your Kinde account.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-row items-center justify-center gap-4 py-4 px-8">
					<Button>
						<LoginLink>Login</LoginLink>
					</Button>
					<p className="text-sm opacity-50">-OR-</p>
					<Button>
						<RegisterLink>Create Account</RegisterLink>
					</Button>
				</CardContent>
			</Card>
		</main>
	);
}
