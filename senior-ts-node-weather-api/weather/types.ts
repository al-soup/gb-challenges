import { z } from 'zod';
import { apiAResponseSchema, apiBResponseSchema } from './schemas';

export type Location = {
  id: number;
  name: string;
  lat: number;
  long: number;
};

export type ApiAResponse = z.infer<typeof apiAResponseSchema>;
export type ApiBResponse = z.infer<typeof apiBResponseSchema>;

export type Weather = {
  locationId: number;
  temperature: number | null;
};
