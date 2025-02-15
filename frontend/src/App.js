// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import EmployeesPage from './pages/EmployeesPage';
import DepartmentsPage from './pages/DepartmentsPage';
import UsersPage from './pages/UsersPage';
import Navbar from './components/Shared/Navbar';
import PrivateRoute from './components/Shared/PrivateRoute';
import DeniedAccess from './pages/DeniedAccess';
import { AuthProvider } from './contexts/AuthContext';
import Userdashboard from './pages/Userdashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/Userdashboard" element={<Userdashboard />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
          </Route>

          {/* Admin Only Routes */}
          <Route element={<PrivateRoute requiredRole="Admin" />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>

          {/* Access Denied Route */}
          <Route path="/access-denied" element={<DeniedAccess />} />

          {/* Fallback Route */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;