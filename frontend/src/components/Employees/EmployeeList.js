
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'FirstName', direction: 'asc' });

  const sortedEmployees = [...employees].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => requestSort('FirstName')} style={{ cursor: 'pointer' }}>
              First Name {sortConfig.key === 'FirstName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => requestSort('LastName')} style={{ cursor: 'pointer' }}>
              Last Name {sortConfig.key === 'LastName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => requestSort('Email')} style={{ cursor: 'pointer' }}>
              Email {sortConfig.key === 'Email' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => requestSort('DepartmentName')} style={{ cursor: 'pointer' }}>
              Department {sortConfig.key === 'DepartmentName' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => requestSort('HireDate')} style={{ cursor: 'pointer' }}>
              Hire Date {sortConfig.key === 'HireDate' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell onClick={() => requestSort('Salary')} style={{ cursor: 'pointer' }}>
              Salary {sortConfig.key === 'Salary' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedEmployees.map((employee) => (
            <TableRow key={employee.Id}>
              <TableCell>{employee.FirstName}</TableCell>
              <TableCell>{employee.LastName}</TableCell>
              <TableCell>{employee.Email}</TableCell>
              <TableCell>{employee.DepartmentName}</TableCell>
              <TableCell>{new Date(employee.HireDate).toLocaleDateString()}</TableCell>
              <TableCell>{employee.Salary.toLocaleString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(employee)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(employee.Id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {sortedEmployees.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No employees found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeList;