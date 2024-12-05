import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { MenuManagement } from './pages/MenuManagement';
import { useStore } from './store/useStore';

function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const user = useStore((state) => state.user);
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route
            path="admin"
            element={
              <ProtectedAdminRoute>
                <Admin />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="menu-management"
            element={
              <ProtectedAdminRoute>
                <MenuManagement />
              </ProtectedAdminRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}