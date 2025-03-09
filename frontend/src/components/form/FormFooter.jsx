// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import '../../styles/FormFooter.css';

const FormFooter = ({ footer }) => {
  return (
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
  );
};

export default FormFooter;
