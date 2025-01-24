// src/register.globals.ts
import { ValidationPipe } from '@nestjs/common';

export async function registerGlobals(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out non-whitelisted properties
      forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );
}
