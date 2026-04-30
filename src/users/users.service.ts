import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const existingEmail = await this.prisma.users.findUnique({
      where: {
        email: createUserDto.email,
      },
    });
  
    const existingUsername = await this.prisma.users.findUnique({
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

    return await this.prisma.users.create({
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

  findAll() {
    return this.prisma.users.findMany();
  }
}
