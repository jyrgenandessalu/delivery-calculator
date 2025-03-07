import { calculateDistance } from "../utils/calculateDistance";

test("calculates distance correctly between two points", () => {
  const lat1 = 60.16952;
  const lon1 = 24.93545;
  const lat2 = 60.17094;
  const lon2 = 24.93087;

  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  expect(Math.round(distance)).toBe(299);
});
