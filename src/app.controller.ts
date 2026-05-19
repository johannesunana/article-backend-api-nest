import { Controller, Get } from '@nestjs/common';
import { Public } from './public/public.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Public()
  @ApiExcludeEndpoint()
  @Get()
  getRoot() {
    return {
      message: 'Article Backend API',
    };
  }
}
