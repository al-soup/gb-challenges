// --------------------
// 1. TIMEOUT + MOCK DATA
// --------------------
const TIMEOUT = 100;

interface Ad {
  id: number;
  impressionId: number;
}

interface Impression {
  id: number;
  impressions: number;
}

type AdId = number;
type ImpressionCount = number;
type ImpressionSummary = {
  totalImpressions: ImpressionCount;
  executionTime: number;
};

const ads: Ad[] = [
  { id: 1, impressionId: 1 },
  { id: 2, impressionId: 2 },
  { id: 3, impressionId: 3 },
  { id: 4, impressionId: 4 },
];

const impressions: Impression[] = [
  { id: 1, impressions: 1000 },
  { id: 2, impressions: 2000 },
  { id: 3, impressions: 3000 },
  { id: 4, impressions: 4000 },
];

// --------------------
// 2. MOCK ASYNC FUNCTIONS
// --------------------
export const getAllAdsIds = (): Promise<number[]> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(ads.map((a) => a.id)), TIMEOUT)
  );

export const getAdById = (adId: number): Promise<Ad | undefined> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(ads.find((ad) => ad.id === adId));
    }, TIMEOUT * 2)
  );

export const getAdImpression = (
  impressionId: number
): Promise<Impression | undefined> =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve(impressions.find((imp) => imp.id === impressionId));
    }, TIMEOUT)
  );

// --------------------
// 3. TASK: getAllImpressions
// --------------------
export const getAllImpressions = async (): Promise<ImpressionSummary> => {
  const adIds = await getAllAdsIds();
  const startTime = Date.now();

  // Each add impression is stored in a map from which we later calculate the total impressions.
  const adImpressions = new Map<AdId, ImpressionCount>();

  const fetchAdImpressions = adIds.map(async (adId: AdId) => {
    let adImpression: Impression | undefined;
    try {
      const ad = await getAdById(adId);
      if (!ad) return;

      adImpression = await getAdImpression(ad?.impressionId);
    } catch (error) {
      console.error(`Error fetching ad impression for adId ${adId}:`, error);

      return;
    }

    if (adImpression) {
      adImpressions.set(adId, adImpression.impressions);
    }
  });

  // Run fetches for all ads and their impressions concurrently and write each result to the map as they are returned.
  // Using the event loop in this way will handle multiple requests more efficiently with concurrency than waiting for each one sequentially.
  // The minimum execution time of `getAdImpressions` is the greatest sum of the duration of `getAdById` + `getAdImpression` for a given adId.
  // An alternative with parallel execution via worker threads is not suitable for this task as it is more I/O related than CPU extensive.
  await Promise.all(fetchAdImpressions);

  // Sum up the results
  const totalImpressions = [...adImpressions.values()].reduce(
    (sum, impressions) => sum + impressions,
    0
  );

  const endTime = Date.now();
  const executionTime = endTime - startTime;

  return {
    totalImpressions,
    executionTime,
  };
};

// Run to test:
getAllImpressions()
  .then((res) => console.table(res))
  .catch((err) => console.error("Error: ", err));
