import { Controller, Get } from '@nestjs/common'

import { StudyService } from './study.service'

@Controller('study')
export class StudyController {
  constructor(private service: StudyService) {}

  @Get()
  getAll() {
    return this.service.getStudy()
  }
}
