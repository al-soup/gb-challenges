import { createRequire } from "module";

interface ApiRepository {
  getWeatherFromServiceA: (lat: number, long: number) => Promise<unknown>;
  getWeatherFromServiceB: (lat: number, long: number) => Promise<unknown>;
}

type ApiRepositoryModule = {
  new (): ApiRepository;
};

const require = createRequire(import.meta.url);
const ApiRepositoryModule = require("../libs/api.repository.js").default;

export default ApiRepositoryModule as unknown as ApiRepositoryModule;
