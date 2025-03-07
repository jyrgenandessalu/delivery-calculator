import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../components/InputField";

test("renders InputField and handles input change", () => {
  const handleChange = jest.fn();
  render(<InputField label="Test Label" value="" onChange={handleChange} dataTestId="testInput" />);

  const input = screen.getByTestId("testInput");
  expect(screen.getByText("Test Label")).toBeInTheDocument();
  fireEvent.change(input, { target: { value: "New Value" } });
  expect(handleChange).toHaveBeenCalledTimes(1);
});
