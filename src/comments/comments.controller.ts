import { Body, Controller, Delete, Get, HttpCode, Patch, Post, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { Public } from 'src/public/public.decorator';
import { GetCommentDto } from './dto/get-comment.dto';

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

  @Public()
  @Get()
  async list() {
    return await this.commentsService.listComments();
  }

  @Public()
  @Post('get')
  @HttpCode(200)
  async getComment(@Body() getCommentDto: GetCommentDto) {
    return await this.commentsService.getComment(getCommentDto);
  }

  @Delete()
  @HttpCode(204)
  async deleteComment(@Req() req, @Body() deleteCommentDto: DeleteCommentDto) {
    await this.commentsService.deleteComment(
      deleteCommentDto,
      req.user.sub
    );
  }
}

