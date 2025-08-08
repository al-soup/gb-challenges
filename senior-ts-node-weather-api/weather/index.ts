import ApiRepository from '../wrappers/api.repository';
import { apiBResponseSchema } from './schemas';
import type { ApiBResponse, Location, Weather } from './types';

const apiRepository = new ApiRepository();

const getWeatherFromServiceB = async (
  lat: number,
  long: number,
): Promise<ApiBResponse> => {
  const data = await apiRepository.getWeatherFromServiceB(lat, long);
  // TODO decide on safeParse or try/catch
  return apiBResponseSchema.parse(data);
};

export const getTemperaturesForLocations = async (
  locations: Location[],
): Promise<Weather[]> => {
  // const weather = new Map<string, number>();

  const results = await Promise.all(
    locations.map(async (location) => {
      const { lat, long, name } = location;
      try {
        // TODO handle rejects
        const apiBResponse = await getWeatherFromServiceB(lat, long);
        const { temperature } = apiBResponse;

        return {
          location: name,
          weather: temperature,
        } as Weather;
      } catch (error) {
        // TODO Alternatively mention the name for which the weather could not be fetched or try service A
        console.error(`Error fetching weather for ${name}:`, error);
      }
    }),
  );

  return results.filter((result): result is Weather => result !== undefined);
};
