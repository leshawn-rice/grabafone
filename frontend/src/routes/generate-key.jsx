import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'; 
import { generateKeyApi } from '../redux/actionCreators';
import '../styles/GenerateKey.css' 

const GenerateKey = () => {
  const [hasKey, setHasKey] = useState(false);
  const dispatch = useDispatch();
  const apiKey = useSelector(state => state.api_key);
  const token = useSelector(state => state.token);

  useEffect(() => {
    if (apiKey) setHasKey(true);
  }, [setHasKey, apiKey]);

  if (hasKey === true) {
    return <Navigate to="/profile" />
  }

  const handleClick = () => {
    dispatch(generateKeyApi(token))
  }

  return (
    <div className="generate-key">
      <p className="generate-key-text">Want an API Key?
        <span>
          <button 
          onClick={handleClick}
          className="generate-key-button">Click here</button>
        </span>
      </p>
    </div>
  );
}

export default GenerateKey;