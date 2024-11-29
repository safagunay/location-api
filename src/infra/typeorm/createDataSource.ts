import { DataSource, DataSourceOptions } from 'typeorm';
import { migrations } from './migrations/migrations';
import { ConfigService } from '../config/ConfigService';
import { entities } from './migrations/entities';

export async function createDataSource(
  configService: ConfigService,
): Promise<DataSource> {
  const connectionOptions: DataSourceOptions = {
    type: configService.DB_TYPE as 'postgres',
    host: configService.DB_HOST,
    port: configService.DB_PORT,
    username: configService.DB_USERNAME,
    password: configService.DB_PASSWORD,
    database: configService.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities,
    migrations,
  };

  const dataSource = new DataSource(connectionOptions);
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  return dataSource;
}
