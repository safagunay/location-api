import { z } from 'zod';

export const commonValidations = {
  latitude: (message: string) => z.number({ message }).min(-90).max(90),

  longitude: (message: string) => z.number({ message }).min(-180).max(180),

  positiveNumericId: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), 'ID must be a numeric value')
    .transform(Number)
    .refine((num) => num > 0, 'ID must be a positive number'),
};
