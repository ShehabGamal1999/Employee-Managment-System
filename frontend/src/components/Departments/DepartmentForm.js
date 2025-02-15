
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

// Validation schema
const DepartmentSchema = Yup.object().shape({
  Name: Yup.string()
    .required('Required'),
});

const DepartmentForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        Name: initialValues ? initialValues.Name : '',
      }}
      validationSchema={DepartmentSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            name="Name"
            as={TextField}
            label="Department Name"
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {initialValues ? 'Update Department' : 'Add Department'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DepartmentForm;