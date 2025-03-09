import React from 'react';

const SettingsItem = ({id, text, showSetting}) => {
  return (
    <div className="settings-sidebar-item" id={id}  onClick={showSetting}>
      <p className="settings-text">{text}</p>
      <div className="settings-text-bar"></div>
    </div>
  )
}

export default SettingsItem