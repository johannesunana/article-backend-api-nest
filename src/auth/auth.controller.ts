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
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
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
      },
      username: {
        summary: 'Login using username',
        value: {
          username: 'username123',
          password: 'password123'
        } as LoginUsernameDto
      }
    }
  })
  @ApiOkResponse({
    description: 'User authenticated successfully.',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email/username or password.',
    schema: {
      example: {
        message: 'Invalid credentials',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginEmailDto | LoginUsernameDto) {
    return await this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Verify the authenticated user token',
  })
  @ApiOkResponse({
    description: 'Authenticated user details returned successfully.',
    schema: {
      example: {
        sub: 1,
        email: 'email@example.com',
        username: 'username',
        iat: 1710000000,
        exp: 1710003600,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'User token is invalid or expired.',
    schema: {
      example: {
        message: 'Token expired',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @Get('verify')
  verify(@Req() req) {
    return req.user;
  }
}
