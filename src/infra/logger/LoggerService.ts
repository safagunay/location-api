import { Injectable } from '@nestjs/common';
import { Logger, pino } from 'pino';

@Injectable()
export class LoggerService {
  private _logger: Logger;

  constructor() {
    this._logger = pino({ name: 'server' });
  }

  info(message: string) {
    this._logger.info(message);
  }

  error(message: string) {
    this._logger.error(message);
  }

  warn(message: string) {
    this._logger.warn(message);
  }

  debug(message: string) {
    this._logger.debug(message);
  }
}
