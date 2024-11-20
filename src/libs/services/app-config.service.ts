import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { BaseConfigService } from './base-config.service'
import { configSchema } from 'shared'

@Injectable()
export class AppConfigService extends BaseConfigService {
  constructor(configService: ConfigService<object, true>) {
    super(configService, configSchema)
  }

  get log() {
    return {
      directory: this.getString('LOG_DIRECTORY'),
      daysToKeepLogs: this.getString('LOG_DAYS_TO_KEEP'),
      fileLogLevel: this.getString('LOG_FILE_LEVEL'),
      consoleLogLevel: this.getString('LOG_CONSOLE_LEVEL'),
    }
  }

  get services() {
    return {
      applications: {
        host: this.getString('SERVICE_APPLICATIONS_HOST'),
        port: this.getNumber('SERVICE_APPLICATIONS_PORT'),
        healthPort: this.getNumber('SERVICE_APPLICATIONS_HEALTH_PORT'),
      },
    }
  }

  get database() {
    const host = this.getString('MYSQL_HOST')
    const dnName = this.getString('MYSQL_DATABASE')
    const user = this.getString('MYSQL_USER')
    const password = this.getString('MYSQL_PASSWORD')
    const port = this.getNumber('MYSQL_PORT')

    return {
      host,
      dnName,
      user,
      password,
      port,
    }
  }
}
