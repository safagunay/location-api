import { Repository } from 'typeorm';
import { AreaEntity, LocationDto, LogEntity } from 'src/core';
import { locationDtoSchema } from '../location';

export async function logLocationAreaOverlaps(
  areas: AreaEntity[],
  location: LocationDto,
  logRepository: Repository<LogEntity>,
): Promise<LogEntity[]> {
  const parsedLocation = locationDtoSchema.parse(location) as LocationDto;

  const res = await Promise.all(
    areas.map((area) => {
      if (area.contains(parsedLocation)) {
        const entity = logRepository.create({
          userId: parsedLocation.userId,
          areaId: area.id,
          timestamp: new Date(parsedLocation.timestamp),
        });
        return logRepository.save(entity);
      } else {
        return Promise.resolve(null);
      }
    }),
  );

  return res.filter((entity) => entity);
}
