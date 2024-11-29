import { Module } from '@nestjs/common';
import { HelloModule } from './hello/Hello.module';
import { APP_FILTER } from '@nestjs/core';
import { ZodExceptionFilter } from './common/ZodException.filter';
import { AreaModule } from './area/Area.module';
import { ConfigModule } from 'src/infra';

@Module({
  imports: [ConfigModule, HelloModule, AreaModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ZodExceptionFilter,
    },
  ],
})
export class ApiModule {}
