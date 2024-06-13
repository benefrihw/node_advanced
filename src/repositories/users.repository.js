import { prisma } from '../utils/prisma.util.js';

export class AuthRepository {
  // 사용자 정보 조회
  findUserById = async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: +userId },
    });
    return user;
  };

  // email 중복확인
  findUnique = async (email) => {
    const existedUser = await prisma.user.findUnique({
      where: { email },
    });
    return existedUser;
  };

  // 회원가입
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

  // 인증 미들웨어
  middlewareById = async (id) => {
    const user = await prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
    return user;
  };
}
