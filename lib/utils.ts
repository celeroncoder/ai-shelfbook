import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { axios } from "./axios";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/server";
import {
	KindeOrganization,
	KindePermissions,
} from "@kinde-oss/kinde-auth-nextjs";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function getKindeSession() {
	return (await axios.get("/kindeSession")).data as {
		user: KindeUser;
		authenticated: boolean;
		permissions: KindePermissions;
		organization: KindeOrganization;
	};
}

export function getExtension(fname: string) {
	return fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1);
}
