
import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Paper, Box, Alert } from '@mui/material';
import LoadingSpinner from '../Shared/LoadingSpinner';

const EmployeeDetail = () => {
  const { id } = useParams();
  const { authTokens } = useContext(AuthContext);

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${authTokens.token}` },
        });
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id, authTokens]);

  if (loading) return <LoadingSpinner />;

  if (error) return <Alert severity="error">{error}</Alert>;

  if (!employee) return <Typography>No employee found.</Typography>;

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        {employee.FirstName} {employee.LastName}
      </Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1"><strong>Email:</strong> {employee.Email}</Typography>
        <Typography variant="body1"><strong>Department:</strong> {employee.DepartmentName}</Typography>
        <Typography variant="body1"><strong>Hire Date:</strong> {new Date(employee.HireDate).toLocaleDateString()}</Typography>
        <Typography variant="body1"><strong>Salary:</strong> ${employee.Salary}</Typography>
      </Box>
    </Paper>
  );
};

export default EmployeeDetail;