import React from 'react';

type InputProps = {
  type: string
  placeholder: string
  value: string| number
  onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void
}

const Input = ({ type, placeholder, value, onChange } : InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};


export default Input;