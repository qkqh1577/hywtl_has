import React from 'react';
import { Box, CircularProgress as MuiCircularProgress} from '@mui/material';

function CircularProgress(props) {
  const size = (props.size)? props.size : 40;
  return (
    <Box sx={{
      ...props?.sx,
      display: 'flex',
      width: '100%',
      height:'100%',
      color: 'grey.500',
      //justifyContent:'center'
      //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}>
      <MuiCircularProgress color="inherit" size={size}/>
    </Box>
  );
}

export default CircularProgress;
