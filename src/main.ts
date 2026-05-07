import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import morgan from 'morgan';
import { AllExceptionsFilter } from './all-exceptions/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(morgan(':date[iso] - :method :url :status \(:response-time ms\)'));
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  app.useGlobalFilters(new AllExceptionsFilter);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
