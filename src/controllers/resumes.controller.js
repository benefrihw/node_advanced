import { ResumeService } from '../services/resumes.service.js';

export class ResumeController {
    resumeService = new ResumeService();

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

            return res.status(200).json({ date: resume });
        } catch (error) {
            next (error);
        };
    };

    getResumes = async (req, res, next) => {
        try {
            const user = req.user;
            const authorId = user.id;

            const resumes = await this.resumeService.findAllResumes(
                authorId,
            );

            return res.status(200).json({ date: resumes});
        } catch (error) {
            next (error);
        };
    };
}