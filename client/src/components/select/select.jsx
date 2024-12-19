import React from "react";
import Select from "react-select"; 

const CustomSelect = ({ value, onChange, placeholder, options = [], label, name, style }) => {
  const formattedOptions = options.map((option) => ({
    value: option.value,
    label: option.label,
  }));

  return (
    <div className="custom-select" style={style}>
      <label>{label}</label>
      <Select
        value={formattedOptions.find((option) => option.value === value)}
        onChange={(selectedOption) => onChange(name, selectedOption.value)} 
        options={formattedOptions}
        placeholder={placeholder || `Select ${label}`}
        isClearable
        isSearchable 
      />
    </div>
  );
};

export default CustomSelect;
