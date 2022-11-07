import React from 'react';
import { Box } from '@mui/material';

function CircularProgress(props) {
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}>
      <CircularProgress />
    </Box>
  );
}

export default CircularProgress;
