import { Module } from '@nestjs/common'

import { AppService } from 'application/app.service'

import { AppController } from './api'
import { ConciergeModule } from './api/concierge/concierge.module';
import { HealthController } from './api/health.controller';

@Module({
  imports: [ConciergeModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
