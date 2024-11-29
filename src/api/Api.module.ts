import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ZodExceptionFilter } from './common/ZodException.filter';
import { CacheModule, ConfigModule, LoggerModule } from 'src/infra';
import { AreaModule } from './area/Area.module';

@Module({
  imports: [ConfigModule, LoggerModule, AreaModule, CacheModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ZodExceptionFilter,
    },
  ],
})
export class ApiModule {}
