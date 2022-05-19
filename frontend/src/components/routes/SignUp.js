import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye } from '@fortawesome/free-solid-svg-icons';
// Internal Dependencies
import { revealPassword } from '../../utils';
// Components
import Form from '../form/Form';
// Styles
import '../../styles/SignUp.css';

const SignUp = () => {
  const INITIAL_DATA = {
    email: '',
    password: '',
    confirm_password: '',
  };

  const handleFormSubmit = (evt) => {
    console.log('Submitted Form!');
  };

  const inputs = [
    {
      name: 'email',
      type: 'email',
      required: true,
      placeholder: 'Email',
      logo: <FontAwesomeIcon icon={faEnvelope} className="Input-Logo" />,
    },
    {
      name: 'password',
      type: 'password',
      required: true,
      placeholder: 'Password',
      logo: <FontAwesomeIcon icon={faLock} className="Input-Logo" />,
      button: (
        <FontAwesomeIcon
          icon={faEye}
          onClick={revealPassword}
          className="Input-Password-Btn"
        />
      ),
    },
    {
      name: 'confirm_password',
      type: 'password',
      required: true,
      placeholder: 'Confirm Password',
      logo: <FontAwesomeIcon icon={faLock} className="Input-Logo" />,
      button: (
        <FontAwesomeIcon
          icon={faEye}
          onClick={revealPassword}
          className="Input-Password-Btn"
        />
      ),
    },
  ];

  return (
    <div className="SignUp">
      <Form
        INITIAL_DATA={INITIAL_DATA}
        handleFormSubmit={handleFormSubmit}
        inputs={inputs}
        classes="SignUp-Form"
        title="Register"
        button_label="Create Account"
        footer={[]}
      />
    </div>
  );
};

export default SignUp;
