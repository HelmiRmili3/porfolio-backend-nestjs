import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Param('username') username: string,
    @Param('password') password: string,
  ) {
    const user = await this.authService.validateUser(username, password);
    console.log('user : ', user);
    return this.authService.login(user);
  }
}
