import { getStaticData, getDynamicData } from "../utils/api";

// Mocking the API functions
jest.mock("../utils/api", () => ({
  getStaticData: jest.fn(async (venueSlug: string) => {
    if (venueSlug === "valid-slug") {
      return {
        venue_raw: {
          location: {
            coordinates: [24.93087, 60.17094] as [number, number],
          },
        },
      };
    }
    throw new Error("Venue slug not found. Please enter a valid slug.");
  }),
  getDynamicData: jest.fn(async (venueSlug: string) => {
    if (venueSlug === "valid-slug") {
      return {
        venue_raw: {
          delivery_specs: {
            order_minimum_no_surcharge: 1000,
            delivery_pricing: {
              base_price: 199,
              distance_ranges: [
                { min: 0, max: 500, a: 100, b: 1, flag: null },
                { min: 500, max: 1000, a: 200, b: 2, flag: null },
              ],
            },
          },
        },
      };
    }
    throw new Error("Venue slug not found. Please enter a valid slug.");
  }),
}));

test("fetches static data", async () => {
  const staticData = await getStaticData("valid-slug");
  expect(staticData.venue_raw.location.coordinates).toEqual([24.93087, 60.17094]);
});

test("fetches dynamic data", async () => {
  const dynamicData = await getDynamicData("valid-slug");
  expect(dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge).toBe(1000);
  expect(dynamicData.venue_raw.delivery_specs.delivery_pricing.base_price).toBe(199);
  expect(dynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges).toEqual([
    { min: 0, max: 500, a: 100, b: 1, flag: null },
    { min: 500, max: 1000, a: 200, b: 2, flag: null },
  ]);
});
