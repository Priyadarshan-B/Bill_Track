import React from "react";
import { Input } from "@nextui-org/react";

const InputBox = ({ type = "text", value, onChange, placeholder, style, max, min, name }) => {
  return (
    <div>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        className="bordered input w-full"
        style={style}
        max={max}
        min={min}
        clearable
        bordered
        fullWidth
        name={name}
      />
    </div>
  );
};

export default InputBox;


// import React,{useState} from "react";
// import './textbox.css'

// const InputBox = ({ type, value, onChange, placeholder, style, max, min }) => {
//     return (
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="text-input"
//         style={style}
//         max={max}
//         min={min}
//       />
//     );
//   };

//   export default InputBox;
