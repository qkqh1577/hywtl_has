import React from 'react';
import { Box, CircularProgress as MuiCircularProgress} from '@mui/material';

function CircularProgress(props) {
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      height:'100%',
      color: 'grey.500',
      //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}>
      <MuiCircularProgress color="inherit" />
    </Box>
  );
}

export default CircularProgress;
