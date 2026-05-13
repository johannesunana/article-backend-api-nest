import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { ListArticleCommentsDto } from './dto/list-article-comments.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto, authorId: number) {
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
      this.handlePrismaForeignKeyError(error, 'User or article not found');
    }
  }

  async updateComment(updateCommentDto: UpdateCommentDto, authorId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: updateCommentDto.id,
      },
    });
    
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== authorId) {
      throw new ForbiddenException('You are not allowed to edit this comment');
    }

    const data: Prisma.CommentUpdateInput = {
      body: updateCommentDto.body,
    };

    if (comment.body === updateCommentDto.body) {
      return comment;
    }

    try {
      return await this.prisma.comment.update({
        where: {
          id: updateCommentDto.id,
        },
        data,
      });
    } catch (error) {
      this.handlePrismaNotFoundError(error, 'Comment not found');
    }
  }

  async listComments() {
    return this.prisma.comment.findMany({});
  }

  async listCommentsFromArticle(
    listArticleCommentsDto: ListArticleCommentsDto
  ) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: listArticleCommentsDto.articleId,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return await this.prisma.comment.findMany({
      where: {
        articleId: listArticleCommentsDto.articleId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getComment(getCommentDto: GetCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: getCommentDto.id,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async deleteComment(deleteCommentDto: DeleteCommentDto, authorId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id: deleteCommentDto.id,
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== authorId) {
      throw new ForbiddenException('You are not allowed to delete this comment');
    }

    try {
      await this.prisma.comment.delete({
        where: {
          id: deleteCommentDto.id,
        },
      });
    } catch (error) {
      this.handlePrismaNotFoundError(error, 'Comment not found');
    }
  };

  private handlePrismaForeignKeyError(error: unknown, message: string): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2003'
    ) {
      throw new NotFoundException(message);
    }

    throw error;
  }

  private handlePrismaNotFoundError(error: unknown, message: string): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new NotFoundException(message);
    }

    throw error;
  }
}
