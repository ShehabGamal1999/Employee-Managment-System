import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Grid, Paper, Typography } from '@mui/material';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import api from '../api/api';

const DashboardPage = () => {
  const { authTokens } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const employeesRes = await api.get('/employees', {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        const departmentsRes = await axios.get('http://127.0.0.1:5001/api/departments', {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        const recentHires = employeesRes.data.slice(-5); // last 5 hires

        setStats({
          totalEmployees: employeesRes.data.length,
          totalDepartments: departmentsRes.data.length,
          recentHires,
        });
      } catch (error) {
        console.error('Error fetching dashboard data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [authTokens]);

  if (loading) return <LoadingSpinner />;

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom sx={{ color: 'blue' }}>
                ADMIN DASHBOARD
              </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6">Total Employees</Typography>
          <Typography variant="h4">{stats.totalEmployees}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6">Total Departments</Typography>
          <Typography variant="h4">{stats.totalDepartments}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6">Recent Hires</Typography>
          {stats.recentHires.map((emp) => (
            <Typography key={emp.Id}>{`${emp.FirstName} ${emp.LastName}`}</Typography>
          ))}
        </Paper>
      </Grid>
      {/* Add more dashboard components like charts for department distribution */}
    </Grid>
  );
};

export default DashboardPage;