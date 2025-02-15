import React from 'react';
import { useField } from 'formik';
import { Switch, FormControlLabel } from '@mui/material';

const FormikSwitch = ({ label, ...props }) => {
  const [field] = useField({ ...props, type: 'checkbox' });

  return (
    <FormControlLabel
      control={<Switch {...field} checked={field.value} color="primary" />}
      label={label}
    />
  );
};

export default FormikSwitch;