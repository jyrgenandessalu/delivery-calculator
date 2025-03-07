import React, { useState } from 'react';
import { getStaticData, getDynamicData } from './utils/api';
import { calculatePriceBreakdown } from './utils/priceCalculator';
import { validateInputs } from './utils/validations';
import { StaticData, DynamicData } from './utils/types';
import InputField from './components/InputField';
import PriceBreakdown from './components/PriceBreakdown';
import './App.css'; // CSS file for styling

const App: React.FC = () => {
  // State variables to manage user inputs and calculated results
  const [venueSlug, setVenueSlug] = useState('');
  const [cartValue, setCartValue] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [priceBreakdown, setPriceBreakdown] = useState<{
    cartValue: number;
    smallOrderSurcharge: number;
    deliveryFee: number;
    deliveryDistance: number;
    totalPrice: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch user's geolocation and update latitude/longitude states
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6)); // Keeping 6 decimals
          setLongitude(position.coords.longitude.toFixed(6));
          setError(null);
        },
        (error) => {
          console.error(error);
          setError('Unable to fetch location. Please allow location access and try again.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };
  
  // Main function to calculate delivery price breakdown

  const handleCalculatePrice = async () => {
    const validationError = validateInputs(Number(cartValue), Number(latitude), Number(longitude));
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Fetching static and dynamic data for the selected venue
      const staticData: StaticData = await getStaticData(venueSlug);
      const dynamicData: DynamicData = await getDynamicData(venueSlug);

      const breakdown = calculatePriceBreakdown(
        Math.round(Number(cartValue) * 100), // Convert EUR to cents
        Number(latitude),
        Number(longitude),
        staticData,
        dynamicData
      );

      //debug
      console.log("Price Breakdown Debugging:", {
        cartValue: breakdown.cartValue,
        smallOrderSurcharge: breakdown.smallOrderSurcharge,
        deliveryFee: breakdown.deliveryFee,
        deliveryDistance: breakdown.deliveryDistance,
        totalPrice: breakdown.totalPrice,
      })


      // Updating state with the calculated breakdown
      setPriceBreakdown({
        ...breakdown,
        cartValue: breakdown.cartValue / 100, // Convert back to EUR
        smallOrderSurcharge: breakdown.smallOrderSurcharge / 100,
        deliveryFee: breakdown.deliveryFee / 100,
        deliveryDistance: breakdown.deliveryDistance, // Distance remains as is
        totalPrice: breakdown.totalPrice / 100,
      });
      setError(null);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message); // Display the error message in the UI
      } else {
        setError('Failed to fetch data or calculate the price.');
      }
    }
  };

  return (
    <div className="app-container">
    <h1 className="title">DELIVERY ORDER PRICE CALCULATOR</h1>
    <div className="form-container">
      <InputField
        label="Venue Slug"
        value={venueSlug}
        onChange={(e) => setVenueSlug(e.target.value)}
        dataTestId="venueSlug"
      />
      <InputField
        label="Cart Value (EUR)"
        value={cartValue}
        onChange={(e) => setCartValue(e.target.value)}
        dataTestId="cartValue"
      />
      <InputField
        label="User Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        dataTestId="latitude"
      />
      <InputField
        label="User Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        dataTestId="longitude"
      />
      <button
        className="get-location-button"
        onClick={handleGetLocation}
        data-test-id="getLocation"
      >
        Get Location
      </button>
      <button
        className="calculate-button"
        onClick={handleCalculatePrice}
      >
        Calculate Delivery Price
      </button>
    </div>
    {error && <p className="error-message">{error}</p>}
    {priceBreakdown && (
      <div className="breakdown-container">
        <PriceBreakdown breakdown={priceBreakdown} />
      </div>
    )}
  </div>
  
  );
};

export default App;
