import { Module } from '@nestjs/common';
import {
  CacheModule,
  ConfigModule,
  LoggerModule,
  QueueModule,
  TypeOrmModule,
} from 'src/infra';

@Module({
  imports: [
    TypeOrmModule,
    ConfigModule,
    LoggerModule,
    CacheModule,
    QueueModule,
  ],
})
export class ConsumerModule {}
