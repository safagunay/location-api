import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import { createArea, CreateAreaDto, getAreas } from 'src/app/area';
import { AreaEntity } from 'src/core';
import { AREA_REPOSITORY, CacheService } from 'src/infra';
import { DataSource, Repository } from 'typeorm';

@Controller('/areas')
export class AreaController {
  constructor(
    @Inject(AREA_REPOSITORY)
    private readonly areaRepository: Repository<AreaEntity>,
    private readonly dataSource: DataSource,
    private readonly cacheService: CacheService,
  ) {}

  @Get()
  getAreas(): Promise<AreaEntity[]> {
    return getAreas(this.areaRepository);
  }

  @Post()
  async createAreas(
    @Body() payload: CreateAreaDto | CreateAreaDto[],
  ): Promise<AreaEntity[]> {
    // check cache service health before proceeding
    await this.cacheService.getAreasLastUpdateTime();

    let dtos: CreateAreaDto[];
    if (Array.isArray(payload)) {
      dtos = payload as CreateAreaDto[];

      if (!payload.length || payload.length > 100) {
        throw new BadRequestException(
          'JSON array must be of min length 1 and max length 100',
        );
      }
    } else {
      dtos = [payload];
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const areaRepository = queryRunner.manager.withRepository(
        this.areaRepository,
      );
      const resArr = [];
      for (const dto of dtos) {
        resArr.push(await createArea(dto, areaRepository));
      }
      await this.cacheService.setAreasLastUpdateTime(Date.now());

      await queryRunner.commitTransaction();
      return resArr;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
