import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UpdateProfileDto } from './profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  get(@Req() req: any) {
    // Authenticated user identity comes from Supabase token validation.
    return this.profileService.getProfile(req.user.id, req.accessToken);
  }

  @Put()
  update(@Req() req: any, @Body() body: UpdateProfileDto) {
    // User ownership comes from auth identity, not request payload.
    return this.profileService.updateProfile(req.user.id, req.accessToken, body);
  }
}
