import { Test, TestingModule } from '@nestjs/testing'
import { StudyController } from './study.controller'
import { StudyService } from './study.service'

describe('StudyController', () => {
  let controller: StudyController
  let studyService: Partial<StudyService>

  beforeEach(async () => {
    studyService = { getStudy: jest.fn() }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyController],
      providers: [
        {
          provide: StudyService,
          useValue: studyService,
        },
      ],
    }).compile()

    controller = module.get<StudyController>(StudyController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
