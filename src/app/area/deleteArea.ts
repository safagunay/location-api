import { Repository } from 'typeorm';
import { AreaEntity } from 'src/core';

export async function deleteArea(
  areaId: number,
  areaRepository: Repository<AreaEntity>,
): Promise<void> {
  await areaRepository.delete(areaId);
}
