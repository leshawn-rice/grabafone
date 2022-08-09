// External Dependencies
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Styles
import '../../styles/Settings.css';
import SettingsItem from '../settings/SettingsItem';

const Settings = () => {
  const [content, setContent] = useState('settings');

  const apiKey = useSelector(state => state.api_key)
  const user = useSelector(state => state.user)

  const unblur = (evt) => {
    let target = evt.target;
    if (!target.classList.contains('blurred')) {
      target = document.querySelector('.blurred');
    }
    target.classList.remove('blurred');
  }

  const settingsContent = {
    'settings': (
    <div className="settings-content-body">
      <p>Hello World</p>
    </div>
    ),
    'api-key': (
      <div className="settings-content-body">
        <div className="settings-api-key">
          API Key: 
          <span className="api-key-val blurred" onClick={unblur}>
            {apiKey ? apiKey : ' Not Found'}
          </span>
          <div className="blurred-msg" onClick={unblur}>Click to reveal</div>
        </div>
      </div>
    ),
    'logout': (
      <div className="settings-content-body">

      </div>
    )
  }

  const sidebarItems = [
    {id: 'account', text: 'Account'},
    {id: 'security', text: 'Security and Privacy'},
    {id: 'password', text: 'Password'},
    {id: 'notifications', text: 'Email Notifications'},
    {id: 'history', text: 'History'},
  ]

  const showSetting = (evt) => {
    // Get the settings-sidebar-item div
    let target = evt.target;
    while (!target.classList.contains('settings-sidebar-item')) {
      target = target.parentElement;
    }
    // Strip the active class from other settings-sidebar-item divs
    for (let child of target.parentElement.children) {
      child.classList.remove('active');
    }
    // Add the active class to the target
    target.classList.add('active');
    // Toggle the settings content to that matching the clicked sidebar item
    const id = target.id;
    setContent(curr => id);
  }
  return (
    <div className="settings" >
      <div className="settings-sidebar">
        <div className="settings-user">
          <div className="settings-user-email">{user.email}</div>
        </div>
        {sidebarItems.map(item => (
          <SettingsItem key={item.id} id={item.id} text={item.text} showSetting={showSetting} />
        ))}
        <div className="settings-copyright">
        © 2022 Grabafone
        </div>
      </div>
      <div className="settings-content">
        {settingsContent[content]}
      </div>
    </div>
  )
}

export default Settings;