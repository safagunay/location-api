import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ZodExceptionFilter } from './common/ZodException.filter';
import { CacheModule, ConfigModule, LoggerModule } from 'src/infra';
import { AreaModule } from './area/Area.module';
import { LocationModule } from './location/Location.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    CacheModule,
    AreaModule,
    LocationModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ZodExceptionFilter,
    },
  ],
})
export class ApiModule {}
