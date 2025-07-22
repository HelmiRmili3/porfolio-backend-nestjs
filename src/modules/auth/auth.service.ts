// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { SignUpDto } from './dto/signup.sto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(private supabaseService: SupabaseService) {}

  async signIn(signInDto: SignInDto) {
    return this.supabaseService.signInWithEmail(signInDto);
  }

  async signUp(signUpDto: SignUpDto) {
    return this.supabaseService.signUpNewUser(signUpDto);
  }

  async logout() {
    return this.supabaseService.logout();
  }
}
