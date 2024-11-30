import { z } from 'zod';
import { commonValidations } from '../common/commonValidations';

export const locationDtoSchema = z.object({
  userId: z.coerce
    .string()
    .min(1, 'must be non-empty string')
    .max(100)
    .refine(
      (val) => val.trim() === val,
      'userId must not contain empty spaces',
    ),
  timestamp: z.number().refine((num) => num > 0, 'timestamp must be a number'),
  latitude: commonValidations.latitude,
  longitude: commonValidations.longitude,
});
