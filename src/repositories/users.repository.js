import { prisma } from '../utils/prisma.util.js'

export class AuthRepository {
    findUserById = async (userId) => {
        const user = await prisma.user.findUnique({
            where: { id: +userId },
        });
        return user;
    };

    findUnique = async (email) => {
        const existedUser = await prisma.user.findUnique({
            where: { email },
        });
        return existedUser;
    }

    createUser = async (email, password, name) => {
        const createdUser = await prisma.user.create({
            data: {
                email,
                password,
                name,
            },
        });
        return createdUser;
    };

    middlewareById = async (id) => {
        const user = await prisma.user.findUnique({
            where: { id },
            omit: { password: true },
        });
        return user;
    };
    
}