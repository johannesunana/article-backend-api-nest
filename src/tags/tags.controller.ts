import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/public/public.decorator';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Public()
  @Get()
  async list() {
    return await this.tagsService.listTags();
  }
}
