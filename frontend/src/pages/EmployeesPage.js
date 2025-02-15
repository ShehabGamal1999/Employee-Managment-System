
// export default EmployeesPage;
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import { Grid, Button, Dialog, DialogTitle, DialogContent, Snackbar, Alert, TextField, Typography } from '@mui/material';
import EmployeeList from '../components/Employees/EmployeeList';
import EmployeeForm from '../components/Employees/EmployeeForm';
import LoadingSpinner from '../components/Shared/LoadingSpinner';

const EmployeesPage = () => {
  const { authTokens } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/api/employees', {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5001/api/departments', {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments', error);
      }
    };

    fetchEmployees();
    fetchDepartments();
  }, [authTokens]);

  const handleAdd = () => {
    setCurrentEmployee(null);
    setFormOpen(true);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://127.0.0.1:5001/api/employees/${id}`, {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        setSnackbar({ open: true, message: 'Employee deleted', severity: 'success' });
        setEmployees((prev) => prev.filter((emp) => emp.Id !== id));
      } catch (error) {
        setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
      }
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      if (currentEmployee) {
        await axios.put(`http://127.0.0.1:5001/api/employees/${currentEmployee.Id}`, values, {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        setSnackbar({ open: true, message: 'Employee updated', severity: 'success' });
      } else {
        await axios.post('http://127.0.0.1:5001/api/employees', values, {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        setSnackbar({ open: true, message: 'Employee added', severity: 'success' });
      }
      setFormOpen(false);
      const response = await axios.get('http://127.0.0.1:5001/api/employees', {
        headers: { authorization: `Bearer ${authTokens.token}` },
      });
      setEmployees(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Operation failed', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  // Create a mapping of DepartmentId to DepartmentName
  const departmentMap = {};
  departments.forEach(department => {
    departmentMap[department.Id] = department.Name; // Ensure case sensitivity
  });

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee =>
    employee.FirstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'blue' }}>
          Employee Management
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add New Employee
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Search by First Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }} // Add some margin at the bottom
        />
      </Grid>
      <Grid item xs={12}>
        <EmployeeList 
          employees={filteredEmployees.map(employee => ({
            ...employee,
            DepartmentName: departmentMap[employee.DepartmentId] || 'Unknown' // Map DepartmentId to DepartmentName
          }))} 
          onEdit={handleEdit} 
          onDelete={handleDelete} 
        />
      </Grid>
      
      {/* Employee Form Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{currentEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
        <DialogContent>
          <EmployeeForm
            initialValues={currentEmployee}
            onSubmit={handleFormSubmit}
            departments={departments}
          />
        </DialogContent>
      </Dialog>

      {/* Snackbar for Notifications */}
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

export default EmployeesPage;