import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class UpdateExperienceDto {
  @ApiProperty({
    example: '7cc63bfb-4c85-4a5c-8b3a-d0faafe821cd',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ example: 'https://example.com/logo.png' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  companylogo: string;

  @ApiProperty({ example: 'Example Company' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  companyname: string;

  @ApiProperty({ example: 'Responsible for leading the development team.' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: '2022-01-01' })
  @IsDateString()
  @IsOptional()
  @IsNotEmpty()
  datestart: string;

  @ApiProperty({ example: '2023-01-01' })
  @IsDateString()
  @IsOptional()
  @IsNotEmpty()
  dateend: string;
}
