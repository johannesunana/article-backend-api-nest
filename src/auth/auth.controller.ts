import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginEmailDto } from 'src/users/dto/login-email.dto';
import { LoginUsernameDto } from 'src/users/dto/login-username.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginEmailDto | LoginUsernameDto) {
    return await this.authService.login(loginDto);
  }

}
