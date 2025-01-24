import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Simulate a user database (replace with your actual DB logic)
  private users = [
    {
      id: 1,
      username: 'helmi',
      password: bcrypt.hash('password', 10), // Pre-hash passwords for testing
    },
  ];

  async validateUser(username: string, password: string) {
    const user = this.users.find((u) => u.username === username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      username: user.username,
      access_token: this.jwtService.sign(payload),
    };
  }
}
