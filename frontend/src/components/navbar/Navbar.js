import React from 'react';
import { NavLink } from 'react-router-dom';

import '../../styles/Navbar.css';


// TODO navbar-dynamic-links should be based on user state

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-section">
        <h1><NavLink to="/" className="navbar-header">Grabafone</NavLink></h1>
        <div className="navbar-separator"> </div>
        <div className="navbar-static-links navbar-links">
          <NavLink to="/docs" className="navlink">Documentation</NavLink>
          <NavLink to="/contact" className="navlink">Contact Us</NavLink>
          <NavLink to="/faq" className="navlink">FAQ</NavLink>
        </div>
      </div>
      <div className="navbar-section navbar-dynamic-links navbar-links">
        <NavLink to="/login" className="navlink">Login</NavLink>
        <NavLink to="/sign-up" className="navlink">Sign Up</NavLink>
        <NavLink to="/profile" className="navlink">Profile</NavLink>
      </div>
    </div>
  )
}

export default Navbar;