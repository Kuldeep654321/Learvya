import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  // Business logic stays here; controllers remain focused on HTTP concerns.
  async getProfile(userId: string, accessToken: string) {
    return this.repository.findByUserId(userId, accessToken);
  }

  async updateProfile(
    userId: string,
    accessToken: string,
    payload: Record<string, unknown>,
  ) {
    // Identity comes from the validated token, never from the request body.
    return this.repository.update(userId, accessToken, payload);
  }
}
