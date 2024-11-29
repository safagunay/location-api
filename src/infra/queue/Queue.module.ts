import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '../config';
import { LoggerModule, LoggerService } from '../logger';
import { QueueService } from './QueueService';
import { initQueue } from './initQueue';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [
    {
      provide: QueueService,
      useFactory: async (config: ConfigService, logger: LoggerService) => {
        const conn = await initQueue(config);
        logger.log('Connected to AMQP server', 'QueueModule');
        return new QueueService(conn, config);
      },
      inject: [ConfigService, LoggerService],
    },
  ],
  exports: [QueueService],
})
export class QueueModule {}
