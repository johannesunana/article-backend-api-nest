import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/public/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @ApiOperation({
    summary: 'Register a new user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User registered successfully.',
    schema: {
      example: {
        id: 1,
        email: 'email@solx.ph',
        username: 'username',
        createdAt: '2026-05-15T00:00:00.000Z',
        updatedAt: '2026-05-15T00:00:00.000Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Request body failed validation.',
    content: {
      'application/json': {
        examples: {
          invalidEmail: {
            summary: 'Invalid email',
            value: {
              message: ['invalid email format'],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          invalidUsername: {
            summary: 'Invalid username',
            value: {
              message: [
                'username must contain only letters, numbers, dots, underscores, and hyphens',
              ],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
          shortPassword: {
            summary: 'Short password',
            value: {
              message: ['password must be minimum eight (8) characters'],
              error: 'Bad Request',
              statusCode: 400,
            },
          },
        },
      },
    },
  })
  @ApiConflictResponse({
    description: 'email or username already exists.',
    schema: {
      example: {
        message: 'Email already exists',
        error: 'Conflict',
        statusCode: 409,
      },
    },
  })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.register(createUserDto);
  }
}
