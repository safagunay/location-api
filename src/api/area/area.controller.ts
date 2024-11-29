import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { createArea, CreateAreaParams, getAreas } from 'src/app/area';
import { AreaEntity } from 'src/core';
import { AREA_REPOSITORY } from 'src/infra';
import { Repository } from 'typeorm';

@Controller('/areas')
export class AreaController {
  constructor(
    @Inject(AREA_REPOSITORY) private readonly areaRepository: Repository<AreaEntity>,
  ) {}

  @Get()
  getAreas(): Promise<AreaEntity[]> {
    return getAreas(this.areaRepository);
  }

  @Post()
  async createArea(@Body() payload: CreateAreaParams): Promise<AreaEntity> {
    return await createArea(payload, this.areaRepository);
  }
}
