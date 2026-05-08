import { Body, Controller, Post, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}
  
  @Post('create')
  async create(
    @Req() req,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return await this.commentsService.createComment(
      createCommentDto,
      req.user.sub
    );
  }

}

