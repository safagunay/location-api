import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'src/infra';
import { LogController } from './Log.controller';

@Module({
  imports: [TypeOrmModule],
  controllers: [LogController],
})
export class LogModule {}
