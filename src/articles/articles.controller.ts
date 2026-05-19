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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new article',
  })
  @ApiBody({ type: CreateArticleDto })
  @ApiCreatedResponse({
    description: 'Article created successfully.',
    schema: {
      example: {
        id: 1,
        title: 'Getting started with NestJS',
        description: 'A quick introduction to building APIs with NestJS.',
        body: 'This article walks through the basics of modules and controllers.',
        authorId: 7,
        createdAt: '2026-05-19T00:00:00.000Z',
        updatedAt: '2026-05-19T00:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Request body failed validation.',
  })
  @ApiUnauthorizedResponse({
    description: 'User token is invalid or expired.',
    schema: {
      example: {
        message: 'Token expired',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
    schema: {
      example: {
        message: 'User not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Post('create')
  async create(@Req() req, @Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.createArticle(
      createArticleDto,
      req.user.sub,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update an existing article',
  })
  @ApiBody({ type: UpdateArticleDto })
  @ApiOkResponse({
    description: 'Article updated successfully.',
    schema: {
      example: {
        id: 1,
        title: 'Getting started with NestJS',
        description: 'Updated article description.',
        body: 'Updated article body.',
        authorId: 7,
        createdAt: '2026-05-19T00:00:00.000Z',
        updatedAt: '2026-05-19T01:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Request body failed validation.',
  })
  @ApiUnauthorizedResponse({
    description: 'User token is invalid or expired.',
    schema: {
      example: {
        message: 'Token expired',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not allowed to edit this article.',
    schema: {
      example: {
        message: 'You are not allowed to edit this article',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
    schema: {
      example: {
        message: 'Article not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Patch('update')
  async update(@Req() req, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.updateArticle(
      updateArticleDto,
      req.user.sub,
    );
  }

  @Public()
  @ApiOperation({
    summary: 'List all articles',
  })
  @ApiOkResponse({
    description: 'Articles retrieved successfully.',
    schema: {
      example: [
        {
          id: 1,
          title: 'Getting started with NestJS',
          description: 'A quick introduction to building APIs with NestJS.',
          body: 'This article walks through the basics of modules and controllers.',
          createdAt: '2026-05-19T00:00:00.000Z',
          updatedAt: '2026-05-19T00:00:00.000Z',
          author: {
            id: 7,
            username: 'username',
          },
          tags: ['nestjs', 'backend'],
        },
      ],
    },
  })
  @Get()
  async list() {
    return await this.articlesService.listArticles();
  }

  @Public()
  @ApiOperation({
    summary: 'Get a single article by id',
  })
  @ApiBody({ type: GetArticleDto })
  @ApiOkResponse({
    description: 'Article retrieved successfully.',
    schema: {
      example: {
        id: 1,
        title: 'Getting started with NestJS',
        description: 'A quick introduction to building APIs with NestJS.',
        body: 'This article walks through the basics of modules and controllers.',
        createdAt: '2026-05-19T00:00:00.000Z',
        updatedAt: '2026-05-19T00:00:00.000Z',
        author: {
          id: 7,
          username: 'username',
        },
        tags: ['nestjs', 'backend'],
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Request body failed validation.',
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
    schema: {
      example: {
        message: 'Article not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Post('get')
  @HttpCode(200)
  async getArticle(@Body() getArticleDto: GetArticleDto) {
    return await this.articlesService.getArticle(getArticleDto);
  }
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete an article',
  })
  @ApiBody({ type: DeleteArticleDto })
  @ApiNoContentResponse({
    description: 'Article deleted successfully.',
  })
  @ApiBadRequestResponse({
    description: 'Request body failed validation.',
  })
  @ApiUnauthorizedResponse({
    description: 'User token is invalid or expired.',
    schema: {
      example: {
        message: 'Token expired',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'User is not allowed to delete this article.',
    schema: {
      example: {
        message: 'You are not allowed to delete this article',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Article not found.',
    schema: {
      example: {
        message: 'Article not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Delete()
  @HttpCode(204)
  async deleteArticle(
    @Req() req,
    @Body() deleteArticleDto: DeleteArticleDto,
  ): Promise<void> {
    await this.articlesService.deleteArticle(deleteArticleDto, req.user.sub);
  }
}
