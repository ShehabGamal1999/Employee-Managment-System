// src/components/Departments/DepartmentList.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';

const DepartmentList = ({ departments, onEdit, requestSort, sortConfig }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => requestSort('Name')} style={{ cursor: 'pointer' }}>
              Name {sortConfig.key === 'Name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {departments.map((department) => (
            <TableRow key={department.Id}>
              <TableCell>{department.Name}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(department)}>
                  <Edit />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {departments.length === 0 && (
            <TableRow>
              <TableCell colSpan={2} align="center">
                No departments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DepartmentList;