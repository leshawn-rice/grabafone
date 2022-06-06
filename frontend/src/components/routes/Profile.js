// External Dependencies
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Styles
import '../../styles/Profile.css';

const Profile = () => {
  const [content, setContent] = useState('settings');

  const apiKey = useSelector(state => state.api_key)

  const unblur = (evt) => {
    const target = evt.target;
    target.classList.remove('blurred');
  }

  const profileContent = {
    'settings': (
    <div className="profile-content-body">
      <p>Hello World</p>
    </div>
    ),
    'api-key': (
      <div className="profile-content-body">
        <div className="profile-api-key">
          API Key: 
          <span className="api-key-val blurred" onClick={unblur}>
            {apiKey ? apiKey : ' Not Found'}
          </span>
          <div className="blurred-msg">Click to reveal</div>
        </div>
      </div>
    )
  }

  const showSetting = (evt) => {
    // Get the profile-sidebar-item div
    let target = evt.target;
    while (!target.classList.contains('profile-sidebar-item')) {
      target = target.parentElement;
    }
    // Strip the active class from other profile-sidebar-item divs
    for (let child of target.parentElement.children) {
      child.classList.remove('active');
    }
    // Add the active class to the target
    target.classList.add('active');
    // Toggle the profile content to that matching the clicked sidebar item
    const id = target.id;
    setContent(curr => id);

  }
  return (
    <div className="profile" >
      <div className="profile-sidebar">
        <div className="profile-sidebar-item active" id="settings"  onClick={showSetting}>
          <div className="profile-text-bar"></div>
          <p className="profile-text">Settings</p>
        </div>
        <div className="profile-sidebar-item" id="api-key"  onClick={showSetting}>
          <div className="profile-text-bar"></div>
          <p className="profile-text">API Key</p>
        </div>
      </div>
      <div className="profile-content">
        {profileContent[content]}
      </div>
    </div>
  )
}

export default Profile;