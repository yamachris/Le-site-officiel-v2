import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configuration CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:4100'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(new ValidationPipe());
  
  const port = process.env.PORT || 4101;
  const host = process.env.HOST || '0.0.0.0';
  
  await app.listen(port, host);
  console.log(`Application is running on: ${host}:${port}`);
}
bootstrap();
