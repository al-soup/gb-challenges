// --------------------
// 1. REPOSITORY
// --------------------

/**
 * External library providing weather data from two different services
 * This libary has not been parsed to TypeScript yet
 */
// NOTE: moved to wrappers/api.repository.ts in order to use esm import in all of the project
// const ApiRepository = require('./libs/api.repository.js').default;
// const apiRepository = new ApiRepository();

// --------------------
// 2. MOCK DATA
// --------------------

const locations = [
  { id: 0, name: 'Zürich', lat: 47.36667, long: 8.55 },
  { id: 1, name: 'Luzern', lat: 47.05048, long: 8.30635 },
  { id: 2, name: 'Bern', lat: 46.94809, long: 7.44744 },
  { id: 3, name: 'Basel', lat: 47.55839, long: 7.57327 },
  { id: 4, name: 'Genf', lat: 46.20222, long: 6.14569 },
  { id: 5, name: 'Lausanne', lat: 46.516, long: 6.63282 },
  { id: 6, name: 'St. Gallen', lat: 47.42391, long: 9.37477 },
  { id: 7, name: 'Lugano', lat: 46.01008, long: 8.96004 },
  { id: 8, name: 'Winterthur', lat: 47.5, long: 8.75 },
  { id: 9, name: 'Thun', lat: 46.75118, long: 7.62166 },
];

// --------------------
// 3. SOLUTION
// --------------------

import { getTemperaturesForLocations } from './weather';

getTemperaturesForLocations(locations).then((temperatures) =>
  console.table(temperatures),
);
