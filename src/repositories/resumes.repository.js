import { prisma } from '../utils/prisma.util.js';

export class ResumeRepository {
  // 이력서 생성
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

  // 이력서 목록 조회
  findAllResumes = async (authorId) => {
    const resumes = await prisma.resume.findMany({
      where: {
        authorId,
      },
    });
    return resumes;
  };

  // 이력서 상세 조회
  findResumeById = async (authorId, id) => {
    const resume = await prisma.resume.findFirst({
      where: {
        authorId: +authorId,
        id: +id,
      },
    });
    return resume;
  };

  // 이력서 수정
  updateResume = async (authorId, id, title, content) => {
    const updatedResume = await prisma.resume.update({
      where: {
        authorId: +authorId,
        id: +id,
      },
      data: {
        title,
        content,
      },
    });
    return updatedResume;
  };

  // 이력서 삭제
  deleteResume = async (authorId, id) => {
    const deletedResume = await prisma.resume.delete({
      where: {
        authorId: +authorId,
        id: +id,
      },
    });
    return deletedResume;
  };
}
