import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaDollarSign, FaChartPie, FaCog, FaSignOutAlt, FaClipboard, FaBars } from 'react-icons/fa';
import '../../styles/components/toolbar.scss';

const Toolbar = () => {
  const navItems = [
    { label: 'Dashboard',    link: '/dashboard', icon: FaTachometerAlt},
  ];

  const [isMinimized, setIsMinimized] = useState(false);

  const toggleToolbar = () => {
    setIsMinimized(prev => !prev);
  };

  return (
    <aside className={`hidden toolbar ${isMinimized ? 'minimized' : ''}`}>
      <div className="brand">
        {!isMinimized && <h2 className="brand-title toggle-btn" onClick={toggleToolbar}>FinDash</h2> }
        {isMinimized && <button className="toggle-btn" onClick={toggleToolbar}><FaBars className="toggle-icon" /></button> }
      </div>

      <nav className="navigation">
        <ul>
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx}>
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
    </aside>
  );
};

export default Toolbar;