
import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const DeniedAccess = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          403 - Access Denied
        </Typography>
        <Typography variant="body1">
          You do not have permission to view this page.
        </Typography>
      </Box>
    </Container>
  );
};

export default DeniedAccess;