import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({
    example: '7cc63bfb-4c85-4a5c-8b3a-d0faafe821cd',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'https://example.com/my-cv.pdf' })
  @IsString()
  @IsOptional() // Optional, since this can be a file
  cvlink: string; // This will store the file path or URL

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @IsString()
  @IsOptional() // Optional, since this can be a file
  profilepicture: string; // This will store the file path or URL

  @ApiProperty({ example: 'Hello, I am a Software Developer!' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  greeting: string;

  @ApiProperty({ example: 'Passionate about coding and problem-solving.' })
  @IsString()
  @IsNotEmpty()
  bio: string;

  @ApiProperty({ example: 'USA' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Available for freelance projects' })
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty({ example: 'A bit about me' })
  @IsString()
  @IsNotEmpty()
  aboutphrase: string;

  @ApiProperty({ example: 'https://example.com/about.jpg' })
  @IsString()
  @IsOptional() // Optional, since this can be a file
  aboutpicture: string; // This will store the file path or URL

  @ApiProperty({
    example: 'I have 5 years of experience in software development...',
  })
  @IsString()
  @IsNotEmpty()
  aboutcontent: string;

  @ApiProperty({ example: 'My technical skills' })
  @IsString()
  @IsNotEmpty()
  skillsphrase: string;

  @ApiProperty({ example: 'My professional experience' })
  @IsString()
  @IsNotEmpty()
  experiencephrase: string;

  @ApiProperty({ example: 'Projects I have worked on' })
  @IsString()
  @IsNotEmpty()
  workphrase: string;

  @ApiProperty({ example: 'What people say about me' })
  @IsString()
  @IsNotEmpty()
  testimonialsphrase: string;

  @ApiProperty({ example: 'Get in touch' })
  @IsString()
  @IsNotEmpty()
  contactphrase: string;

  @ApiProperty({ example: '© 2024 Helmi Rmili. All rights reserved.' })
  @IsString()
  @IsNotEmpty()
  copyright: string;

  @ApiProperty({ example: 'Building the future, one app at a time.' })
  @IsString()
  @IsNotEmpty()
  slogan: string;
}
