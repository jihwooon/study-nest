import { ConfigService } from '@nestjs/config'
import * as Joi from 'joi'

export class BaseConfigService {
  constructor(
    private configService: ConfigService<object, true>,
    private configSchema: Joi.ObjectSchema<any>,
  ) {}

  private validateKey(key: string) {
    if (!this.configSchema.describe().keys[key]) {
      console.error(`구성(validation) 오류: 키 "${key}"가 configSchema에 정의되어 있지 않습니다.`)
      process.exit(1)
    }
  }

  protected getString(key: string): string {
    this.validateKey(key)
    return this.configService.get<string>(key)
  }

  protected getNumber(key: string): number {
    this.validateKey(key)
    return this.configService.get<number>(key)
  }
}
