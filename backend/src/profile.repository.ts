import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

type ProfilePayload = Record<string, unknown>;

@Injectable()
export class ProfileRepository {
  private createUserClient(accessToken: string): SupabaseClient {
    // A client is created per request so an access token is never shared
    // between users. Supabase RLS evaluates queries in this user context.
    return createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      },
    );
  }

  async findByUserId(userId: string, accessToken: string) {
    const supabase = this.createUserClient(accessToken);

    const { data, error } = await supabase
      .from('profiles')
      .select('id, display_name, date_of_birth, state, city, created_at, updated_at')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      throw new InternalServerErrorException('Unable to load profile');
    }

    return { userId, profile: data };
  }

  async update(userId: string, accessToken: string, payload: ProfilePayload) {
    const allowed = {
      display_name: payload.display_name,
      date_of_birth: payload.date_of_birth,
      state: payload.state,
      city: payload.city,
    };

    // The row key comes from the authenticated identity, never the body.
    const { data, error } = await this.createUserClient(accessToken)
      .from('profiles')
      .update({ ...allowed, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select('id, display_name, date_of_birth, state, city, created_at, updated_at')
      .single();

    if (error) {
      throw new InternalServerErrorException('Unable to update profile');
    }

    return { userId, profile: data };
  }
}
