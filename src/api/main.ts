import { NestFactory } from '@nestjs/core';
import { ApiModule } from './Api.module';
import { ConfigService } from 'src/infra';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.PORT);

  const logger = app.get(Logger);
  logger.log(`Listening on port ${configService.PORT}`);
}
bootstrap();
