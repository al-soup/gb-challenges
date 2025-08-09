import ApiRepository from '../wrappers/api.repository';
import { apiBResponseSchema } from './schemas';
import type { ApiBResponse, Location, Weather } from './types';

const apiRepository = new ApiRepository();

const getWeatherFromServiceB = async (
  lat: number,
  long: number,
): Promise<ApiBResponse> => {
  const data = await apiRepository.getWeatherFromServiceB(lat, long);

  return apiBResponseSchema.parse(data);
};

const getWeatherForLocations = (locations: Location[]): Promise<Weather[]> => {
  return Promise.all(
    locations.map(async (location) => {
      const { lat, long, id } = location;
      try {
        const apiBResponse = await getWeatherFromServiceB(lat, long);
        const { temperature } = apiBResponse;

        return {
          locationId: id,
          temperature,
        };
      } catch (error) {
        console.warn(`Failed to fetch weather for location ${id}:`, error);

        return {
          locationId: id,
          temperature: null,
        };
      }
    }),
  );
};

export { getWeatherForLocations };
