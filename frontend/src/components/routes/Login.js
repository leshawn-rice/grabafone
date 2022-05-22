// External Dependencies
import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faLock } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
// Internal Dependencies
import { revealPassword } from '../../utils';
import { loginUserApi, clearErrors } from '../../redux/actionCreators';

// Components
import Form from '../form/Form';
// Styles
import '../../styles/Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const INITIAL_DATA = {
    email: '',
    password: '',
  };

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleFormSubmit = (formData) => {
    dispatch(loginUserApi(formData));
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
  ];

  const footer = [
    {
      key: 'forgot-pw',
      text: 'Forgot Password',
      path: '/forgot-password',
      classes: 'Login-Footer-Link',
    },
    {
      key: 'create-acct',
      text: 'Create an Account',
      path: '/register',
      classes: 'Login-Footer-Link',
    },
  ];

  if (user.username) return <Navigate to="/" />

  return (
    <div className="Login">
      <Form
        INITIAL_DATA={INITIAL_DATA}
        handleFormSubmit={handleFormSubmit}
        inputs={inputs}
        classes="Login-Form"
        title="Login"
        button_label="Login"
        footer={footer}
      />
    </div>
  );
};

export default Login;
