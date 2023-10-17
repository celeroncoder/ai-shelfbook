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

async function increaseDownloadCount(id: string) {
	return await prisma.user.update({
		where: { id },
		data: {
			downloadCount: {
				increment: 4,
			},
		},
	});
}

async function decreaseDownloadCount(oAuthID: string) {
	return await prisma.user.update({
		where: { oAuthID },
		data: {
			downloadCount: {
				decrement: 1,
			},
		},
	});
}

export {
	getUserById,
	createUser,
	deleteUser,
	getUserByOAuthID,
	increaseDownloadCount,
	decreaseDownloadCount,
};
