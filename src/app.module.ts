import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FeatureModule } from './feature/feature.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    UsersModule,
    FeatureModule,
    AuthModule,
    PrismaModule,
    ArticlesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
