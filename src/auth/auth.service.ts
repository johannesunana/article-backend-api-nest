import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoginEmailDto } from '../users/dto/login-email.dto';
import { LoginUsernameDto } from '../users/dto/login-username.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(loginDto: LoginEmailDto | LoginUsernameDto) {
    let user;

    // use user service and prisma to check if user exists and password is correct
    if ('email' in loginDto) {
      user = await this.prisma.user.findUnique({
        where: { email: loginDto.email },
      });
    } else {
      user = await this.prisma.user.findUnique({
        where: { username: loginDto.username },
      });
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };

  }
}
