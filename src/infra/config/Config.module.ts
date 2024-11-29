import { Module } from '@nestjs/common';
import { ConfigService } from './ConfigService';

@Module({
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
