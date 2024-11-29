import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '../config';
import { CacheService } from './CacheService';
import Redis from 'ioredis';
import { LoggerModule, LoggerService } from '../logger';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [
    {
      provide: CacheService,
      useFactory: async (config: ConfigService, logger: LoggerService) => {
        const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);
        await new Promise((res, rej) => {
          redis.on('connect', () => res(null));
          redis.on('error', (err) => rej(err));
        });
        logger.log('Connected to Redis', 'CacheModule');
        return new CacheService(redis);
      },
      inject: [ConfigService, LoggerService],
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
