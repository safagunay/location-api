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
import { AreaEntity, Location, LogEntity } from 'src/core';
import { getAreas } from 'src/app/area';
import { pid } from 'node:process';
import { logLocationAreaOverlaps } from 'src/app/log/logLocationAreaOverlaps';

const LOG_CONTEXT = 'CONSUMER';

async function startConsume(
  queueService: QueueService,
  loggerService: LoggerService,
  cacheService: CacheService,
  areaRepository: Repository<AreaEntity>,
  logRepository: Repository<LogEntity>,
) {
  let ackedCount = 0;
  let nackedCount = 0;
  let createdLogCount = 0;

  let areas = await getAreas(areaRepository);
  let areasLastUpdateTime = await cacheService.getAreasLastUpdateTime();
  let reloadingAreas = false;

  queueService.consumeLocationQueue(
    `pid:${pid}`,
    async (message, ack, nack) => {
      try {
        const location = JSON.parse(message.content.toString()) as Location;
        const latestAreasLastUpdateTime =
          await cacheService.getAreasLastUpdateTime();
        if (
          latestAreasLastUpdateTime !== areasLastUpdateTime &&
          !reloadingAreas
        ) {
          reloadingAreas = true;
          areas = await getAreas(areaRepository);
          areasLastUpdateTime = latestAreasLastUpdateTime;
          loggerService.log('Reloaded areas from db', LOG_CONTEXT);
          reloadingAreas = false;
        }
        const res = await logLocationAreaOverlaps(
          areas,
          location,
          logRepository,
        );
        createdLogCount += res.length;

        ack(message);
        ackedCount += 1;
      } catch (err) {
        loggerService.error(`Error consuming message: ${err}`, LOG_CONTEXT);
        nack(message);
        nackedCount += 1;
      }
    },
  );

  setInterval(() => {
    loggerService.log(
      `acked: ${ackedCount}, nacked: ${nackedCount}, logs: ${createdLogCount}`,
      LOG_CONTEXT,
    );
  }, 10000);
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ConsumerModule);
  const loggerService = app.get(LoggerService);
  const cacheService = app.get(CacheService);
  const areaRepository = app.get(AREA_REPOSITORY) as Repository<AreaEntity>;
  const logRepository = app.get(LOG_REPOSITORY) as Repository<LogEntity>;
  const queueService = app.get(QueueService);

  startConsume(
    queueService,
    loggerService,
    cacheService,
    areaRepository,
    logRepository,
  );
}

bootstrap();
