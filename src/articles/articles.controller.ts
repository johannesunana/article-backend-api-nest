import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticleDto } from './dto/get-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';
import { Public } from 'src/public/public.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('create')
  async create(@Req() req, @Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.createArticle(
      createArticleDto,
      req.user.sub,
    );
  }

  @Patch('update')
  async update(@Req() req, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.updateArticle(
      updateArticleDto,
      req.user.sub,
    );
  }

  @Public()
  @Get()
  async list() {
    return await this.articlesService.listArticles();
  }

  @Public()
  @Post('get')
  @HttpCode(200)
  async getArticle(@Body() getArticleDto: GetArticleDto) {
    return await this.articlesService.getArticle(getArticleDto);
  }

  @Delete()
  @HttpCode(204)
  async deleteArticle(
    @Req() req,
    @Body() deleteArticleDto: DeleteArticleDto,
  ): Promise<void> {
    await this.articlesService.deleteArticle(deleteArticleDto, req.user.sub);
  }
}
