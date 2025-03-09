import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/navbar/sidebar';
import Toolbar from './components/tools/toolbar';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;