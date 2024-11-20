import { Study } from './study.entity'
const context = describe

describe('StudyEntity', () => {
  context('study Entity가 주어지면', () => {
    const study = new Study('홍길동', 17, 1)

    it('해당 값을 리턴한다.', () => {
      expect(study).toEqual({ age: 17, name: '홍길동', test: 1 })
    })
  })
})
