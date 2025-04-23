import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Use validation pipes globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  /**
   * swagger configuration
   */
  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('NestJS API - Blog app API')
    .setDescription('NestJS API description')
    .setTermsOfService('http://localhost:3300/terms-of-service')
    .setLicense('MIT', 'http://localhost:3300/license')
    .addServer('http://localhost:3300', 'Development server')
    .build();
  // Instaniate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3300);
}
bootstrap();
