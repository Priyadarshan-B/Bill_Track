// import React from "react";
// import Select from "react-select"; 

// const CustomSelect = ({ value, onChange, placeholder, options = [], label, name, style }) => {
//   const formattedOptions = options.map((option) => ({
//     value: option.value,
//     label: option.label,
//   }));

//   return (
//     <div className="custom-select" style={style}>
//       <label>{label}</label>
//       <Select
//         value={formattedOptions.find((option) => option.value === value)}
//         onChange={(selectedOption) => onChange(name, selectedOption.value)} 
//         options={formattedOptions}
//         placeholder={placeholder || `Select ${label}`}
//         isClearable
//         isSearchable 
//       />
//     </div>
//   );
// };

// export default CustomSelect;

import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const CustomSelect = ({ value = '', onChange, placeholder, options = [], label, name, style }) => {
  return (
    <div className="custom-select" style={style}>
      <FormControl fullWidth>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          labelId={`${name}-label`}
          id={name}
          value={value}
          placeholder = {placeholder}
          onChange={(e) => onChange(e)} 
          label={label}
          displayEmpty
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CustomSelect;
