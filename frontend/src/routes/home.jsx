import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshTokenApi } from '../redux/actionCreators';

import '../styles/routes/home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token);

  useEffect(() => {
    dispatch(refreshTokenApi(token));
  }, [dispatch, token]);

  return (
    <div className="Home">
      <header className="Header">
        <h1>
          <span className="secondary">Grabafone </span>
          is a Free, Open Source API designed to allow developers to query data
          about cellular devices.
        </h1>
      </header>
    </div>
  );
};

export default Home;
