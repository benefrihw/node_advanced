import { AuthService } from '../services/auth.service.js';

export class AuthController {
    authService = new AuthService();

    signUpUser = async (req, res, next) => {
        try {
            const { email, password, name } = req.body;

            const user = await this.authService.createUser(
                email,
                password,
                name,
            );

            return res.status(200).json({ data: user });

        } catch (error) {
            next (error);
        };
    };

    signInUser = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await this.authService.findUser(
                email,
                password,
            );

            return res.status(200).json({ data: user });

        } catch (error) {
            next (error);
        };
    };
}