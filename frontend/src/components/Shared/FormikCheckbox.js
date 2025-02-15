import React from 'react';
import { useField } from 'formik';
import { Checkbox, FormControlLabel } from '@mui/material';

const FormikCheckbox = ({ label, ...props }) => {
  const [field] = useField({ ...props, type: 'checkbox' });

  return (
    <FormControlLabel
      control={<Checkbox {...field} checked={field.value} color="primary" />}
      label={label}
    />
  );
};

export default FormikCheckbox;