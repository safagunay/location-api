import dotenv from 'dotenv';
import { cleanEnv, host, port, str } from 'envalid';
import { EnvConfig } from './EnvConfig.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private _envConfig: EnvConfig;

  constructor() {
    dotenv.config();

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
    return this._envConfig.NODE_ENV;
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
}
