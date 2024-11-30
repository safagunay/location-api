import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '../config';
import { createDataSource } from './createDataSource';
import { AreaEntity, LogEntity } from 'src/core';
import { AREA_REPOSITORY, LOG_REPOSITORY } from './constants';
import { getRepository } from './getRepository';
import { LoggerModule, LoggerService } from '../logger';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [
    {
      provide: DataSource,
      useFactory: async (
        configService: ConfigService,
        logger: LoggerService,
      ) => {
        const dataSource = await createDataSource(configService);
        logger.log('Data Source initialized', 'TypeOrmModule');
        return dataSource;
      },
      inject: [ConfigService, LoggerService],
    },
    {
      provide: AREA_REPOSITORY,
      useFactory: async (dataSource: DataSource) => {
        return await getRepository(dataSource, AreaEntity);
      },
      inject: [DataSource],
    },
    {
      provide: LOG_REPOSITORY,
      useFactory: async (dataSource: DataSource) => {
        return await getRepository(dataSource, LogEntity);
      },
      inject: [DataSource],
    },
  ],
  exports: [DataSource, AREA_REPOSITORY],
})
export class TypeOrmModule {}
