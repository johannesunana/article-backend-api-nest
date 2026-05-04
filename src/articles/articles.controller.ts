import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

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
  
}
