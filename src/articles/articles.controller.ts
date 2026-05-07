import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  MethodNotAllowedException,
  Patch,
  Post,
  Req
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { GetArticleDto } from './dto/get-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';
import { Public } from 'src/public/public.decorator';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService
  ) {}

  @Post('create')
  async create(
    @Req() req,
    @Body() createArticleDto: CreateArticleDto
  ) {
    return await this.articlesService.createArticle(
      createArticleDto,
      req.user.sub
    );
  }
  
  @Patch('update')
  async update(
    @Req() req,
    @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.updateArticle(
      updateArticleDto.id,
      updateArticleDto,
      req.user.sub
    );
  }

  @Public()
  @Post('update')
  async updateWithPost() {
    throw new MethodNotAllowedException('Use PATCH /articles/update');
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

  @Public()
  @Get('get')
  async getArticleWithGet() {
    throw new MethodNotAllowedException('Use POST /articles/get');
  }
  
  @Delete()
  @HttpCode(204)
  async deleteArticle(
    @Req() req,
    @Body() deleteArticleDto: DeleteArticleDto): Promise<void> {
    await this.articlesService.deleteArticle(
      deleteArticleDto,
      req.user.sub
    );
  }

}
