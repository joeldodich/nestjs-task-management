import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.NODE_ENV)
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
