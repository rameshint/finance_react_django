// Layout.js
import React from 'react';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {

  const location = useLocation();
  const isLoginPage = location.pathname === '/login'

  return (
    <>
      {!isLoginPage && (
        <div className="app-wrapper">
          <Navbar />
          <Sidebar />
          <main className="app-main">
            <AppHeader />
            <div className="app-content">
              <div className="container-fluid">{children}</div>
            </div>
          </main>
          <Footer />
        </div>
      )}

      {isLoginPage && (
        <>
          {children}
        </>
      )}
    </>
  );
};

export default Layout;
