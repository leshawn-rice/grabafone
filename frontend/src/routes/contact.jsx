import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../redux/actionCreators';
import Form from '../components/form/Form';
import '../styles/Contact.css'

const Contact = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user);
  
  const INITIAL_DATA = {
    email: user.email ? user.email : '',
    message: '',
  };


  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const handleFormSubmit = (formData) => {
    console.log(formData);
  }

  const inputs = [
    {
      name: 'email',
      type: 'email',
      required: true,
      placeholder: user.email ? user.email : 'user@email.com',
      logo: <FontAwesomeIcon icon={faEnvelope} className="Input-Logo" />,
    },
  ];

  const messages = [{
    key: 'contact-message-area',
    id: 'message',
    name: 'message',
    width: 100,
    height: 25,
    placeholder: 'I found a bug!',
  }];

  const footers = [
    {key: 'Go-Home', path: '/', text: 'Go Home', classes: 'Contact-Footer-Link'}
  ];

  return (
    <div className="Contact">
      <Form 
        INITIAL_DATA={INITIAL_DATA} 
        classes='Contact-Form'
        title='Contact the Grabafone Team!'
        handleFormSubmit={handleFormSubmit}
        button_label='Send'
        inputs={inputs}
        footer={footers}
        messages={messages}
      />
    </div>
  )
}

export default Contact;