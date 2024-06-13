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
            content
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
}