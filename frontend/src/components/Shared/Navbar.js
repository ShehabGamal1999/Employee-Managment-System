// src/components/Shared/Navbar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to={user?.role === 'Admin' ? '/' : undefined} sx={{ color: 'inherit', textDecoration: 'none', flexGrow: 1 }}>
          Employee Management System 
        </Typography>
        {user ? (
          <Box>
            {user.role === 'Admin' && <Button color="inherit" component={Link} to="/employees">Employees</Button>}
            {user.role === 'Admin' && <Button color="inherit" component={Link} to="/departments">Departments</Button>}
            {user.role === 'Admin' && (
              <Button color="inherit" component={Link} to="/users">Users</Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;