# Delivery Order Price Calculator (DOPC)

This is a **Delivery Order Price Calculator (DOPC)** built using **React** and **TypeScript**. It calculates the total delivery price and provides a breakdown of the pricing for delivery orders. The application integrates with the Home Assignment API to fetch venue-related data and supports testing using **Jest**.

---

## Features

- Input fields for **venue slug**, **cart value**, **user latitude**, and **longitude**
- Button to fetch the user's **current location**
- Calculation of **delivery fees**, **small order surcharges**, and **total price**
- Validation of user inputs with **error messages** for invalid values
- Tests implemented using **Jest** for key functionalities
- Accessible and test-friendly design with `data-test-id` attributes

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (version 14 or later)
- **npm** or **yarn**

### Setup Instructions

1. Clone the repository.
- git clone https://github.com/jyrgenandessalu/delivery-calculator.git
2. Head to the root folder
  
### Install dependencies:

--- npm install

## Running the Application

Start the development server:

--- npm run dev

The application will be available at http://localhost:5173.

## Running Tests

To run the test suite:

--- npm test

This will execute all the test cases written with Jest and provide a summary of the results.

### Build for Production

To build the application for production:

--- npm run build

The production build will be output in the dist directory.

## Project Structure

Here's an overview of the main files and directories:

- src/components: Contains reusable UI components like InputField and PriceBreakdown.

- src/utils: Contains utility functions for calculations and validations, such as:

- calculateDistance

- calculatePriceBreakdown

- validateInputs

- src/tests: Contains Jest test cases for individual modules.

- src/App.tsx: Main application file.

- src/App.css: Styles for the application.

## API Integration

The application integrates with the Home Assignment API for static and dynamic venue data. Endpoints used:

- GET /home-assignment-api/v1/venues/<VENUE SLUG>/static

- GET /home-assignment-api/v1/venues/<VENUE SLUG>/dynamic

Example valid venue slug:

- home-assignment-venue-helsinki

## Testing Details

The test suite covers:

- Component rendering

- Input validation

- Distance calculations

- Delivery price breakdown logic

All tests are implemented using Jest. To ensure testability, components and functions use data-test-id attributes.

## Notes

- Only the venue slug home-assignment-venue-helsinki is supported for demo purposes.

- Errors are shown for unsupported venue slugs or invalid inputs.

- All money-related values are handled in cents for accuracy.

## License

This project is licensed under the MIT License.

Feel free to explore, test, and modify the application.

