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
import { Public } from 'src/public/public.decorator';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  getSchemaPath
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @ApiOperation({
    summary: 'Authenticate a user'
  })
  @ApiExtraModels(LoginEmailDto, LoginUsernameDto )
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(LoginEmailDto) },
        { $ref: getSchemaPath(LoginUsernameDto) },
      ],
    },
    examples: {
      email: {
        summary: 'Login using email address',
        value: {
          email: 'email@solx.ph',
          password: 'password123'
        } as LoginEmailDto
      }
    }
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginEmailDto | LoginUsernameDto) {
    return await this.authService.login(loginDto);
  }

  @Get('verify')
  verify(@Req() req) {
    return req.user;
  }
}
