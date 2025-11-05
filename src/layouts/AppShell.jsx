import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Avatar } from '../components';
import './AppShell.css';

const AppShell = ({ children, userRole, userName }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { id: 'workspaces', label: 'Workspaces', path: '/workspaces', icon: '🏢' },
    { id: 'projects', label: 'Projects', path: '/projects', icon: '📁' },
    { id: 'mywork', label: 'My Work', path: '/my-work', icon: '✓', roles: ['employee'] },
    { id: 'admin', label: 'Admin', path: '/admin', icon: '⚙️', roles: ['manager'] },
  ];

  const filteredNavItems = navItems.filter(item => 
    !item.roles || item.roles.includes(userRole)
  );

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Top App Bar */}
      <header className="app-bar">
        <button 
          className="hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
        >
          ☰
        </button>
        <h1 className="app-bar__title">WorkSync</h1>
        <div className="app-bar__profile">
          <Avatar name={userName} size="medium" />
          <span className="app-bar__username">{userName}</span>
        </div>
      </header>

      {/* Sidebar */}
      <nav 
        className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}
        aria-label="Main navigation"
      >
        {filteredNavItems.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`sidebar__item ${location.pathname === item.path ? 'sidebar__item--active' : ''}`}
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__label">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Main Content */}
      <main id="main-content" className="main-content">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
