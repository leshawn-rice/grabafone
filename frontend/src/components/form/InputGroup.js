import React from 'react';
// Styles
import '../../styles/InputGroup.css';
import Input from './Input';

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
