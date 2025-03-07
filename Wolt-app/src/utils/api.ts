import staticDataMock from './staticData.json';
import dynamicDataMock from './dynamicData.json';
import { StaticData, DynamicData } from './types';

// Fetches static data for a given venue slug
export const getStaticData = async (venueSlug: string): Promise<StaticData> => {
  if (venueSlug === 'home-assignment-venue-helsinki') {
      return staticDataMock as unknown as StaticData;
  }
  throw new Error(`Venue slug  not found. Please enter a valid slug.`);
};

// Fetches dynamic data for a given venue slug
export const getDynamicData = async (venueSlug: string): Promise<DynamicData> => {
  if (venueSlug === 'home-assignment-venue-helsinki') {
      return dynamicDataMock as DynamicData;
  }
  throw new Error(`Venue slug  not found. Please enter a valid slug.`);
};
