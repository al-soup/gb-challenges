# Solution

## 1. First Impressions of the APIs

   Pros *API A*: Displays how the data was generated as an interesting insight. Minimal amount of information
   Cons *API A*: Different sources don't seem to return the same format for numbers (string vs number temperature). Since we don't know how many sources there are we don't know if they some might deliver the values in Fahrenheit. Or even if we can trust the unit kind. Plus the notation of the unit might even be different: `'°C'` vs `'C'`
   Pros *API B*: It's good to know the location where the temperature was measured and at what elevation -> very precise information. Since we are requesting temperature information for a very precise location (<https://xkcd.com/2170/>) it is good to know how far from the requested place we measure. More descriptive naming.
   Cons *API B*: I don't see the benefit of returning the generation time. Especially with so much precision.

- Preference: *API B*

## 2. Solving the Task

- Need for some kind of validation and ZOD fits the bill perfectly for this job as it also comes with great type inference.
- Imported via esm and and I also wanted to use esm for the rest of the project why I wrote a wrapper for the ApiRepository so I would not have to mix import syntax.
- Focusing on data from API B since I prefer this response format (see [previous section](#1-first-impressions-of-the-apis))
- To decide on a better return type I would need more information about how this function is intended to be used. In the [next section](#expanding-the-solution) I'm noting a few variants of how the data could be returned. For now I'm going with a rather simple return type which will just include the temperature and the name of the location.

... Depending on the consumer we could also just return the ID of the location so the information if easier to process. But this is not required in the task ....
// TODO check all returned data again
// TODO decide on wether to return ID or name of the location

```ts
{
   name: string;
   temperature: number;
}[]
```

## Expanding the Solution

Deciding on a different return type and thus a different implementation of the function would need a better understanding of the requirements. Below I have noted possible expansions or alternative to the current solution:

- handle discrepancies in temperature: we might get different temperature values how should we handle those? This very much depends on the goal of API that we are creating: we could return a temperature range

```ts
{
   location: string;
   temperatureRange: [number, number]
}[]
```

- Handle unavailability: What if a service does not return for a given location or is unavailable? We could query the other API as back-up and note in the response where the data comes from. Or what if our preferred service B returns data with a measuring point lat/long coordinates that are far from the location that we requested? Should we return the temperature of API A instead?

```ts
{
   location: string;
   temperature: number;
   source: 'A' | 'B';
}[]
```

- Handle required detail: who are the consumers of our function? Do they require a higher level of detail? Maybe we should combine the responses from both APIs and try to return as much information as possible?

```ts
{
   location: Location,
   temperature: number;
   source: 'A' | 'B'
   unit: 'Celsius';
   measurement?: 'IOT-Sensor' | '...' // try to infer categories
   distanceToMeasuringPoint?: number;
   elevation?: number
   // ...
}[]
```
