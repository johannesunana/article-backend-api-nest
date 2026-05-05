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

  async createArticle(createArticleDto: CreateArticleDto) {
    const data: Prisma.articlesCreateInput = {
      title: createArticleDto.title,
      description: createArticleDto.description,
      body: createArticleDto.body,
      author: {
        connect: {
          id: createArticleDto.authorId,
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
      return await this.prisma.articles.create({
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

  async updateArticle(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.authorId !== updateArticleDto.authorId) {
      throw new ForbiddenException('You are not allowed to edit this article');
    }

    const data: Prisma.articlesUpdateInput = {};

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
      return await this.prisma.articles.update({
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
    return this.prisma.articles.findMany({});
  }

  async getArticle(getArticleDto: GetArticleDto) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id: getArticleDto.id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async deleteArticle(deleteArticleDto: DeleteArticleDto) {
    const article = await this.prisma.articles.findUnique({
      where: {
        id: deleteArticleDto.id,
      },
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.authorId !== deleteArticleDto.authorId) {
      throw new ForbiddenException(
        'You are not allowed to delete this article',
      );
    }

    try {
      await this.prisma.articles.delete({
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
