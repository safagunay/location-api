// - Modifies global `Reflect` object (or defines one in ES5 runtimes).
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { migrations } from './migrations';
import { AreaEntity } from '../../core';
import { ConfigService } from '../config/ConfigService';

const entities = [AreaEntity];

export async function createDataSource(configService: ConfigService): Promise<DataSource> {
  let connectionOptions: DataSourceOptions = {
    type: configService.DB_TYPE as 'postgres',
    host: configService.DB_HOST,
    port: configService.DB_PORT,
    username: configService.DB_USERNAME,
    password: configService.DB_PASSWORD,
    database: configService.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities,
    migrations
  };

  const dataSource = new DataSource(connectionOptions);
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  return dataSource;
}
