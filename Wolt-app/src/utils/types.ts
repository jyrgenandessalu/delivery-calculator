// Structure for static data returned by the API
export interface StaticData {
  venue_raw: {
    location: {
      coordinates: [number, number]; // Longitude and latitude of the venue
    };
  };
}
// Structure for dynamic data returned by the API
export interface DynamicData {
  venue_raw: {
    delivery_specs: {
      order_minimum_no_surcharge: number; // Minimum cart value to avoid surcharge
      delivery_pricing: {
        base_price: number; // Base delivery fee
        distance_ranges: {
          min: number; // Minimum distance for this range (inclusive)
          max: number; // Maximum distance for this range (exclusive, or 0 for no limit)
          a: number; // Flat fee for this distance range
          b: number; // Multiplier for distance-based fee
          flag: unknown; // Additional flag (not used in this project)
        }[];
      };
    };
  };
}