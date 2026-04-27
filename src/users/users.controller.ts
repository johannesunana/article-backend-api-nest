import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/auth/')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    return await this.usersService.login(loginDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
