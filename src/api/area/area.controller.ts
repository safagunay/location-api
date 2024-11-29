import { Controller, Get, Inject } from '@nestjs/common';
import { getAreas } from 'src/app/area';
import { AreaEntity } from 'src/core';
import { AREA_REPOSITORY } from 'src/infra';
import { Repository } from 'typeorm';

@Controller()
export class AreaController {
  constructor(
    @Inject(AREA_REPOSITORY) private readonly areaRepository: Repository<AreaEntity>,
  ) {}

  @Get('/areas')
  getAreas(): Promise<AreaEntity[]> {
    return getAreas(this.areaRepository);
  }
}
