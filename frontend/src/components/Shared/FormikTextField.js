import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

const FormikTextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      variant="outlined"
      margin="normal"
    />
  );
};

export default FormikTextField;