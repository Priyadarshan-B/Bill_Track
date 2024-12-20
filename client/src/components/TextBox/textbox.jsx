import React from "react";
import { Input } from "@nextui-org/react";
import './textbox.css'

const InputBox = ({ type = "text", value, onChange,label, placeholder, style, max, min, name }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Input
        type={type}
        value={value}
        label={label}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        style={style}
        max={max}
        min={min}
        clearable
        bordered
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
