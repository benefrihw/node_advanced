import { AuthRepository } from '../repositories/users.repository.js';

export class AuthService {
    authrepository = new AuthRepository();

    findUserById = async (userId) => {
        const user = await this.authrepository.findUserById(userId);

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    };
}