import React from "react";
import "./css/ReusableInput.css";

interface ReusableInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReusableInput: React.FC<ReusableInputProps> = ({ label, type = "text", value, onChange }) => {
  return (
    <div className="reusable-input-wrapper">
      <label className="reusable-input-label">{label}</label>
      <input className="reusable-input-field" type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default ReusableInput;
