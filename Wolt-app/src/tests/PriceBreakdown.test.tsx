import { render, screen } from "@testing-library/react";
import PriceBreakdown from "../components/PriceBreakdown";

test("renders PriceBreakdown with provided data", () => {
  const breakdown = {
    cartValue: 10.5,
    smallOrderSurcharge: 2.5,
    deliveryFee: 3.99,
    deliveryDistance: 500,
    totalPrice: 16.99,
  };

  render(<PriceBreakdown breakdown={breakdown} />);

  // Match individual labels and values
  expect(screen.getByText("Cart Value")).toBeInTheDocument();
  expect(screen.getByText("10.50 EUR")).toBeInTheDocument();

  expect(screen.getByText("Small Order Surcharge")).toBeInTheDocument();
  expect(screen.getByText("2.50 EUR")).toBeInTheDocument();

  expect(screen.getByText("Delivery Fee")).toBeInTheDocument();
  expect(screen.getByText("3.99 EUR")).toBeInTheDocument();

  expect(screen.getByText("Delivery Distance")).toBeInTheDocument();
  expect(screen.getByText("500 meters")).toBeInTheDocument();

  expect(screen.getByText("Total Price")).toBeInTheDocument();
  expect(screen.getByText("16.99 EUR")).toBeInTheDocument();
});
