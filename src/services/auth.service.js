import { AuthRepository } from '../repositories/users.repository.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class AuthService {
    authRepository = new AuthRepository();

    findUserById = async (userId) => {
        const user = await this.authRepository.findUserById(userId);

        return {
            status: HTTP_STATUS.OK,
            message: MESSAGES.USERS.READ_ME.SUCCEED,
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
    };

    createUser = async (email, password, name) => {
        const existedUser = await this.authRepository.findUnique(email);
        if(existedUser) {
            return {
                status: HTTP_STATUS.CONFLICT,
                message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
            }                
               };        
        const createdUser = await this.authRepository.createUser(
            email,
            name,
            password,
        );
        return {
            status: HTTP_STATUS.CREATED,
            message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
            id: createdUser.id,
            email: createdUser.email,
            name: createdUser.name,
            role: createdUser.role,
            createdAt: createdUser.createdAt,
            updatedAt: createdUser.updatedAt,
        };
    };
}