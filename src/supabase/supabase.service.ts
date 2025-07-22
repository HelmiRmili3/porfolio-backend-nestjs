import {
  Body,
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { Portfolio } from 'src/entities/portfolio.entity';
import { SignUpDto } from 'src/modules/auth/dto/signup.sto';
import { SignInDto } from 'src/modules/auth/dto/signin.dto';
import { CreatePortfolioDto } from 'src/modules/portfolio/dto/create-portfolio.dto';
import { CreateExperienceDto } from 'src/modules/portfolio/dto/experience.dto';
import { UpdateExperienceDto } from 'src/modules/portfolio/dto/update-exeperience.dto';
import { CreateSkillDto } from 'src/modules/portfolio/dto/skill.dto';
import { CreateProjectDto } from 'src/modules/portfolio/dto/project.dto';
import { CreateTestimonialDto } from 'src/modules/portfolio/dto/testimonial.dto';
import { CreateSocialMediaDto } from 'src/modules/portfolio/dto/social-media-account.dto';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseKey = this.configService.get<string>('SUPABASE_KEY');

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Supabase URL or Key not found in environment variables.',
      );
    }
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }
  async onModuleInit() {}

  // Porfolio methodes
  async getPorfolioById(id: string) {
    const { data, error } = await this.supabase
      .from('portfolio')
      .select(
        `
    *,
    projects (
      id, images, projectname, description, technologies, links
    ),
    contactform (
      id, portfolio_id, name, email, message, textbutton
    ),
    experiences (
      id, companylogo, companyname, content, datestart, dateend
    ),
    socialmedia (
      id, portfolio_id, icon, link
    ),
    technologies (
      id, portfolio_id, logo, name
    ),
    testimonials (
      id, portfolio_id, personphoto, personname, testimonial, websitelink
    )
  `,
      )
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error(`No portfolio found with ID: ${id}`);
    }

    return data;
  }
  // create portfolio

  async createPortfolio(@Body() portfolio: CreatePortfolioDto) {
    const { data, error } = await this.supabase
      .from('portfolio')
      .insert(portfolio)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  // update portfolio
  async updatePortfolio(id: string, portfolio: Portfolio) {
    const { data, error } = await this.supabase
      .from('portfolio')
      .update(portfolio)
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
  // delete portfolio
  async deletePortfolio(id: string) {
    const { data, error } = await this.supabase
      .from('portfolio')
      .delete()
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
  // skills
  // add skill
  async addSkill(skill: CreateSkillDto) {
    const { data, error } = await this.supabase
      .from('technologies')
      .insert(skill)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
  async deleteSkillById() {}
  async updateSkillById() {}

  // socialmedia
  // add social media account
  async addSocialMediaAccount(account: CreateSocialMediaDto) {
    const { data, error } = await this.supabase
      .from('socialmedia')
      .insert(account)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
  async deleteSocialMediaAccountById() {}
  async updateSocialMediaAccountById() {}

  // experience
  // add experience
  async addExperience(experience: CreateExperienceDto) {
    const { data, error } = await this.supabase
      .from('experiences')
      .insert(experience)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
  async updateExperienceById(experience: UpdateExperienceDto) {
    const { data, error } = await this.supabase
      .from('experiences')
      .update(experience)
      .eq('id', experience.id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async deleteExperienceById(id: String) {
    const { data, error } = await this.supabase
      .from('experiences')
      .delete()
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // projects
  // add project
  async addProject(project: CreateProjectDto) {
    const { data, error } = await this.supabase
      .from('projects')
      .insert(project)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
  async deleteProject() {}
  async updateProject() {}

  // testimonials
  // add testimonial
  async addTestimonial(testimonial: CreateTestimonialDto) {
    const { data, error } = await this.supabase
      .from('testimonials')
      .insert(testimonial)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }
  async deleteTestimonialById() {}
  async updateTestimonialById() {}

  // Authentication methodes
  async signInWithEmail(signInDto: SignInDto) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: signInDto.email,
      password: signInDto.password,
    });
    if (error) throw new Error(error.message);
    console.log(data);
    // Return the JWT
    return data;
  }

  async signUpNewUser(signUpDto: SignUpDto) {
    // Sign up the user with Supabase Auth
    const { data, error } = await this.supabase.auth.signUp({
      email: signUpDto.email,
      password: signUpDto.password,
    });

    if (error) throw new Error(error.message);

    // Add the user to the `users` table with optional fields
    const { data: _, error: userError } = await this.supabase
      .from('users')
      .insert([
        {
          id: data.user!.id,
          email: data.user!.email,
          username: signUpDto.username || null, // Optional field
          avatar_url: signUpDto.avatar_url || null, // Optional field
          portfolio_id: signUpDto.portfolio_id || null, // Optional field
        },
      ])
      .single();

    if (userError) {
      throw new HttpException(userError.message, HttpStatus.BAD_REQUEST);
    }

    // Fetch the newly created user without the password field
    const { data: fetchedUserData, error: fetchError } = await this.supabase
      .from('users')
      .select(
        'id, email, username, avatar_url, portfolio_id, created_at, updated_at',
      ) // Select only necessary fields
      .eq('id', data.user!.id)
      .single();

    if (fetchError) {
      throw new HttpException(fetchError.message, HttpStatus.BAD_REQUEST);
    }

    return fetchedUserData;
  }

  async logout() {
    const error = await this.supabase.auth.signOut();
    if (!error) throw Error(error);
    return null;
  }
}
