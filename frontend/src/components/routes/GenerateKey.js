import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GenerateKey = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    // Check if user has a key
    // If so, show the user, prompt to delete,
    // Otherwise, allow to generate API Key

    // Actually, show key in profile, just show an error or 
    // redirect to profile if key exists
  });

  return (
    <div className="generate-key">

    </div>
  );
}

export default GenerateKey;