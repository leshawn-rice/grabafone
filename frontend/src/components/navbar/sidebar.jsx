import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCog, FaSignOutAlt, FaClipboard, FaBars, FaHome, FaSignInAlt, FaKey, FaQuestion, FaEnvelope } from 'react-icons/fa';
import '../../styles/components/sidebar.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Sidebar = () => {
  const [dynamicLinks, setDynamicLinks] = useState([
    {link: '/login', label: 'Login', key: 'login', icon: FaCog},
    {link: '/register', label: 'Create an Account', key: 'register', icon: FaCog}
  ]);
  const [isMinimized, setIsMinimized] = useState(false);

  const [footer, setFooter] = useState(
    <NavLink to="/login">
      <button className="login">
        <FaSignInAlt className="icon" />
        {!isMinimized && <span>Log In</span>}
      </button>
    </NavLink>
  )
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.token);

  useEffect(() => {
    if (user.username) {
      setFooter(
        <NavLink to="/logout">
        <button className="logout">
          <FaSignOutAlt className="icon" />
          {!isMinimized && <span>Log Out</span>}
        </button>
        </NavLink>
      )
    }
    if (user.username && token) {
      setDynamicLinks([
        {link: '/settings', label: 'Settings', key: 'settings', icon: FaCog},
      ]);
    }
    else if (user.username) {
      setDynamicLinks([
        {link: '/settings', label: 'Settings', key: 'settings', icon: FaCog},
        {link: '/generate-key', label: 'Get an API Key', key: 'api-key', icon: FaKey},
      ]);
    }
    else {
      setDynamicLinks([])
    }
  }, [user.username, token]);

  const toggleSidebar = () => {
    setIsMinimized(prev => !prev);
  };

  const staticLinks = [
    {link: '/', label: 'Home', key: 'home', icon: FaHome},
    {link: '/docs', label: 'Documentation', key: 'docs', icon: FaClipboard},
    {link: '/contact', label: 'Contact Us', key: 'contact-us', icon: FaEnvelope},
    {link: '/faq', label: 'FAQ', key: 'faq', icon: FaQuestion},
  ]

  return (
    <aside className={`sidebar ${isMinimized ? 'minimized' : ''}`}>
      <div className="brand">
        {!isMinimized && <h2 className="brand-title toggle-btn" onClick={toggleSidebar}>Grabafone</h2> }
        {isMinimized && <button className="toggle-btn" onClick={toggleSidebar}><FaBars className="toggle-icon" /></button> }
      </div>

      <nav className="navigation">
        <ul>
          {[...staticLinks, ...dynamicLinks].map(item => {
            const Icon = item.icon;
            return (
              <li key={item.key}>
                <NavLink 
                  to={item.link}
                  className={({ isActive }) => isActive ? 'active' : ''}>
                  <Icon className="icon" />
                  {!isMinimized && <span>{item.label}</span>}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="footer">
        {footer}
      </div>
    </aside>
  );
};

export default Sidebar;