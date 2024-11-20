import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Study {
  @PrimaryKey()
  private id!: number

  @Property()
  private name: string

  @Property()
  private age: number

  @Property()
  private test: number

  constructor(name: string, age: number, test: number) {
    this.name = name
    this.age = age
    this.test = test
  }
}
