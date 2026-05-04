import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async createArticle(createArticleDto: CreateArticleDto) {
    // check first if user exists in users table, then if not throw an error, if yes then create the article
    const user = await this.prisma.users.findUnique({
      where: {
        id: createArticleDto.authorId,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return await this.prisma.articles.create({
      data: {
        ...createArticleDto,
      },
    });


  }



}
