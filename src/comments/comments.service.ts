import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    authorId: number
  ) {
    const data: Prisma.CommentCreateInput = {
      body: createCommentDto.body,
      author: {
        connect: {
          id: authorId,
        },
      },
      article: {
        connect: {
          id: createCommentDto.articleId
        },
      },
    } 
    
    try {
      return await this.prisma.comment.create({
        data,
      });
    } catch (error) {
      this.handlePrismaError(error, 'User or article not found');
    }
  }

  private handlePrismaError(error: unknown, message: string): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2003'
    ) {
      throw new NotFoundException(message);
    }

    throw error;
  }
}

