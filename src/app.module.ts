import { Module } from '@nestjs/common';

import { SupabaseService } from './supabase/supabase.service';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { MulterModule } from '@nestjs/platform-express';
import { ImageController } from './cloudinary/image.controller';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development'],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    PortfolioModule,
    SupabaseModule,
  ],
  controllers: [ImageController],
  providers: [SupabaseService, CloudinaryService],
})
export class AppModule {}
