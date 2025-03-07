import { calculateDistance } from "./calculateDistance";


export interface StaticData {
  venue_raw: {
    location: {
      coordinates: [number, number];
    };
  };
}

export interface DynamicData {
  venue_raw: {
    delivery_specs: {
      order_minimum_no_surcharge: number;
      delivery_pricing: {
        base_price: number;
        distance_ranges: {
          min: number;
          max: number;
          a: number;
          b: number;
          flag: unknown;
        }[];
      };
    };
  };
}

export const calculatePriceBreakdown = (
  cartValue: number, //  in cents
  userLatitude: number,
  userLongitude: number,
  staticData: StaticData,
  dynamicData: DynamicData
) => {
  const venueCoordinates = staticData.venue_raw.location.coordinates; // Extract venue coordinates

  // Calculate the straight-line distance between user and venue
  const deliveryDistance = calculateDistance(
    userLatitude,
    userLongitude,
    venueCoordinates[1],
    venueCoordinates[0]
  );

  // Check if distance exceeds 2000 meters
  if (deliveryDistance >= 2000) {
    throw new Error('Delivery distance exceeded');
  }

   // Calculate the small order surcharge, ensuring it is not negative
  const smallOrderSurcharge = Math.max(
    0,
    dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge - cartValue
  );

  // base price
  const basePrice = dynamicData.venue_raw.delivery_specs.delivery_pricing.base_price;

  // distance
  const distanceRange = dynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges.find(
    (range) =>
      deliveryDistance >= range.min &&
      (range.max === 0 || deliveryDistance < range.max) // Ensure max === 0 is correctly handled
  );
  
  if (!distanceRange) {
    console.error("Delivery distance exceeds all defined ranges:", { deliveryDistance });
    throw new Error("Delivery distance exceeds allowed range");
  }
  
  console.log("Selected Distance Range Debugging:", { distanceRange, deliveryDistance });
  

// Calculate delivery fee components
const distanceComponent = Math.round(distanceRange.b * (deliveryDistance / 10));
const deliveryFee = basePrice + distanceRange.a + distanceComponent;

//debug
console.log("Delivery Fee Debugging:", {
  basePrice,
  distanceRangeA: distanceRange.a,
  distanceRangeB: distanceRange.b,
  distanceComponent: Math.round(distanceRange.b * (deliveryDistance / 10)),
  deliveryFee,
});

 // Return the calculated breakdown of costs
  return {
    cartValue,
    smallOrderSurcharge,
    deliveryFee,
    deliveryDistance: Math.round(deliveryDistance), // Round to nearest meter
    totalPrice: cartValue + smallOrderSurcharge + deliveryFee,  // Total cost in cents
  };
};
