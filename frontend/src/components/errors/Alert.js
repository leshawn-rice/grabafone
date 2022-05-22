import React from 'react';
import { useDispatch } from 'react-redux';
import { removeError } from '../../redux/actionCreators';
// Styles
import '../../styles/Alert.css';

const Alert = ({error}) => {
  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(removeError(error.id));
  }
  return (
    <div className="Alert">
      <div className="Alert-Content">
        {error.message}
      </div>
      <div className="Alert-Close" onClick={clearError}>X</div>
    </div>
  )
}

export default Alert;