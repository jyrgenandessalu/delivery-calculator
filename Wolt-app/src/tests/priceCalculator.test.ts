import { calculatePriceBreakdown } from "../utils/priceCalculator";

test("calculates price breakdown correctly", () => {
  const cartValue = 800; // in cents
  const userLatitude = 60.17094;
  const userLongitude = 24.93087;
  const staticData = {
    venue_raw: {
      location: { coordinates: [24.93087, 60.17094] as [number, number] },
    },
  };
  const dynamicData = {
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

  const breakdown = calculatePriceBreakdown(cartValue, userLatitude, userLongitude, staticData, dynamicData);

  expect(breakdown.cartValue).toBe(800);
  expect(breakdown.smallOrderSurcharge).toBe(200);
  expect(breakdown.deliveryFee).toBe(299); // Adjusted based on `distance_ranges`
  expect(breakdown.totalPrice).toBe(1299); // Ensure this matches your expectations
});
