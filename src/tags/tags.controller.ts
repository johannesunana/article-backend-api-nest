import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/public/public.decorator';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Public()
  @Get()
  async findAll() {
    return await this.tagsService.findAll();
  }
}
