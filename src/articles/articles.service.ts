import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';
import { GetArticleDto } from './dto/get-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async createArticle(createArticleDto: CreateArticleDto, authorId: number) {
    const data: Prisma.ArticleCreateInput = {
      title: createArticleDto.title,
      description: createArticleDto.description,
      body: createArticleDto.body,
      author: {
        connect: {
          id: authorId,
        },
      },
    };

    if (createArticleDto.tags?.length) {
      data.tags = {
        connectOrCreate: createArticleDto.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      };
    }

    try {
      return await this.prisma.article.create({
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const exception = new NotFoundException('User not found');
        console.log(exception.getResponse());
        throw exception;
      }

      throw error;
    }
  }

  async updateArticle(
    id: number,
    updateArticleDto: UpdateArticleDto,
    authorId: number,
  ) {
    const article = await this.prisma.article.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.authorId !== authorId) {
      throw new ForbiddenException('You are not allowed to edit this article');
    }

    const data: Prisma.ArticleUpdateInput = {};

    if (updateArticleDto.tags?.length) {
      data.tags = {
        connectOrCreate: updateArticleDto.tags.map((tag) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      };
    }

    if (
      updateArticleDto.title !== undefined &&
      updateArticleDto.title !== null
    ) {
      data.title = updateArticleDto.title;
    }

    if (
      updateArticleDto.description !== undefined &&
      updateArticleDto.description !== null
    ) {
      data.description = updateArticleDto.description;
    }

    if (
      updateArticleDto.body !== undefined &&
      updateArticleDto.body !== null
    ) {
      data.body = updateArticleDto.body;
    }

    if (Object.keys(data).length === 0) {
      return article;
    }

    try {
      return await this.prisma.article.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const exception = new NotFoundException('Article not found');
        console.log(exception.getResponse());
        throw exception;
      }

      throw error;
    }
  }

  async listArticles() {
    return this.prisma.article.findMany({});
  }

  async getArticle(getArticleDto: GetArticleDto) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: getArticleDto.id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async deleteArticle(deleteArticleDto: DeleteArticleDto, authorId: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id: deleteArticleDto.id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.authorId !== authorId) {
      throw new ForbiddenException(
        'You are not allowed to delete this article',
      );
    }

    try {
      await this.prisma.article.delete({
        where: {
          id: deleteArticleDto.id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        const exception = new NotFoundException('Article not found');
        console.log(exception.getResponse());
        throw exception;
      }

      throw error;
    }
  }
}
