import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ProfileModule } from './profile.module';

@Module({
  controllers: [HealthController],
  imports: [ProfileModule],
})
export class AppModule {}
