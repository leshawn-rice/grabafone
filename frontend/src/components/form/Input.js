import React from 'react';
// Styles
import '../../styles/Input.css';

const Input = ({ input, formData, handleChange }) => {
  return (
    <input
      className={`Input ${input.classes ? input.classes : ''}`}
      type={input.type}
      name={input.name}
      id={input.name}
      placeholder={input.placeholder}
      onChange={handleChange}
      value={formData[input.name]}
      required={input.required}
    />
  );
};

export default Input;
