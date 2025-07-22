import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsNotEmpty()
  @IsString()
  portfolio_id: string;

  @IsNotEmpty()
  @IsString()
  personphoto: string;

  @IsNotEmpty()
  @IsString()
  personname: string;

  @IsNotEmpty()
  @IsString()
  testimonial: string;

  @IsNotEmpty()
  @IsString()
  websitelink: string;
}
