import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  // Service layer owns business rules before data reaches persistence.
  async getProfile(userId: string) {
    return this.repository.findByUserId(userId);
  }

  async updateProfile(userId: string, payload: Record<string, unknown>) {
    return this.repository.update(userId, payload);
  }
}
