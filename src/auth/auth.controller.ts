import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginEmailDto } from 'src/users/dto/login-email.dto';
import { LoginUsernameDto } from 'src/users/dto/login-username.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginEmailDto | LoginUsernameDto) {
    return await this.authService.login(loginDto);
  }
}
