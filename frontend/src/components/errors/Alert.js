import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeError } from '../../redux/actionCreators';
// Styles
import '../../styles/Alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCross, faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';

const Alert = ({error}) => {
  useEffect(() => {
    setTimeout(() => {
      clearError();
    }, 5000);
  });
  
  const dispatch = useDispatch();

  const clearError = () => {
    dispatch(removeError(error.id));
  }
  
  return (
    <div className="Alert">
      <div className="Alert-Content">
        <FontAwesomeIcon icon={faExclamation} className="Exclamation" />
        <div className="Alert-Message">
          <span className="Alert-Text Alert-Header">Error</span>
          <span className="Alert-Text Alert-Body">{error.message}</span>
        </div>
      </div>
      <FontAwesomeIcon className="Alert-Close" icon={faXmark} onClick={clearError} />
      <div class="progress active"></div>
    </div>
  )
}

export default Alert;