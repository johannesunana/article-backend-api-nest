import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { FeatureModule } from './feature/feature.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    FeatureModule,
    AuthModule,
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
