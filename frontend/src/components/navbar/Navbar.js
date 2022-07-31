// External Dependencies
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Styles
import '../../styles/Navbar.css';

const Navbar = () => {
  const [dynamicLinks, setDynamicLinks] = useState([
    {path: '/login', text: 'Login', key: 'login'},
    {path: '/register', text: 'Create an Account', key: 'register'}
  ]);
  const user = useSelector(state => state.user);
  const token = useSelector(state => state.token);

  useEffect(() => {
    if (user.username && token) {
      setDynamicLinks([
        {path: '/profile', text: 'Profile', key: 'profile'},
      ]);
    }
    else if (user.username) {
      setDynamicLinks([
        {path: '/profile', text: 'Profile', key: 'profile'},
        {path: '/generate-key', text: 'Get an API Key', key: 'api-key'}
      ]);
    }
    else {
      setDynamicLinks([
        {path: '/login', text: 'Login', key: 'login'},
        {path: '/register', text: 'Create an Account', key: 'register'}
      ])
    }
  }, [user.username, token]);

  return (
    <div className="navbar">
      <div className="navbar-section">
        <h1>
          <NavLink to="/" className="navbar-header">
            Grabafone
          </NavLink>
        </h1>
        <div className="navbar-separator"> </div>
        <div className="navbar-static-links navbar-links">
          <NavLink to="/docs" className="navlink">
            Documentation
          </NavLink>
          <NavLink to="/contact" className="navlink">
            Contact Us
          </NavLink>
          <NavLink to="/faq" className="navlink">
            FAQ
          </NavLink>
        </div>
      </div>
      <div className="navbar-section navbar-dynamic-links navbar-links">
        {dynamicLinks.map((link) => (
          <NavLink key={link.key} to={link.path} className="navlink">
            {link.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
