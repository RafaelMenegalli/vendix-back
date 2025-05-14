import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades não esperadas
      forbidNonWhitelisted: true, // lança erro se vierem propriedades extras
      transform: true, // converte tipos automaticamente (ex: string -> number)
    }),
  );

  await app.enableCors({
    origin: process.env.CORS_ORIGIN?.split(',') || [], // permite o frontend acessar
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
