import { prisma } from "@/lib/prisma";

async function getUserById(id: string) {
	return await prisma.user.findUnique({ where: { id } });
}

async function getUserByOAuthID(oAuthID: string) {
	const user = await prisma.user.findFirst({ where: { oAuthID } });

	return user;
}

async function createUser(oAuthID: string) {
	return await prisma.user.create({ data: { oAuthID } });
}

async function deleteUser(id: string) {
	return await prisma.user.delete({ where: { id } });
}

export { getUserById, createUser, deleteUser, getUserByOAuthID };
