import { Repository } from 'typeorm';
import { z } from 'zod';
import { AreaEntity, Location, LogEntity } from 'src/core';
import { commonValidations } from '../common/commonValidations';

const locationSchema = z.object({
  userId: z
    .string()
    .min(1, 'userId must be non-empty string')
    .refine(
      (val) => val.trim() === val,
      'userId must not contain empty spaces',
    ),
  timestamp: z.number().refine((num) => num > 0, 'timestamp must be a number'),
  latitude: commonValidations.latitude,
  longitude: commonValidations.longitude,
});

export async function logLocationAreaOverlaps(
  areas: AreaEntity[],
  location: Location,
  logRepository: Repository<LogEntity>,
): Promise<LogEntity[]> {
  const parsedLocation = locationSchema.parse(location) as Location;

  const res = await Promise.all(
    areas.map((area) => {
      if (area.contains(parsedLocation)) {
        return logRepository.create({
          userId: parsedLocation.userId,
          areaId: area.id,
          timestamp: new Date(parsedLocation.timestamp),
        });
      } else {
        return Promise.resolve(null);
      }
    }),
  );

  return res.filter((entity) => entity);
}
