// External Dependencies
import React from 'react';
// Components
import Input from './Input';
// Styles
import '../../styles/InputGroup.css';

const InputGroup = ({ input, formData, handleChange }) => {
  return (
    <div className="InputGroup">
      {input.logo}
      <Input input={input} formData={formData} handleChange={handleChange} />
      {input.button}
    </div>
  );
};

export default InputGroup;
