
import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const EmployeeForm = ({ initialValues, onSubmit, departments }) => {
  const formik = useFormik({
    initialValues: initialValues || { FirstName: '', LastName: '', Email: '', DepartmentId: '', HireDate: '', Salary: '' },
    onSubmit: (values, { setSubmitting }) => {
      onSubmit(values, { setSubmitting });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="First Name"
        name="FirstName"
        value={formik.values.FirstName}
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Last Name"
        name="LastName"
        value={formik.values.LastName}
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="Email"
        value={formik.values.Email}
        onChange={formik.handleChange}
      />
       <TextField
        fullWidth
        margin="normal"
        label="Department"
        name="DepartmentId"
        select // This makes the TextField behave like a select input
        value={formik.values.DepartmentId}
        onChange={formik.handleChange}
      >
        {departments.map((department) => (
          <MenuItem key={department.Id} value={department.Id}>
            {department.Name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        label="Hire Date"
        name="HireDate"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formik.values.HireDate}
        onChange={formik.handleChange}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Salary"
        name="Salary"
        type="number"
        value={formik.values.Salary}
        onChange={formik.handleChange}
      />
      <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
        {initialValues ? 'Update Employee' : 'Add Employee'}
      </Button>
    </form>
  );
};

export default EmployeeForm;