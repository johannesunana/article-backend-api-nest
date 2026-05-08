import { Body, Controller, Patch, Post, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment';
import { UpdateCommentDto } from './dto/update-comment';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService
  ) {}
  
  @Post('create')
  async create(@Req() req, @Body() createCommentDto: CreateCommentDto) {
    return await this.commentsService.createComment(
      createCommentDto,
      req.user.sub
    );
  }

  @Patch('update')
  async update(@Req() req, @Body() updateCommentDto: UpdateCommentDto) {
    return await this.commentsService.updateComment(
      updateCommentDto,
      req.user.sub
    );
  }
}

