import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsOptional,
  IsObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: '12345',
    description: 'Portfolio ID associated with the project',
  })
  @IsNotEmpty()
  @IsString()
  portfolio_id: string;

  @ApiProperty({
    example: ['image1.jpg', 'image2.jpg'],
    description: 'Array of image URLs for the project',
  })
  @IsNotEmpty()
  @IsArray()
  images: string[];

  @ApiProperty({
    example: 'Awesome Project',
    description: 'Name of the project',
  })
  @IsNotEmpty()
  @IsString()
  projectname: string;

  @ApiProperty({
    example: ['Description line 1', 'Description line 2'],
    description: 'Array of project descriptions',
  })
  @IsNotEmpty()
  @IsArray()
  description: string[];

  @ApiProperty({
    example: ['Flutter', 'NestJS'],
    description: 'Array of technologies used in the project',
  })
  @IsNotEmpty()
  @IsArray()
  technologies: string[];

  @ApiProperty({
    example: { github: 'https://github.com/user/repo' },
    description: 'Links related to the project',
  })
  @IsNotEmpty()
  @IsObject()
  links: Record<string, any>;
}
