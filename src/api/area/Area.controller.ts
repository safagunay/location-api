import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import {
  createArea,
  CreateAreaParams,
  deleteArea,
  getAreas,
} from 'src/app/area';
import { AreaEntity } from 'src/core';
import { AREA_REPOSITORY, CacheService, LoggerService } from 'src/infra';
import { Repository } from 'typeorm';

@Controller('/areas')
export class AreaController {
  constructor(
    @Inject(AREA_REPOSITORY)
    private readonly areaRepository: Repository<AreaEntity>,
    private readonly logger: LoggerService,
    private readonly cacheService: CacheService,
  ) {}

  @Get()
  getAreas(): Promise<AreaEntity[]> {
    return getAreas(this.areaRepository);
  }

  @Post()
  async createArea(@Body() payload: CreateAreaParams): Promise<AreaEntity> {
    const res = await createArea(payload, this.areaRepository);
    try {
      await this.cacheService.setAreasLastUpdateTime(Date.now());
    } catch (error) {
      await deleteArea(res.id, this.areaRepository);
      this.logger.error('Failed to update cache with error', error);
      throw new HttpException(
        'Rejected because failed to write to cache',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return res;
  }
}
