import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    try {
      const [existingEmail, existingUsername] = await Promise.all([
        this.prisma.user.findUnique({
          where: { email: createUserDto.email },
        }),
        this.prisma.user.findUnique({
          where: { username: createUserDto.username }
        }),
      ]);
  
      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }
    
      if (existingUsername) {
        throw new ConflictException('Username already exists');
      }   
      
      return await this.prisma.user.create({
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
    } catch (error) {
      this.handlePrismaError(error, 'Email or username already exists');
    }
  }

  private handlePrismaError(error: unknown, message: string): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException(message);
    }

    throw error;
  }
}
