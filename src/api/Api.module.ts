import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './common/CustomException.filter';
import { ConfigModule, LoggerModule } from 'src/infra';
import { AreaModule } from './area/Area.module';
import { LocationModule } from './location/Location.module';
import { LogModule } from './log/Log.module';

@Module({
  imports: [ConfigModule, LoggerModule, AreaModule, LocationModule, LogModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class ApiModule {}
