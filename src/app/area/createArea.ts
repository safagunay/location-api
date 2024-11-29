import { Repository } from 'typeorm';
import { z } from 'zod';
import { AreaEntity } from 'src/core';
import { commonValidations } from '../common/commonValidations';

const createAreaSchema = z.object({
  name: z.string().trim().min(1).max(100),
  northEastLat: commonValidations.latitude('northEastLat is required'),
  northEastLng: commonValidations.longitude('northEastLng is required'),
  southWestLat: commonValidations.latitude('southEastLat is required'),
  southWestLng: commonValidations.longitude('southWestLng is required'),
});

export type CreateAreaParams = z.infer<typeof createAreaSchema>;

export async function createArea(
  params: CreateAreaParams,
  areaRepository: Repository<AreaEntity>,
): Promise<AreaEntity> {
  const parsedParams = createAreaSchema.parse(params);

  const area = areaRepository.create({
    name: parsedParams.name,
    northEastLat: parsedParams.northEastLat,
    northEastLng: parsedParams.northEastLng,
    southWestLat: parsedParams.southWestLat,
    southWestLng: params.southWestLng,
    createdAt: new Date(),
  });
  return areaRepository.save(area);
}
