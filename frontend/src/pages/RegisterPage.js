// src/pages/RegisterPage.js
import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container, Typography, Button,
  Grid, Box, Alert, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikTextField from '../components/Shared/FormikTextField';
import FormikSelect from '../components/Shared/FormikSelect';

const RegisterPage = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Define validation schema using Yup
  const RegisterSchema = Yup.object().shape({
    Username: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    Password: Yup.string()
      .min(6, 'Password too short!')
      .required('Required'),
    Role: Yup.string()
      .oneOf(['User', 'Admin'], 'Invalid Role')
      .required('Required'),
    // Add more fields as needed
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await register(values);
      console.log(values, response); // Calls the correct register function
      if (response.success) {
        setSuccess('Registration successful! Redirecting to login...');
        resetForm();
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 3000); // 3 seconds delay
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  // If loading, show spinner
  if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="xs">
      <Box 
        sx={{ 
          mt: 8, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {/* Display error message if any */}
        {error && (
          <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
            {error}
          </Alert>
        )}
        {/* Display success message if any */}
        {success && (
          <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
            {success}
          </Alert>
        )}
        <Formik
          initialValues={{
            Username: '',
            Password: '',
            Role: 'User', // Default role; adjust as needed
            // Add more fields as necessary
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormikTextField
                name="Username"
                label="Username"
                required
              />
              <FormikTextField
                name="Password"
                label="Password"
                type="password"
                required
              />
              <FormikSelect
                name="Role"
                label="Role"
                required
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </FormikSelect>
              {/* Add more Formik components as needed */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={ () => console.log('Form submitted') }
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" style={{ textDecoration: 'none' }}>
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default RegisterPage;