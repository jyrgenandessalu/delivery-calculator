import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

test("renders Delivery Order Price Calculator", () => {
  render(<App />);
  const title = screen.getByText(/Delivery Order Price Calculator/i);
  expect(title).toBeInTheDocument();
});

test("shows error when latitude or longitude is missing", () => {
  render(<App />);
  const calculateButton = screen.getByText(/Calculate Delivery Price/i);
  fireEvent.click(calculateButton);

  const errorMessage = screen.getByText(/Cart value must be a positive number/i);
  expect(errorMessage).toBeInTheDocument();
});
