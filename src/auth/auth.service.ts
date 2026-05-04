import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginEmailDto } from './dto/login-email.dto';
import { LoginUsernameDto } from './dto/login-username.dto';
import * as bcrypt from 'bcrypt';

type JwtPayload = {
  sub: number;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(
    loginDto: LoginEmailDto | LoginUsernameDto,
  ) {
    let user;

    if ('email' in loginDto) {
      user = await this.prisma.users.findUnique({
        where: { email: loginDto.email },
      });
    } else {
      user = await this.prisma.users.findUnique({
        where: { username: loginDto.username },
      });
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      username: user.username,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verify(req: any) {
    // use jwt to verify token and return user info
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);

      return {
        id: decoded.sub,
        email: decoded.email,
        username: decoded.username,
        issuedAt: decoded.iat ?? 0,
        expiresAt: decoded.exp ?? 0,
      };
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
