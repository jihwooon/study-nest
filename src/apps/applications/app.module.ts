import { Module } from '@nestjs/common'
import { Modules } from './modules'
import { StudyModule } from './study'

@Module({
  imports: [Modules, StudyModule],
})
export class AppModule {}
