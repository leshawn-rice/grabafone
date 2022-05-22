import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faEye,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Internal Dependencies
import { revealPassword } from '../../utils';
import { registerUserApi, clearErrors } from '../../redux/actionCreators';
// Components
import Form from '../form/Form';
// Styles
import '../../styles/SignUp.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const INITIAL_DATA = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleFormSubmit = (formData) => {
    dispatch(registerUserApi(formData));
  };

  const inputs = [
    {
      name: 'username',
      type: 'username',
      required: true,
      placeholder: 'Username',
      logo: <FontAwesomeIcon icon={faUser} className="Input-Logo" />,
    },
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

  if (user.username) return <Navigate to="/" />
 
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
