import React from "react";

const PatientInput = ({
  handleInputChange,
  required = false,
  field,
  value,
  placeholder,
  className = "",
  type = "text",
}) => {
  return (
    <input
      type={type}
      required={required}
      value={value || ""}
      onChange={(e) => handleInputChange(field, e.target.value)}
      className={`w-full px-3 py-2 shadow bg-white/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      placeholder={placeholder}
    />
  );
};

export default PatientInput;
