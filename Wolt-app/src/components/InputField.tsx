import React from 'react';

// structure for the InputField
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId: string;
}

// Functional component for rendering a labeled input field
const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, dataTestId }) => (
  <div>
    <label>{label}</label>
    <input
      type="text"
      value={value}
      onChange={onChange}
      data-testid={dataTestId}
    />
  </div>
);

export default InputField;
