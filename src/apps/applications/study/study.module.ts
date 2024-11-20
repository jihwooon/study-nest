import { MikroOrmModule as NestMikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'

import { StudyController } from './study.controller'
import { Study } from './study.entity'
import { StudyService } from './study.service'

@Module({
  imports: [NestMikroOrmModule.forFeature([Study])],
  providers: [StudyService],
  controllers: [StudyController],
})
export class StudyModule {}
