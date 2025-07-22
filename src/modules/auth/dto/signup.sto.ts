import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securepassword123',
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'The URL of the user avatar',
    example: 'https://example.com/avatar.png',
  })
  @IsString({ message: 'Avatar URL must be a string' })
  @IsOptional()
  avatar_url?: string;

  @ApiProperty({
    description: 'The ID of the portfolio associated with the user',
    example: 1,
  })
  @IsOptional()
  portfolio_id?: number;
}
