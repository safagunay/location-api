import { NestFactory } from '@nestjs/core';
import { ApiModule } from './Api.module';
import { CacheService, ConfigService, LoggerService } from 'src/infra';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);

  const cacheService = app.get(CacheService);
  await cacheService.setAreasLastUpdateTime(Date.now());

  await app.listen(configService.PORT);

  const loggerService = app.get(LoggerService);
  loggerService.log(`Listening on port ${configService.PORT}`, 'MAIN');
}
bootstrap();
