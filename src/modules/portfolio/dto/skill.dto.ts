import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillDto {
  @ApiProperty({
    example: '12345',
    description: 'Portfolio ID associated with the skill',
  })
  @IsNotEmpty()
  @IsString()
  portfolio_id: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'Logo URL for the skill',
  })
  @IsNotEmpty()
  @IsString()
  logo: string;

  @ApiProperty({ example: 'JavaScript', description: 'Name of the skill' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
