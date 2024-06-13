import { prisma } from '../utils/prisma.util.js';

export class ResumeRepository {
  createResume = async (authorId, title, content) => {
    const createdResume = await prisma.resume.create({
      data: {
        author: {
          connect: { id: authorId },
        },
        title,
        content,
      },
    });
    return createdResume;
  };

  findAllResumes = async (authorId) => {
    const resumes = await prisma.resume.findMany({
      where: {
        authorId,
      },
    });
    return resumes;
  };

  findResumeById = async (authorId, id) => {
    const resume = await prisma.resume.findFirst({
      where: {
        authorId: +authorId,
        id: +id,
      },
    });
    return resume;
  };
}
