import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Controller('profile')
@UseGuards(AuthGuard)
export class ProfileController {
  @Get()
  get(@Req() req: any) {
    return { userId: req.user.id, profile: null };
  }

  @Put()
  update(@Req() req: any, @Body() body: Record<string, unknown>) {
    return { ok: true, userId: req.user.id, profile: body };
  }
}