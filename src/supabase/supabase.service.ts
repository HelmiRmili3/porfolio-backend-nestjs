import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

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

  // Lifecycle hook to run on server start
  async onModuleInit() {
    // console.log('Fetching portfolio with id = 1...');
    // // Fetch Portfolio with id = 1 from 'portfolio' table
    // try {
    //   const { data: portfolio, error: portfolioError } = await this.supabase
    //     .from('portfolio')
    //     .select('*') // Fetch all columns in the portfolio table
    //     .eq('id', 1) // Filter by Portfolio ID
    //     .single();
    //   if (portfolioError) {
    //     throw portfolioError;
    //   }
    //   console.log('Fetched Portfolio:', portfolio);
    // } catch (error) {
    //   console.error('Error fetching Portfolio with ID 1:', error);
    // }
  }
}
