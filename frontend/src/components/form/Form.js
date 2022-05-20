// External Dependencies
import React, { useState } from 'react';
// Components
import InputGroup from './InputGroup';
import FormFooter from './FormFooter';
import FormBtn from './FormBtn';
// Styles
import '../../styles/Form.css';

const Form = ({
  INITIAL_DATA,
  handleFormSubmit,
  inputs,
  classes,
  title,
  button_label,
  footer,
}) => {
  const [formData, setFormData] = useState(INITIAL_DATA);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_DATA);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetForm();
    handleFormSubmit();
  };

  return (
    <form className={`Form ${classes ? classes : ''}`} onSubmit={handleSubmit}>
      <h1 className="Form-Title">{title}</h1>
      <div className="Form-Inputs">
        {inputs.map((input) => (
          <InputGroup
            key={input.name}
            input={input}
            formData={formData}
            handleChange={handleChange}
          />
        ))}
      </div>
      <FormBtn label={button_label} />
      <FormFooter footer={footer} />
    </form>
  );
};

export default Form;
