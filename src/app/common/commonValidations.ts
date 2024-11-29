import { z } from 'zod';

export const commonValidations = {
  latitude: z.number().min(-90).max(90),

  longitude: z.number().min(-180).max(180),

  positiveNumericId: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
};
