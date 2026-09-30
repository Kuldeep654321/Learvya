import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileRepository {
  // Database access is isolated here so controllers never directly depend
  // on storage implementation details.
  async findByUserId(userId: string) {
    return {
      userId,
      profile: null,
    };
  }

  async update(userId: string, payload: Record<string, unknown>) {
    // Future Supabase/PostgreSQL update will happen through this boundary.
    return {
      userId,
      ...payload,
    };
  }
}
