// src/swagger.config.ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function configureSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('API for managing portfolio data')
    .setVersion('1.0')
    .addTag('portfolio')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
