import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { VersioningType } from '@nestjs/common';
import fastifyCors from '@fastify/cors';
import { registerGlobals } from './register.globals';
import { configureSwagger } from './swagger.config';
import multipart from '@fastify/multipart'; // Import multipart

async function bootstrap() {
  // Create the NestJS application with Fastify
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Register the multipart plugin with configuration
  await app.register(multipart, {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50 MB file size limit (adjust as needed)
    },
    throwFileSizeLimit: true, // Throw an error if file size exceeds the limit
  });

  // Get the ConfigService instance
  const configService = app.get(ConfigService);

  // Enable CORS
  app.register(fastifyCors, {
    origin: '*', // Allow requests from any origin (update this in production)
    credentials: true, // Allow credentials (e.g., cookies)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  });

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Configure Swagger
  configureSwagger(app);

  // Register global configurations (e.g., validation pipes)
  await registerGlobals(app);

  // Get the port from the ConfigService or use a default value
  const port = configService.get<number>('PORT') || 4001;

  // Start the server
  await app.listen(port, '0.0.0.0');

  console.log(`Server is running on http://localhost:${port}`);
}

bootstrap();
