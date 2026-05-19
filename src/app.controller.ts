import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './public/public.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @ApiExcludeEndpoint()
  @Get()
  getRoot() {
    return {
      message: 'Article Backend API'
    };
  }
}
