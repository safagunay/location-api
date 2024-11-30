import { NestFactory } from '@nestjs/core';
import {
  AREA_REPOSITORY,
  CacheService,
  LOG_REPOSITORY,
  LoggerService,
  QueueService,
} from 'src/infra';
import { ConsumerModule } from './Consumer.module';
import { Repository } from 'typeorm';
import { AreaEntity, LogEntity } from 'src/core';
import { consumeLocationQueue } from './location/consumeLocationQueue';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ConsumerModule);
  const loggerService = app.get(LoggerService);
  const cacheService = app.get(CacheService);
  const areaRepository = app.get(AREA_REPOSITORY) as Repository<AreaEntity>;
  const logRepository = app.get(LOG_REPOSITORY) as Repository<LogEntity>;
  const queueService = app.get(QueueService);

  consumeLocationQueue(
    queueService,
    loggerService,
    cacheService,
    areaRepository,
    logRepository,
  );
}

bootstrap();
