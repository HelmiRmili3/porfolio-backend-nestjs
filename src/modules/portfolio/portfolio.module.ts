import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

import { SupabaseModule } from 'src/supabase/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [SupabaseModule, ConfigModule],
  controllers: [PortfolioController],
  providers: [PortfolioService, CloudinaryService],
})
export class PortfolioModule {}
