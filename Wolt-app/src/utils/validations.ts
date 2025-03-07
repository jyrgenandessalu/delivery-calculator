// Validates the input values for cart value, latitude, and longitude
export const validateInputs = (cartValue: number, latitude: number, longitude: number) => {
    if (isNaN(cartValue) || cartValue <= 0) {
      return "Cart value must be a positive number.";
    }
    if (!latitude || isNaN(Number(latitude)) || Number(latitude) < -90 || Number(latitude) > 90) {
      return "Latitude must be a valid number between -90 and 90.";
    }
    if (!longitude || isNaN(Number(longitude)) || Number(longitude) < -180 || Number(longitude) > 180) {
      return "Longitude must be a valid number between -180 and 180.";
    }
    // Return null if all inputs are valid
    return null;
  };
  