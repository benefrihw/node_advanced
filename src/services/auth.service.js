import { AuthRepository } from '../repositories/users.repository.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';

export class AuthService {
  authRepository = new AuthRepository();

  // 사용자 정보 조회
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

  // 회원가입
  createUser = async (email, password, name) => {
    const existedUser = await this.authRepository.findUnique(email);
    if (existedUser) {
      return {
        status: HTTP_STATUS.CONFLICT,
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      };
    }
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

  // 로그인
  findUser = async (email, password) => {
    const user = await this.authRepository.findUnique(email);

    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
      return {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      };
    }

    const payload = { id: user.id };
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });
    return {
      status: HTTP_STATUS.OK,
      message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
      accessToken,
    };
  };
}
