# Solution

## First Impressions of the API Responses

   Pros *API A*: Displays how the data was generated as an interesting insight. Minimal amount of information
   Cons *API A*: Different sources don't seem to return the same format for numbers (string vs number temperature). Since we don't know how many sources there are we don't know if they some might deliver the values in Fahrenheit. Or even if we can trust the unit kind. Plus the notation of the unit might even be different: `'°C'` vs `'C'`
   Pros *API B*: It's good to know the location where the temperature was measured and at what elevation -> very precise information. Since we are requesting temperature information for a very precise location (<https://xkcd.com/2170/>) it is good to know how far from the requested place we measure. More descriptive naming.
   Cons *API B*: I don't see the benefit of returning the generation time. Especially with so much precision.

- Preference: *API B*
