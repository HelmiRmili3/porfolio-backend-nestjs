// src/portfolio/portfolio.service.ts
import { Injectable } from '@nestjs/common';
import { Portfolio } from 'src/entities/portfolio.entity';
import { SupabaseService } from 'src/supabase/supabase.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { CreateExperienceDto } from './dto/experience.dto';
import { UpdateExperienceDto } from './dto/update-exeperience.dto';
import { CreateSkillDto } from './dto/skill.dto';
import { CreateSocialMediaDto } from './dto/social-media-account.dto';
import { CreateProjectDto } from './dto/project.dto';
import { CreateTestimonialDto } from './dto/testimonial.dto';

@Injectable()
export class PortfolioService {
  constructor(private supabaseService: SupabaseService) {}
  private get supabase() {
    return this.supabaseService.getClient();
  }

  async findAll() {
    // const { data, error } = await this.supabase.from('portfolio').select('*');
    // if (error) throw new Error(error.message);
    // return data;
  }

  async findOne(id: string) {
    return await this.supabaseService.getPorfolioById(id);
  }

  async create(portfolio: CreatePortfolioDto) {
    return await this.supabaseService.createPortfolio(portfolio);
  }

  async update(id: string, portfolio: Portfolio) {
    return await this.supabaseService.updatePortfolio(id, portfolio);
  }

  async delete(id: string) {
    return await this.supabaseService.deletePortfolio(id);
  }

  // skills
  async addSkill(skill: CreateSkillDto) {
    return await this.supabaseService.addSkill(skill);
  }
  async deleteSkillById() {}
  async updateSkillById() {}

  // socialmedia
  async addSocialMediaAccount(account: CreateSocialMediaDto) {
    return await this.supabaseService.addSocialMediaAccount(account);
  }
  async deleteSocialMediaAccountById() {}
  async updateSocialMediaAccountById() {}

  // experience
  async addExperience(experience: CreateExperienceDto) {
    return await this.supabaseService.addExperience(experience);
  }
  async updateExperienceById(experience: UpdateExperienceDto) {
    return await this.supabaseService.updateExperienceById(experience);
  }
  async deleteExperienceById(id: String) {
    return await this.supabaseService.deleteExperienceById(id);
  }

  // projects
  async addProject(project: CreateProjectDto) {
    return await this.supabaseService.addProject(project);
  }
  async deleteProject() {}
  async updateProject() {}

  // testimonials

  async addTestimonial(testimonial: CreateTestimonialDto) {
    return await this.supabaseService.addTestimonial(testimonial);
  }
  async deleteTestimonialById() {}
  async updateTestimonialById() {}
}
