import { config } from 'dotenv';
import { cleanEnv, host, port, str } from 'envalid';
import { EnvConfig } from './EnvConfig.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private _envConfig: EnvConfig;

  constructor() {
    config();

    this._envConfig = cleanEnv(process.env, {
      NODE_ENV: str({ choices: ['development', 'production'] }),
      HOST: host(),
      PORT: port(),
      DB_TYPE: str(),
      DB_HOST: str(),
      DB_PORT: port(),
      DB_DATABASE: str(),
      DB_USERNAME: str(),
      DB_PASSWORD: str(),
      REDIS_HOST: str(),
      REDIS_PORT: port(),
      AMQP_HOST: str(),
      AMQP_USER: str(),
      AMQP_PASSWORD: str(),
      AMQP_PORT: port(),
      AMQP_QUEUE_NAME: str()
    });
  }

  public get NODE_ENV() {
    return this._envConfig.NODE_ENV;
  }

  public get HOST() {
    return this._envConfig.HOST;
  }

  public get PORT() {
    return this._envConfig.PORT;
  }

  public get DB_TYPE() {
    return this._envConfig.DB_TYPE;
  }

  public get DB_HOST() {
    return this._envConfig.DB_HOST;
  }

  public get DB_PORT() {
    return this._envConfig.DB_PORT;
  }

  public get DB_DATABASE() {
    return this._envConfig.DB_DATABASE;
  }

  public get DB_USERNAME() {
    return this._envConfig.DB_USERNAME;
  }

  public get DB_PASSWORD() {
    return this._envConfig.DB_PASSWORD;
  }

  public get REDIS_HOST() {
    return this._envConfig.REDIS_HOST;
  }

  public get REDIS_PORT() {
    return this._envConfig.REDIS_PORT;
  }

  public get AMQP_HOST() {
    return this._envConfig.AMQP_HOST;
  }

  public get AMQP_PORT() {
    return this._envConfig.AMQP_PORT;
  }

  public get AMQP_USER() {
    return this._envConfig.AMQP_USER;
  }

  public get AMQP_PASSWORD() {
    return this._envConfig.AMQP_PASSWORD;
  }

  public get AMQP_QUEUE_NAME() {
    return this._envConfig.AMQP_QUEUE_NAME;
  }
}
