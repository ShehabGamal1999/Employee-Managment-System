
// export default DepartmentsPage;
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Grid, Button, Dialog, DialogTitle, DialogContent, Snackbar, Alert, TextField, Typography } from '@mui/material';
import DepartmentList from '../components/Departments/DepartmentList';
import DepartmentForm from '../components/Departments/DepartmentForm';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const DepartmentsPage = () => {
  const { authTokens } = useContext(AuthContext);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'Name', direction: 'asc' });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/api/departments', {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [authTokens]);

  const handleAdd = () => {
    setCurrentDepartment(null);
    setFormOpen(true);
  };

  const handleEdit = (department) => {
    setCurrentDepartment(department);
    setFormOpen(true);
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      if (currentDepartment) {
        // Update department
        const response = await axios.put(`http://127.0.0.1:5001/api/departments/${currentDepartment.Id}`, values, {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        console.log('Update response:', response.data);
        setSnackbar({ open: true, message: 'Department updated', severity: 'success' });
      } else {
        // Add new department
        const response = await axios.post('http://127.0.0.1:5001/api/departments', values, {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        console.log('Add response:', response.data);
        setSnackbar({ open: true, message: 'Department added', severity: 'success' });
      }
      setFormOpen(false);
      // Fetch updated departments
      const response = await axios.get('http://127.0.0.1:5001/api/departments', {
        headers: { authorization: `Bearer ${authTokens.token}` },
      });
      setDepartments(response.data);
    } catch (error) {
      console.error('Operation failed:', error.response ? error.response.data : error);
      setSnackbar({ open: true, message: 'Operation failed', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedDepartments = [...departments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredDepartments = sortedDepartments.filter(department =>
    department.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'blue' }}>
          Department Management
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Department
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12}>
        <DepartmentList 
          departments={filteredDepartments} 
          onEdit={handleEdit} 
          requestSort={requestSort}
          sortConfig={sortConfig}
        />
      </Grid>
      
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{currentDepartment ? 'Edit Department' : 'Add New Department'}</DialogTitle>
        <DialogContent>
          <DepartmentForm
            initialValues={currentDepartment}
            onSubmit={handleFormSubmit}
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default DepartmentsPage;