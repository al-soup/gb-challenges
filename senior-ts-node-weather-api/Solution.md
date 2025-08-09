# Solution

## 1. First Impressions of the APIs

| API | Pros | Cons |
|-----|------|------|
| **A** | Shows data generation metadata; Minimal response structure | Inconsistent data types (`string` vs `number`); Unknown amount of different source categories; Possible unit inconsistencies (°F vs °C) because of different sources; Inconsistent data types might also mean varying notation (e.g. `'°C'` vs `'C'`) |
| **B** | Additional information like location and elevation data; Descriptive naming | Excessive timestamp precision |

I have a preference for **API B** because of the additional detail of the response and because I could not detect inconsistency in the data format as in API A.

## 2. Solving the Task

- There is a need for some kind of validation to deal with unknown/untyped APIs and in this case ZOD fits the bill perfectly. It also comes with great type inference for further development benefits.
- I changed the lib import to ESM for a (opinionated) better developer experience and to avoid mixing import syntax.
- Chose to use only data from API B since I prefer this response format (see [previous section](#1-first-impressions-of-the-apis)) and don't see the need for using both (see [next section](#3-expanding-the-solution))
- To decide on a final return type I would need more information about how this function is intended to be used. In the [next section](#3-expanding-the-solution) I'm noting a few variants of how the data could be returned alternatively. For now I'm going with a rather simple return type which will just include the temperature and the ID of the location. For presentation I could fetch the location name via a getter-function via the locations's ID. In case a locations temperature could not be determined I mark this with `null`.

```ts
type Weather = {
  locationId: number;
  temperature: number | null;
};
```

## 3. Expanding the Solution

To decide on a different return type and thus a different implementation of the function I would need a better understanding of the requirements. Below I have noted possible expansions or alternatives to the current solution:

- **Handle discrepancies in temperature**: in case we might get different temperature when querying in API A and we could return a temperature range instead

```ts
type Weather = {
   locationId: number;
   temperatureRange: [number, number]
}
```

- **Handle unavailability**: What if a service does not return for a given location or is unavailable? We could query the other API as back-up and note in the response where the data came from. Or what if our preferred service B returns data with a measuring point lat/long coordinates that are far from the location that we requested? Should we return the temperature of API A instead?

```ts
type Weather = {
   locationId: number;
   temperature: number;
   source: 'A' | 'B';
}
```

- **Handle required detail**: who are the consumers of our function? Do they require a higher level of detail? Maybe we should combine the responses from both APIs and try to return as much information as possible?

```ts
type Weather = {
   location: Location,
   temperature: number;
   unit: 'C' | 'F';
   source: 'A' | 'B' // use to create discriminated union types
   measurement?: 'IOT-Sensor' | '...' // try to infer categories by scraping a lot of locations
   distanceToMeasuringPoint?: number;
   elevation?: number
   // ...
}
```
