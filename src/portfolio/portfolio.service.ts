// src/portfolio/portfolio.service.ts
import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Portfolio } from 'src/entities/portfolio.entity';

@Injectable()
export class PortfolioService {
  constructor(private supabaseService: SupabaseService) {}

  private get supabase() {
    return this.supabaseService.getClient();
  }

  async findAll() {
    const { data, error } = await this.supabase.from('portfolio').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('portfolio')
      .select(
        `
        *,
        projects (
          id,
          images,
          projectname,
          description,
          technologies,
          links
        ),
        contactform (
          id,
          portfolio_id,
          name,
          email,
          message,
          textbutton
        ),
        experiences (
          id,
          companylogo,
          companyname,
          content,
          datestart,
          dateend
        ),
        socialmedia (
          id,
          portfolio_id,
          icon,
          link
        ),
        technologies (
          id,
          portfolio_id,
          logo,
          name
        ),
        testimonials (
          id,
          portfolio_id,
          personphoto,
          personname,
          testimonial,
          websitelink
        )
        `,
      )
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async create(portfolio: Portfolio) {
    const { data, error } = await this.supabase
      .from('portfolio')
      .insert([portfolio])
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, portfolio: Portfolio) {
    const { data, error } = await this.supabase
      .from('portfolio')
      .update(portfolio)
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from('portfolio')
      .delete()
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
}
