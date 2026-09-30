import { Body, Controller, Get, Put, Req } from '@nestjs/common';

@Controller('profile')
export class ProfileController {
  @Get()
  get(@Req() req: any) {
    return { userId: req.user?.id ?? null, profile: null };
  }

  @Put()
  update(@Body() body: Record<string, unknown>) {
    return { ok: true, profile: body };
  }
}