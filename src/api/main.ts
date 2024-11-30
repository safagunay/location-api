import { NestFactory } from '@nestjs/core';
import { ApiModule } from './Api.module';
import { ConfigService, LoggerService } from 'src/infra';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);

  await app.listen(configService.PORT);

  const loggerService = app.get(LoggerService);
  loggerService.log(`Listening on port ${configService.PORT}`, 'MAIN');
}
bootstrap();
