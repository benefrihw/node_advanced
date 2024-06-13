import { ResumeRepository } from '../repositories/resumes.repository.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumeService {
  resumeRepository = new ResumeRepository();

  // 이력서 생성
  createResume = async (authorId, title, content) => {
    const createdUser = await this.resumeRepository.createResume(
      authorId,
      title,
      content,
    );
    return createdUser;
  };

  // 이력서 목록 조회
  findAllResumes = async (authorId) => {
    const resumes = await this.resumeRepository.findAllResumes(authorId);
    if (!resumes) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.NOT_FOUND,
        date: [],
      };
    }

    resumes.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return resumes;
  };

  // 이력서 상세조회
  findResumeById = async (authorId, id) => {
    const resume = await this.resumeRepository.findResumeById(authorId, id);
    if (!resume) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.NOT_FOUND,
      };
    }
    return resume;
  };

  // 이력서 수정
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

    return resume;
  };

  // 이력서 삭제
  deleteResume = async (authorId, id) => {
    const resume = await this.resumeRepository.deleteResume(authorId, id);
    if (!resume) {
      return {
        status: HTTP_STATUS.NOT_FOUND,
        message: MESSAGES.RESUMES.NOT_FOUND,
      };
    }

    return { id: resume.id };
  };
}
