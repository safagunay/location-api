import { Module } from '@nestjs/common';
import { CacheModule, LoggerModule, TypeOrmModule } from 'src/infra';
import { AreaController } from './Area.controller';

@Module({
  imports: [TypeOrmModule, CacheModule, LoggerModule],
  controllers: [AreaController]
})
export class AreaModule {}
