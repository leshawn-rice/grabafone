import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <div key={input.name} className="Form-InputGroup">
            {input.logo}
            <input
              className={`Form-Input ${input.classes ? input.classes : ''}`}
              type={input.type}
              name={input.name}
              id={input.name}
              placeholder={input.placeholder}
              onChange={handleChange}
              value={formData[input.name]}
              required={input.required}
            />
            {input.button}
          </div>
        ))}
      </div>
      <button className="Form-Btn">{button_label}</button>
      <div className="Form-Footer">
        {footer.map((footerElement) => (
          <Link
            key={footerElement.key}
            className={`Form-Footer-Link ${footerElement.classes}`}
            to={footerElement.path}
          >
            {footerElement.text}
          </Link>
        ))}
      </div>
    </form>
  );
};

export default Form;
