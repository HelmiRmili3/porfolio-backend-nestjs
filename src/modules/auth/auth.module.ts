import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'abcd123',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, SupabaseService], // Add SupabaseService here
  controllers: [AuthController],
})
export class AuthModule {}
