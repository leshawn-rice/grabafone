import React from 'react';
// Styles
import '../../styles/Alert.css';

const Alert = ({error}) => {
  const clearError = () => {
    console.log("Clearing the error!");
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