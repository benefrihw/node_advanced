import { ResumeService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumeController {
  resumeService = new ResumeService();

  // 이력서 생성
  createResume = async (req, res, next) => {
    try {
      const user = req.user;
      const { title, content } = req.body;
      const authorId = user.id;

      const resume = await this.resumeService.createResume(
        authorId,
        title,
        content,
      );

      return res.status(200).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 목록 조회
  getResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const resumes = await this.resumeService.findAllResumes(authorId);

      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data: resumes,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 상세 조회
  getResumeById = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;

      const resume = await this.resumeService.findResumeById(authorId, id);

      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 수정
  updateResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;
      const { title, content } = req.body;

      const resume = await this.resumeService.updateResume(
        authorId,
        id,
        title,
        content,
      );

      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  };

  // 이력서 삭제
  deleteResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;
      const { id } = req.params;

      const resume = await this.resumeService.deleteResume(authorId, id);

      return res.status(200).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        data: resume,
      });
    } catch (error) {
      next(error);
    }
  };
}
