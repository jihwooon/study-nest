import { Module } from '@nestjs/common'

import { ConfigModule } from './config.module'
import { HealthModule } from './health.module'
import { LoggerModule } from './logger.module'
import { MikroOrmModule } from './mikro-orm.module'

@Module({
  imports: [HealthModule, LoggerModule, ConfigModule, MikroOrmModule],
})
export class Modules {}
