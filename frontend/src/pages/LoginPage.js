// src/pages/LoginPage.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Typography, TextField, Button,
  Grid, Box, Alert
} from '@mui/material';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import {jwtDecode} from 'jwt-decode';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    Username: '',
    Password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    console.log(form.Username, form.Password);
    const response = await login(form.Username, form.Password);
    console.log(response);
    setLoading(false);
    if (response.success) {
      // Decode the token to get the user's role
      const decodedToken = jwtDecode(localStorage.getItem('tokens'));
      const userRole = decodedToken.role;

      // Navigate based on the user's role
      if (userRole === 'Admin') {
        navigate('/');
      } else {
        navigate('/Userdashboard');
      }
    } else {
      setError(response.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            name="Username"
            value={form.Username}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="Password"
            value={form.Password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;