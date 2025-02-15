import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button, Grid, MenuItem
} from '@mui/material';
import FormikTextField from '../Shared/FormikTextField';
import FormikSelect from '../Shared/FormikSelect';

// Validation schema
const UserSchema = Yup.object().shape({
  Username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Password: Yup.string()
    .min(6, 'Too Short!')
    .when('isEdit', {
      is: false,
      then: Yup.string().required('Required'),
    }),
  Role: Yup.string()
    .oneOf(['Admin', 'User'], 'Invalid Role')
    .required('Required'),
});

const UserForm = ({ initialValues, onSubmit, isEdit }) => {
  return (
    <Formik
      initialValues={{
        Username: initialValues ? initialValues.Username : '',
        Password: '', // Only required when creating a new user
        Role: initialValues ? initialValues.Role : 'User',
      }}
      validationSchema={UserSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormikTextField
                name="Username"
                label="Username"
                required
              />
            </Grid>
            {!isEdit && (
              <Grid item xs={12}>
                <FormikTextField
                  name="Password"
                  label="Password"
                  type="password"
                  required
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormikSelect
                name="Role"
                label="Role"
                required
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </FormikSelect>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            sx={{ mt: 3 }}
          >
            {isEdit ? 'Update User' : 'Add User'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;