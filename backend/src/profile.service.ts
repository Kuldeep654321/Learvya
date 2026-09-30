import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  // Database access will be connected here through Supabase/PostgreSQL.
  // Keeping persistence logic outside controllers keeps API boundaries clean.
  async getProfile(userId: string) {
    return {
      userId,
      profile: null,
    };
  }

  async updateProfile(userId: string, payload: Record<string, unknown>) {
    return {
      userId,
      profile: payload,
    };
  }
}
