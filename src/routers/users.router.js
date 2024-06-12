import express from 'express';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { UsersController } from '../controllers/users.controller.js';

const usersRouter = express.Router();

// UserController의 인스턴스 생성
const usersController = new UsersController();

/** 내 정보 조회 API */
usersRouter.get('/me', requireAccessToken, usersController.getUserById);


export { usersRouter };
