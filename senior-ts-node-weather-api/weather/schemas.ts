import { z } from 'zod';

const celsiusUnitSchema = z
  .string()
  .refine((val: string) => val.toLowerCase().includes('c'), {
    message: 'Temperature unit not in Celsius',
  });

export const apiAResponseSchema = z.object({
  temp: z.coerce.number(),
  source: z.string(),
  unit: celsiusUnitSchema,
});

export const apiBResponseSchema = z.object({
  temperature: z.coerce.number(),
  generationtime_ms: z.coerce.number(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  elevation: z.coerce.number(),
  temperature_unit: celsiusUnitSchema,
});
