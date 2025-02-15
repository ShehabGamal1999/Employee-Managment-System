import React from 'react';
import { useField } from 'formik';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';

const FormikSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      error={meta.touched && Boolean(meta.error)}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        {...field}
        {...props}
      >
        {props.children}
      </Select>
      {meta.touched && meta.error ? (
        <FormHelperText>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default FormikSelect;