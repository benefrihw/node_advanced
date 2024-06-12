import { prisma } from '../utils/prisma.util.js'

export class AuthRepository {
    findUserById = async (userId) => {
        const user = await prisma.user.findUnique({
            where: { id: +userId },
        });
        return user;
    }
}