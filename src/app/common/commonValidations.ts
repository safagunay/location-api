import { z } from 'zod';

export const commonValidations = {
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
};
