import { AuthService } from '../services/auth.service.js';

export class UsersController {
  authService = new AuthService();

  // 사용자 정보 조회
  getUserById = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await this.authService.findUserById(userId);

      return res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };
}
