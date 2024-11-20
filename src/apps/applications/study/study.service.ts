import { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'

import { Study } from './study.entity'

@Injectable()
export class StudyService {
  constructor(
    @InjectRepository(Study)
    private readonly photoRepository: EntityRepository<Study>,
  ) {}

  async getStudy() {
    const article = await this.photoRepository.findAll()
    return article
  }
}
