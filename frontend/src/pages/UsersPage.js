// src/pages/UsersPage.js

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import {
  Grid, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Snackbar, Alert, TextField, IconButton,
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, FormControl, InputLabel, Select, MenuItem,Typography 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import LoadingSpinner from '../components/Shared/LoadingSpinner';
import UserForm from '../components/Users/UserForm';

const UsersPage = () => {
  const { authTokens, user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('Username');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  
  const [formOpen, setFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/api/users', {
        headers: { authorization: `Bearer ${authTokens.token}` },
      });
      setUsers(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setLoading(false);
    }
  }, [authTokens.access]);

  useEffect(() => {
    if (user.role !== 'Admin') {
      setLoading(false);
      return;
    }
    fetchUsers();
  }, [fetchUsers, user.role]);

  useEffect(() => {
    let data = users.filter(u =>
      u.Username.toLowerCase().includes(search.toLowerCase())
    );

    data = data.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFiltered(data);
  }, [search, sortField, sortOrder, users]);

  const handleAdd = () => {
    setCurrentUser(null);
    setPassword('');
    setRole('User');
    setFormOpen(true);
  };

  const handleEdit = (u) => {
    setCurrentUser(u);
    setPassword('');
    setRole(u.Role);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://127.0.0.1:5001/api/users/${id}`, {
          headers: { authorization: `Bearer ${authTokens.token}` },
        });
        setSnackbar({ open: true, message: 'User deleted', severity: 'success' });
        fetchUsers(); // Refresh the user list
      } catch (error) {
        setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
      }
    }
  };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      if (currentUser) {
        // Update user
        const response = await axios.put(
          `http://127.0.0.1:5001/api/users/${currentUser.Id}`,
          { 
            Username: values.Username, 
            Role: values.Role 
            // Include Password if you want to allow updating it
          },
          {
            headers: { authorization: `Bearer ${authTokens.token}` },
          }
        );
  
        console.log('Update response:', response.data); // Log the response for debugging
        setSnackbar({ open: true, message: 'User updated', severity: 'success' });
      } else {
        // Add new user
        const response = await axios.post(
          'http://127.0.0.1:5001/api/users',
          { 
            Username: values.Username, 
            Password: values.Password, 
            Role: values.Role 
          },
          {
            headers: { authorization: `Bearer ${authTokens.token}` },
          }
        );
  
        console.log('Add response:', response.data); // Log the response for debugging
        setSnackbar({ open: true, message: 'User added', severity: 'success' });
      }
  
      setFormOpen(false);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Operation failed:', error); // Log the error for debugging
      setSnackbar({ open: true, message: 'Operation failed', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) return <LoadingSpinner />;

  if (user.role !== 'Admin') return <h1>Access Denied</h1>;

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'blue' }}>
          User Management
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add New User
        </Button>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Search Users"
          variant="outlined"
          fullWidth
          margin="normal"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell onClick={() => {
                  const isAsc = sortField === 'Username' && sortOrder === 'asc';
                  setSortOrder(isAsc ? 'desc' : 'asc');
                  setSortField('Username');
                }}>
                  Username {sortField === 'Username' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell onClick={() => {
                  const isAsc = sortField === 'Role' && sortOrder === 'asc';
                  setSortOrder(isAsc ? 'desc' : 'asc');
                  setSortField('Role');
                }}>
                  Role {sortField === 'Role' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((u) => (
                <TableRow key={u.Id}>
                  <TableCell>{u.Username}</TableCell>
                  <TableCell>{u.Role}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(u)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(u.Id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>

      {/* User Form Dialog */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{currentUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <UserForm
            initialValues={currentUser ? { Username: currentUser.Username, Role: currentUser.Role } : null}
            onSubmit={handleFormSubmit}
            isEdit={!!currentUser}
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

export default UsersPage;