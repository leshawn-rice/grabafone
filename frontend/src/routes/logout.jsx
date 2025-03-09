import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom'; 
import { logoutUser } from '../redux/actionCreators';

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser())
  }, [dispatch]);

  return <Navigate to="/" />;
}

export default Logout;