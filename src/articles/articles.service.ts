import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async createArticle(createArticleDto: CreateArticleDto) {
   const user = await this.prisma.users.findUnique({
      where: {
        id: createArticleDto.authorId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.prisma.articles.create({
      data: {
        ...createArticleDto,
      },
    });
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
    const data: {
      title?: string;
      description?: string;
      body?: string;
    } = {};

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

    if (updateArticleDto.body !== undefined &&
      updateArticleDto.body !== null
    ) {
      data.body = updateArticleDto.body;
    }

    if (Object.keys(data).length === 0) {
      return article;
    }

    return await this.prisma.articles.update({
      where: {
        id,
      },
      data,
    });
  }

}
