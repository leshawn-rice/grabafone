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
  messages=[],
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
    handleFormSubmit(formData);
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
        {messages.map((idx, message) => (
          <textarea
           id={message.id}
           name={message.name ? message.name : 'message'}
           key={message.key ? message.key : idx}
           cols={message.width ? message.width : 100} 
           rows={message.height ? message.height : 25}
           placeholder={message.placeholder ? message.placeholder : 'I found a bug!'}
           onChange={handleChange}
          />
        ))}
      </div>
      <FormBtn label={button_label} />
      <FormFooter footer={footer} />
    </form>
  );
};

export default Form;
