import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './layouts/AppShell';
import Dashboard from './pages/Dashboard';
import Workspaces from './pages/Workspaces';
import Projects from './pages/Projects';
import MyWork from './pages/MyWork';

const AppRouter = () => {
  // Mock auth - replace with real auth logic
  const userRole = 'employee'; // or 'manager'
  const userName = 'John Doe';

  return (
    <BrowserRouter>
      <AppShell userRole={userRole} userName={userName}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard userRole={userRole} />} />
          <Route path="/workspaces" element={<Workspaces userRole={userRole} />} />
          <Route path="/projects" element={<Projects userRole={userRole} />} />
          <Route path="/my-work" element={<MyWork />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
};

export default AppRouter;
