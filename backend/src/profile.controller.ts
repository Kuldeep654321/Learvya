import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  @Get()
  get(@Req() req: any) {
    // The authenticated Supabase user is the identity boundary.
    // Profile data will be loaded from PostgreSQL/Supabase in the next slice.
    return { userId: req.user.id, profile: null };
  }

  @Put()
  update(@Req() req: any, @Body() body: Record<string, unknown>) {
    // Do not accept a userId from the request body.
    // The authenticated user ID determines ownership.
    return { ok: true, userId: req.user.id, profile: body };
  }
}