import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '../config';
import { createDataSource } from './createDataSource';
import { AreaEntity } from 'src/core';
import { AREA_REPOSITORY } from './constants';
import { getRepository } from './getRepository';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DataSource,
      useFactory: async (configService: ConfigService) => {
        return await createDataSource(configService);
      },
      inject: [ConfigService],
    },
    {
      provide: AREA_REPOSITORY,
      useFactory: async (dataSource: DataSource) => {
        return await getRepository(dataSource, AreaEntity);
      },
      inject: [DataSource],
    },
  ],
  exports: [DataSource, AREA_REPOSITORY],
})
export class TypeOrmModule {}
