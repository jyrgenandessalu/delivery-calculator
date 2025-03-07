import { validateInputs } from "../utils/validations";

test("validate inputs for missing latitude/longitude", () => {
  const error = validateInputs(10, 200, 200);
  expect(error).toBe("Latitude must be a valid number between -90 and 90.");
});

test("validate inputs for negative cart value", () => {
  const error = validateInputs(-5, 60.17094, 24.93087);
  expect(error).toBe("Cart value must be a positive number.");
});
