import { Module } from '@nestjs/common';
import { QueueModule } from 'src/infra';
import { LocationController } from './Location.controller';

@Module({
  imports: [QueueModule],
  controllers: [LocationController]
})
export class LocationModule {}
