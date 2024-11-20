import { existsSync } from 'fs'

import { exit } from 'process'

import { MikroORM } from '@mikro-orm/core'
import { INestApplication } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { AppConfigService, AppLoggerService } from 'common'

async function configureApplications(app: INestApplication<any>) {
  const logger = app.get(AppLoggerService)
  app.useLogger(logger)

  const mikroORM = app.get(MikroORM)
  mikroORM.getSchemaGenerator().updateSchema()

  const config = app.get(AppConfigService)

  for (const dir of [{ name: 'Log', path: config.log.directory }]) {
    if (!existsSync(dir.path)) {
      console.error(`${dir.name} directory does not exist: ${dir.path}`)
      exit(1)
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await configureApplications(app)

  app.enableShutdownHooks()

  const config = app.get(AppConfigService)
  const { port, healthPort, host } = config.services.applications

  await app.listen(healthPort)

  console.log(`Server is running: tcp://${host}:${port}`)
}

bootstrap()
