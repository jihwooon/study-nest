import { Global, Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { AppConfigService } from 'common'
import { configSchema } from 'shared'

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      envFilePath: `.env.local`,
      validationSchema: configSchema,
      validationOptions: { abortEarly: false },
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class ConfigModule {}
