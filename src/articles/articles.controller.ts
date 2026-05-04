import { Body, Controller, Get, MethodNotAllowedException, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticleDto } from './dto/get-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService
  ) {}

  @Post('create')
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.createArticle(createArticleDto);
  }

  @Patch('update')
  async update(@Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.updateArticle(updateArticleDto.id, updateArticleDto);
  }

  @Post('update')
  async updateWithPost() {
    throw new MethodNotAllowedException('Use PATCH /articles/update');
  }
  
  @Get()
  async list() {
    return await this.articlesService.listArticles();
  }

  @Post('get')
  async getArticle(@Body() getArticleDto: GetArticleDto) {
    return await this.articlesService.getArticle(getArticleDto);
  }

  @Get('get')
  async getArticleWithGet() {
    throw new MethodNotAllowedException('Use POST /articles/get');
  }
  
}
