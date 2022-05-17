import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

// Components
import Form from '../form/Form';
// Styles
import '../../styles/Login.css';

const Login = () => {
  const INITIAL_DATA = {
    email: '',
    password: '',
  };

  const handleFormSubmit = (evt) => {
    console.log('Submitted Form!');
  };

  const inputs = [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Email',
      logo: <FontAwesomeIcon icon={faEnvelope} className="Input-Logo" />,
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Password',
      logo: <FontAwesomeIcon icon={faLock} className="Input-Logo" />,
    },
  ];

  return (
    <div className="Login">
      <Form
        INITIAL_DATA={INITIAL_DATA}
        handleFormSubmit={handleFormSubmit}
        inputs={inputs}
        classes="Login-Form"
        title="Login"
        button_label="Login"
      />
    </div>
  );
};

export default Login;
