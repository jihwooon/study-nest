import { Controller, Get, Injectable, Module } from '@nestjs/common'

@Injectable()
class HealthService {
  check() {
    return { status: 'ok' }
  }
}

@Controller()
export class HealthController {
  constructor(private service: HealthService) {}

  @Get('health')
  health() {
    return this.service.check()
  }
}

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
