import { AuthService } from '../services/auth.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class AuthController {
  authService = new AuthService();

  // 회원가입
  signUpUser = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      const user = await this.authService.createUser(email, password, name);

      return res.status(200).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

  // 로그인
  signInUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await this.authService.findUser(email, password);

      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: user
      });
    } catch (error) {
      next(error);
    }
  };
}
