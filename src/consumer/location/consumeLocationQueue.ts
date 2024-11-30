import { pid } from 'node:process';
import { getAreas } from 'src/app/area';
import { AreaEntity, LocationDto, LogEntity } from 'src/core';
import { CacheService, LoggerService, QueueService } from 'src/infra';
import { Repository } from 'typeorm';
import { LOG_CONTEXT } from '../common/constants';
import { logLocationAreaOverlaps } from 'src/app/log';

export async function consumeLocationQueue(
  queueService: QueueService,
  loggerService: LoggerService,
  cacheService: CacheService,
  areaRepository: Repository<AreaEntity>,
  logRepository: Repository<LogEntity>,
) {
  let ackedCount = 0;
  let nackedCount = 0;

  let areas = await getAreas(areaRepository);
  let areasLastUpdateTime = await cacheService.getAreasLastUpdateTime();
  let reloadingAreas = false;

  queueService.consumeLocationQueue(
    `pid:${pid}`,
    async (message, ack, nack) => {
      try {
        const location = JSON.parse(message.content.toString()) as LocationDto;
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
        await logLocationAreaOverlaps(areas, location, logRepository);

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
      `acked: ${ackedCount}, nacked: ${nackedCount}`,
      LOG_CONTEXT,
    );
  }, 10000);
}
