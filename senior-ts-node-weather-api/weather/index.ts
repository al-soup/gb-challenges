import ApiRepository from '../wrappers/api.repository';
import type { ApiAResponse, ApiBResponse } from './schemas';
import { apiAResponseSchema, apiBResponseSchema } from './schemas';

const apiRepository = new ApiRepository();

const getWeatherFromServiceA = async (
  lat: number,
  long: number,
): Promise<ApiAResponse> => {
  const data = await apiRepository.getWeatherFromServiceA(lat, long);
  // TODO decide on safeParse or try/catch
  return apiAResponseSchema.parse(data);
};

const getWeatherFromServiceB = async (
  lat: number,
  long: number,
): Promise<ApiBResponse> => {
  const data = await apiRepository.getWeatherFromServiceB(lat, long);
  return apiBResponseSchema.parse(data);
};

// TODO allow passing a list of locations
// TODO decide on final final type

export const getWeather = async (lat: number, long: number): Promise<any> => {
  getWeatherFromServiceA(lat, long).then((data) => {
    console.log('A', data);
  });
  getWeatherFromServiceB(lat, long).then((data) => {
    console.log('B', data);
  });
};
