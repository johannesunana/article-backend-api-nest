import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginEmailDto } from './dto/login-email.dto';
import { LoginUsernameDto } from './dto/login-username.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const existingEmail = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
  
    const existingUsername = await this.prisma.user.findUnique({
      where: {
        username: createUserDto.username,
      },
    });
  
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }
  
    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }   

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
  
  async loginEmail(loginDto: LoginEmailDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginDto.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async loginUsername(loginDto: LoginUsernameDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: loginDto.username,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }

  async login(loginDto: LoginEmailDto | LoginUsernameDto) {
    if ('email' in loginDto) {
      return this.loginEmail(loginDto);
    }
    return this.loginUsername(loginDto);
  }
  
  findAll() {
    return this.prisma.user.findMany();
  }
}
