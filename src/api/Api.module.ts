import { Module } from '@nestjs/common';
import { HelloModule } from './hello/Hello.module';
import { APP_FILTER } from '@nestjs/core';
import { ZodExceptionFilter } from './common/ZodException.filter';

@Module({
  imports: [HelloModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ZodExceptionFilter,
    },
  ],
})
export class ApiModule {}
