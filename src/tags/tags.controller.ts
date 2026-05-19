import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/public/public.decorator';
import { TagsService } from './tags.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Public()
  @ApiOperation({
    summary: 'List all tags',
  })
  @ApiOkResponse({
    description: 'Tags retrieved successfully.',
    schema: {
      example: [
        {
          id: 1,
          name: 'backend',
        },
        {
          id: 2,
          name: 'nestjs',
        },
      ],
    },
  })
  @Get()
  async list() {
    return await this.tagsService.listTags();
  }
}
