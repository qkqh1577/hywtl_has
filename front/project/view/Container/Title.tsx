import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';

export default function ProjectContainerTitle() {

  return (
    <Box sx={{
      display: 'flex',
      width:   '100%',
      height:  '40px'
    }}>
      <Typography variant="h5">[ProjectCode]</Typography>
      <Typography variant="h5">[ProjectTitle]</Typography>
    </Box>
  );
}