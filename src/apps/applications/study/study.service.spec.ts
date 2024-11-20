import { Test, TestingModule } from '@nestjs/testing'
import { StudyService } from './study.service'
import { EntityRepository } from '@mikro-orm/core'
import { Study } from './study.entity'
import { getRepositoryToken } from '@mikro-orm/nestjs'

describe('StudyService', () => {
  let service: StudyService
  let fakeStudyRepository = {}

  const STUDY_REPOSITORY_TOKEN = getRepositoryToken(Study)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudyService,
        {
          provide: STUDY_REPOSITORY_TOKEN,
          useValue: fakeStudyRepository,
        },
      ],
    }).compile()

    service = module.get<StudyService>(StudyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
