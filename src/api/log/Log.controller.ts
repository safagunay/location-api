import { Controller, Get, Inject, Param } from '@nestjs/common';
import { getLogs, getUserLogs } from 'src/app/log';
import { LogEntity } from 'src/core';
import { LOG_REPOSITORY } from 'src/infra';
import { Repository } from 'typeorm';

@Controller('/logs')
export class LogController {
  constructor(
    @Inject(LOG_REPOSITORY)
    private readonly logRepository: Repository<LogEntity>,
  ) {}

  @Get()
  getLogs(): Promise<LogEntity[]> {
    return getLogs(this.logRepository);
  }

  @Get('/user/:id')
  getUserLogs(@Param('id') userId: string): Promise<LogEntity[]> {
    return getUserLogs(userId, this.logRepository);
  }
}
