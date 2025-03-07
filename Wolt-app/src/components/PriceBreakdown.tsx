import React from "react";

//structure for the PriceBreakdown component
interface BreakdownProps {
  cartValue: number;
  smallOrderSurcharge: number;
  deliveryFee: number;
  deliveryDistance: number;
  totalPrice: number;
}

// Functional component for rendering the price breakdown
const PriceBreakdown: React.FC<{ breakdown: BreakdownProps }> = ({ breakdown }) => (
  <div
    style={{
      padding: "15px",
      backgroundColor: "black",
      borderRadius: "10px",
      color: "white",
      marginTop: "20px",
    }}
  >
    {[
      // List of items to display with labels and corresponding values
      { label: "Cart Value", value: `${breakdown.cartValue.toFixed(2)} EUR` },
      { label: "Small Order Surcharge", value: `${breakdown.smallOrderSurcharge.toFixed(2)} EUR` },
      { label: "Delivery Fee", value: `${breakdown.deliveryFee.toFixed(2)} EUR` },
      { label: "Delivery Distance", value: `${breakdown.deliveryDistance} meters` },
      { label: "Total Price", value: `${breakdown.totalPrice.toFixed(2)} EUR` },
    ].map((item, index) => (
      // Render each item in a flexbox row with label and value
      <div
        key={index} // Unique key for each row
        style={{
          display: "flex", // Flexbox for alignment
          justifyContent: "space-between", // Space out label and value
          marginBottom: "8px", // Add spacing between rows
        }}
      >
        {/* Display the label */}
        <span style={{ fontWeight: "500", fontSize: "1rem" }}>{item.label}</span>
        {/* Display the value */}
        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>{item.value}</span>
      </div>
    ))}
  </div>
);

export default PriceBreakdown;
