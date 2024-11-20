import { defineConfig } from '@mikro-orm/mysql'
import { MikroOrmModule as NestMikroOrmModule } from '@mikro-orm/nestjs'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import { Module } from '@nestjs/common'
import { AppConfigService } from 'common'
import { Study } from '../study'

@Module({
  imports: [
    NestMikroOrmModule.forRootAsync({
      useFactory: async (config: AppConfigService) => {
        const { host, dnName, user, password, port } = config.database

        return defineConfig({
          host: host,
          port: port,
          user: user,
          password: password,
          dbName: dnName,
          entities: [Study],
          highlighter: new SqlHighlighter(),
          migrations: {
            path: '_output/migrations',
            pathTs: './migrations',
          },
          discovery: {
            warnWhenNoEntities: true,
            requireEntitiesArray: false,
            alwaysAnalyseProperties: true,
          },
          metadataCache: { enabled: false },
        })
      },
      inject: [AppConfigService],
    }),
  ],
})
export class MikroOrmModule {}
