// - Modifies global `Reflect` object (or defines one in ES5 runtimes).
import 'reflect-metadata';

import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { migrations } from './migrations';
import { entities } from './entities';

config();

const connectionOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities,
  migrations,
};

export const dataSource = new DataSource({
  ...connectionOptions,
});
