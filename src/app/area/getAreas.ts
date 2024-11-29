import { Repository } from 'typeorm';
import { AreaEntity } from 'src/core';

export async function getAreas(
  areaRepository: Repository<AreaEntity>,
): Promise<AreaEntity[]> {
  return await areaRepository.find();
}
