import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginEmailDto } from './dto/login-email.dto';
import { LoginUsernameDto } from './dto/login-username.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginEmailDto | LoginUsernameDto,
  ) {
    return await this.authService.login(loginDto);
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verify(@Req() req: any) {
    return await this.authService.verify(req);
  }
}
