import { Module } from '@nestjs/common'
import { AppConfigService, AppLoggerService, initializeLogger, LoggerConfiguration } from 'common'

@Module({
  providers: [
    {
      provide: AppLoggerService,
      useFactory: async (config: AppConfigService) => {
        const loggerInstance = await initializeLogger(config.log as LoggerConfiguration)

        return new AppLoggerService(loggerInstance)
      },
      inject: [AppConfigService],
    },
  ],
})
export class LoggerModule {}
