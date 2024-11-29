import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'src/infra';
import { AreaController } from './area.controller';

@Module({
  imports: [TypeOrmModule],
  controllers: [AreaController]
})
export class AreaModule {}
