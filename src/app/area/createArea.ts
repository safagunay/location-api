import { Repository } from 'typeorm';
import { z } from 'zod';
import { AreaEntity } from 'src/core';
import { commonValidations } from '../common/commonValidations';

const createAreaSchema = z.object({
  name: z.string().trim().min(1).max(100),
  northEastLat: commonValidations.latitude,
  northEastLng: commonValidations.longitude,
  southWestLat: commonValidations.latitude,
  southWestLng: commonValidations.longitude,
});

export type CreateAreaDto = z.infer<typeof createAreaSchema>;

export async function createArea(
  dto: CreateAreaDto,
  areaRepository: Repository<AreaEntity>,
): Promise<AreaEntity> {
  const parsedDto = createAreaSchema.parse(dto);

  const area = areaRepository.create({
    name: parsedDto.name,
    northEastLat: parsedDto.northEastLat,
    northEastLng: parsedDto.northEastLng,
    southWestLat: parsedDto.southWestLat,
    southWestLng: parsedDto.southWestLng,
    createdAt: new Date(),
  });
  return areaRepository.save(area);
}
