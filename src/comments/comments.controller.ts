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
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { Public } from 'src/public/public.decorator';
import { GetCommentDto } from './dto/get-comment.dto';
import { ListArticleCommentsDto } from './dto/list-article-comments.dto';
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

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create a new comment',
  })
  @ApiBody({ type: CreateCommentDto })
  @ApiCreatedResponse({
    description: 'Comment created successfully.',
    schema: {
      example: {
        id: 1,
        body: 'This article was really helpful.',
        authorId: 7,
        articleId: 3,
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
    description: 'User or article not found.',
    schema: {
      example: {
        message: 'User or article not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Post('create')
  async create(@Req() req, @Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.createComment(
      createCommentDto,
      req.user.sub,
    );
  }
  
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update a comment',
  })
  @ApiBody({ type: UpdateCommentDto })
  @ApiOkResponse({
    description: 'Comment updated successfully.',
    schema: {
      example: {
        id: 1,
        body: 'Updated comment body.',
        authorId: 7,
        articleId: 3,
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
    description: 'User is not allowed to edit this comment.',
    schema: {
      example: {
        message: 'You are not allowed to edit this comment',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Comment not found.',
    schema: {
      example: {
        message: 'Comment not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Patch('update')
  async update(@Req() req, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentsService.updateComment(
      updateCommentDto,
      req.user.sub,
    );
  }

  @Public()
  @ApiOperation({
    summary: 'Get all comments',
  })
  @ApiOkResponse({
    description: 'Comments retrieved successfully.',
    schema: {
      example: [
        {
          id: 1,
          body: 'This article was really helpful.',
          authorId: 7,
          articleId: 3,
          createdAt: '2026-05-19T00:00:00.000Z',
          updatedAt: '2026-05-19T00:00:00.000Z',
        },
      ],
    },
  })
  @Get()
  async list() {
    return await this.commentsService.listComments();
  }

  @Public()
  @ApiOperation({
    summary: 'Get a single comment',
  })
  @ApiBody({ type: GetCommentDto })
  @ApiOkResponse({
    description: 'Comment retrieved successfully.',
    schema: {
      example: {
        id: 1,
        body: 'This article was really helpful.',
        authorId: 7,
        articleId: 3,
        createdAt: '2026-05-19T00:00:00.000Z',
        updatedAt: '2026-05-19T00:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Request body failed validation.',
  })
  @ApiNotFoundResponse({
    description: 'Comment not found.',
    schema: {
      example: {
        message: 'Comment not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Post('get')
  @HttpCode(200)
  async getComment(@Body() getCommentDto: GetCommentDto) {
    return await this.commentsService.getComment(getCommentDto);
  }

  @Public()
  @ApiOperation({
    summary: 'List comments from article',
  })
  @ApiBody({ type: ListArticleCommentsDto })
  @ApiOkResponse({
    description: 'Article comments retrieved successfully.',
    schema: {
      example: [
        {
          id: 1,
          body: 'This article was really helpful.',
          authorId: 7,
          articleId: 3,
          createdAt: '2026-05-19T00:00:00.000Z',
          updatedAt: '2026-05-19T00:00:00.000Z',
        },
      ],
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
  @Post('article')
  @HttpCode(200)
  async listCommentsFromArticle(
    @Body() listArticleCommentsDto: ListArticleCommentsDto,
  ) {
    return await this.commentsService.listCommentsFromArticle(
      listArticleCommentsDto,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete a comment',
  })
  @ApiBody({ type: DeleteCommentDto })
  @ApiNoContentResponse({
    description: 'Comment deleted successfully.',
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
    description: 'User is not allowed to delete this comment.',
    schema: {
      example: {
        message: 'You are not allowed to delete this comment',
        error: 'Forbidden',
        statusCode: 403,
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Comment not found.',
    schema: {
      example: {
        message: 'Comment not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Delete()
  @HttpCode(204)
  async deleteComment(@Req() req, @Body() deleteCommentDto: DeleteCommentDto) {
    await this.commentsService.deleteComment(deleteCommentDto, req.user.sub);
  }
}
