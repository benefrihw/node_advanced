import { ResumeRepository } from '../repositories/resumes.repository.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/validators/updated-resume-validator.middleware.js';

export class ResumeService {
  resumeRepository = new ResumeRepository();

  createResume = async (authorId, title, content) => {
    const createdUser = await this.resumeRepository.createResume(
      authorId,
      title,
      content,
    );
    return {
      status: HTTP_STATUS.CREATED,
      message: MESSAGES.RESUMES.CREATE.SUCCEED,
      id: createdUser.id,
      authorId: createdUser.authorId,
      title: createdUser.title,
      content: createdUser.content,
      status: createdUser.status,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
  };

  findAllResumes = async (authorId) => {
    const resumes = await this.resumeRepository.findAllResumes(authorId);
    if (!resumes) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.NOT_FOUND,
      };
    }

    resumes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return resumes.map((resume) => {
      return {
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        id: resume.id,
        authorId: resume.authorId,
        title: resume.title,
        content: resume.content,
        status: resume.status,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };

  findResumeById = async (authorId, id) => {
    const resume = await this.resumeRepository.findResumeById(authorId, id);
    if (!resume) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.NOT_FOUND,
      };
    }

    return {
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
      id: resume.id,
      authorId: resume.authorId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };

  updateResume = async (authorId, id, title, content) => {
    const resume = await this.resumeRepository.updateResume(
      authorId,
      id,
      title,
      content,
    );
    if (!resume) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.NOT_FOUND,
      };
    }

    if (!title && !content) {
      return {
        status: HTTP_STATUS.BAD_REQUEST,
        message: MESSAGES.RESUMES.UPDATE.NO_BODY_DATA,
      };
    }

    return {
      status: HTTP_STATUS.OK,
      message: MESSAGES.RESUMES.UPDATE.SUCCEED,
      id: resume.id,
      authorId: resume.authorId,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };

  deleteResume = async (authorId, id) => {
    const resume = await this.resumeRepository.deleteResume(
        authorId,
        id,
    );
    if (!resume) {
        return {
          status: HTTP_STATUS.NOT_FOUND,
          message: MESSAGES.RESUMES.NOT_FOUND,
        };
      };

      return {
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        id: resume.id,
      };
  };
}
